#!/usr/bin/env node
import { access, cp, mkdir, open, readdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { setTimeout as delay } from "node:timers/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(repositoryRoot, "skills");
const stagesRoot = path.join(repositoryRoot, "stages");

export const destinations = {
  codex: ".agents/skills",
  claude: ".claude/skills",
  copilot: ".github/skills",
};

function parseList(value, flag) {
  const values = value.split(",").map((item) => item.trim()).filter(Boolean);
  if (values.length === 0) throw new Error(`Provide at least one value for ${flag}.`);
  return [...new Set(values)];
}

export function parseArgs(args) {
  const options = { agent: null, target: process.cwd(), stage: [], skills: [], overwrite: false, dryRun: false, help: false };
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === "--help" || argument === "-h") options.help = true;
    else if (argument === "--overwrite" || argument === "--force") options.overwrite = true;
    else if (argument === "--dry-run") options.dryRun = true;
    else if (["--agent", "--target", "--stage", "--skills"].includes(argument)) {
      const value = args[index + 1];
      if (!value || value.startsWith("--")) throw new Error(`Missing value for ${argument}`);
      if (argument === "--agent") options.agent = value;
      if (argument === "--target") options.target = value;
      if (argument === "--stage") options.stage.push(...parseList(value, argument));
      if (argument === "--skills") options.skills.push(...parseList(value, argument));
      index += 1;
    } else throw new Error(`Unknown argument: ${argument}`);
  }
  options.stage = [...new Set(options.stage)];
  options.skills = [...new Set(options.skills)];
  if (!options.help && !options.agent) throw new Error("Specify --agent codex, claude, copilot or all.");
  return options;
}

async function pathExists(target) {
  try { await access(target); return true; } catch { return false; }
}

async function pathOccupied(target) {
  try { await (await import("node:fs/promises")).lstat(target); return true; }
  catch (error) { if (error.code === "ENOENT") return false; throw error; }
}

async function listSkillNames(source) {
  const entries = await readdir(source, { withFileTypes: true });
  const skills = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  if (skills.length === 0) throw new Error(`No skill directories found in ${source}`);
  for (const skill of skills) {
    if (!(await pathExists(path.join(source, skill, "SKILL.md")))) throw new Error(`Skill "${skill}" is missing SKILL.md`);
  }
  return skills;
}

function canonicalSkillLinks(content) {
  const match = /^## Canonical (?:skills|assets)\s*$/m.exec(content);
  if (!match) return [];
  const remainder = content.slice(match.index + match[0].length);
  const nextHeading = remainder.search(/^## /m);
  const section = nextHeading === -1 ? remainder : remainder.slice(0, nextHeading);
  const pattern = /\]\((?:\.\.\/)+skills\/([a-z0-9]+(?:-[a-z0-9]+)*)\/SKILL\.md(?:#[^)\s]*)?\)/g;
  return [...section.matchAll(pattern)].map((link) => link[1]);
}

export async function resolveSelection(options, { source = sourceRoot, stages = stagesRoot } = {}) {
  const allSkills = await listSkillNames(source);
  if (!options.stage?.length && !options.skills?.length) return allSkills;
  const selected = new Set();
  if (options.stage?.length) {
    const entries = await readdir(stages, { withFileTypes: true });
    const available = entries.filter((entry) => entry.isDirectory() && /^\d{2}-/.test(entry.name)).map((entry) => entry.name).sort();
    for (const requested of options.stage) {
      const normalized = /^\d{1,2}$/.test(requested) ? requested.padStart(2, "0") : requested;
      const stage = available.find((name) => name === normalized || name.startsWith(`${normalized}-`));
      if (!stage) throw new Error(`Unknown stage "${requested}". Valid stages: ${available.join(", ")}.`);
      const names = canonicalSkillLinks(await readFile(path.join(stages, stage, "README.md"), "utf8"));
      if (names.length === 0) throw new Error(`Stage "${stage}" has no installable skills.`);
      for (const name of names) {
        if (!allSkills.includes(name)) throw new Error(`Stage "${stage}" references unknown skill "${name}".`);
        selected.add(name);
      }
    }
  }
  for (const name of options.skills ?? []) {
    if (!allSkills.includes(name)) throw new Error(`Unknown skill "${name}". Valid skills: ${allSkills.join(", ")}.`);
    selected.add(name);
  }
  if (selected.size === 0) throw new Error("The selection contains no installable skills.");
  return [...selected].sort();
}

async function acquireManifestLock(lockPath, timeoutMs = 10000) {
  const deadline = Date.now() + timeoutMs;
  const token = randomUUID();
  while (true) {
    let created = false;
    try {
      await mkdir(lockPath);
      created = true;
    } catch (error) {
      if (error.code !== "EEXIST") throw error;
    }

    if (created) {
      try {
        await writeFile(
          path.join(lockPath, "owner.json"),
          JSON.stringify({ pid: process.pid, token, acquiredAt: new Date().toISOString() }),
          { flag: "wx" },
        );
        return async () => {
          let owner;
          try {
            owner = JSON.parse(await readFile(path.join(lockPath, "owner.json"), "utf8"));
          } catch {
            throw new Error(`Installer lock ownership is unreadable; inspect manually: ${lockPath}`);
          }
          if (owner.token !== token || owner.pid !== process.pid) {
            throw new Error(`Installer lock ownership changed; refusing to release another process lock: ${lockPath}`);
          }
          await rm(lockPath, { recursive: true, force: true });
        };
      } catch (error) {
        if (error.code === "ENOENT") {
          if (Date.now() >= deadline) throw new Error(`Timed out acquiring installer lock: ${lockPath}`);
          await delay(50);
          continue;
        }
        let owner;
        try { owner = JSON.parse(await readFile(path.join(lockPath, "owner.json"), "utf8")); }
        catch { owner = null; }
        if (owner?.token === token && owner?.pid === process.pid) {
          await rm(lockPath, { recursive: true, force: true });
        }
        throw error;
      }
    }

    let owner;
    try { owner = JSON.parse(await readFile(path.join(lockPath, "owner.json"), "utf8")); }
    catch { owner = null; }
    if (owner && Number.isInteger(owner.pid)) {
      let active = true;
      try { process.kill(owner.pid, 0); }
      catch (probeError) { if (probeError.code === "ESRCH") active = false; }
      if (!active) {
        let currentOwner;
        try { currentOwner = JSON.parse(await readFile(path.join(lockPath, "owner.json"), "utf8")); }
        catch { currentOwner = null; }
        if (!currentOwner || currentOwner.token !== owner.token || currentOwner.pid !== owner.pid) {
          if (Date.now() >= deadline) throw new Error(`Timed out waiting for installer lock: ${lockPath}`);
          await delay(50);
          continue;
        }
        throw new Error(`Abandoned installer lock detected for PID ${owner.pid}. Remove it manually after confirming no installer is running: ${lockPath}`);
      }
    }
    if (Date.now() >= deadline) {
      throw new Error(`Timed out waiting for installer lock: ${lockPath}${owner ? ` (owned by PID ${owner.pid})` : " (owner metadata unavailable; manual inspection required)"}`);
    }
    await delay(50);
  }
}

async function writeManifestAtomically(manifestPath, manifest) {
  const temporaryPath = `${manifestPath}.${randomUUID()}.tmp`;
  let handle;
  try {
    handle = await open(temporaryPath, "wx");
    await handle.writeFile(`${JSON.stringify(manifest, null, 2)}\n`, "utf8");
    await handle.close();
    handle = undefined;
    await rename(temporaryPath, manifestPath);
  } finally {
    if (handle) await handle.close().catch(() => {});
    await rm(temporaryPath, { force: true }).catch(() => {});
  }
}

async function readManifest(manifestPath, agent) {
  let content;
  try { content = await readFile(manifestPath, "utf8"); }
  catch (error) {
    if (error.code === "ENOENT") return [];
    throw new Error(`Unable to read manifest at ${manifestPath}: ${error.message}`);
  }
  try {
    const previous = JSON.parse(content);
    if (
      previous.version !== "1.0" ||
      previous.agent !== agent ||
      !Array.isArray(previous.skills) ||
      previous.skills.some((name) => typeof name !== "string")
    ) throw new Error("Unsupported manifest.");
    return previous.skills;
  } catch {
    throw new Error(`Existing manifest is invalid or unsupported: ${manifestPath}`);
  }
}

export async function executeInstall(selectedSkills, { agent, targetRoot, overwrite = false, dryRun = false, source = sourceRoot, persistManifest = writeManifestAtomically }) {
  const agents = agent === "all" ? Object.keys(destinations) : [agent];
  for (const selected of agents) {
    if (!Object.hasOwn(destinations, selected)) throw new Error(`Unsupported agent "${selected}". Use codex, claude, copilot or all.`);
  }

  const installed = [];
  const skipped = [];
  const planned = [];

  // Preflight every destination before changing any of them. Each manifest is
  // checked again after acquiring its destination lock to close the race.
  for (const selected of agents) {
    const manifestPath = path.join(targetRoot, destinations[selected], ".webcraft", "manifest.json");
    await readManifest(manifestPath, selected);
  }

  for (const selected of agents) {
    const destinationRoot = path.join(targetRoot, destinations[selected]);
    const manifestPath = path.join(destinationRoot, ".webcraft", "manifest.json");
    const lockPath = `${manifestPath}.lock`;

    if (dryRun) {
      await readManifest(manifestPath, selected);
      for (const skill of selectedSkills) {
        const target = path.join(destinationRoot, skill);
        if (await pathExists(target) && !overwrite) skipped.push(`${selected}:${skill}`);
        else {
          planned.push(`${selected}:${skill}`);
          process.stdout.write(`[DRY RUN] Would install ${skill} for ${selected}.\n`);
        }
      }
      continue;
    }

    await mkdir(path.dirname(manifestPath), { recursive: true });
    const releaseLock = await acquireManifestLock(lockPath);
    const createdPaths = [];
    const backups = [];
    let manifestCommitted = false;

    try {
      const previousSkills = await readManifest(manifestPath, selected);
      for (const skill of selectedSkills) {
        const sourcePath = path.join(source, skill);
        const destinationPath = path.join(destinationRoot, skill);
        const exists = await pathOccupied(destinationPath);
        if (exists && !overwrite) {
          skipped.push(`${selected}:${skill}`);
          process.stdout.write(`[SKIP] ${skill} already exists for ${selected}.\n`);
          continue;
        }

        if (exists) {
          const backupPath = `${destinationPath}.webcraft-backup-${randomUUID()}`;
          await rename(destinationPath, backupPath);
          backups.push({ destinationPath, backupPath });
        } else {
          try { await mkdir(destinationPath); }
          catch (error) {
            if (error.code === "EEXIST") throw new Error(`Destination appeared during installation; refusing to overwrite: ${destinationPath}`);
            throw error;
          }
          createdPaths.push(destinationPath);
        }
        if (exists) {
          await cp(sourcePath, destinationPath, { recursive: true, force: false, errorOnExist: true });
        } else {
          const entries = await readdir(sourcePath);
          for (const entry of entries) {
            await cp(path.join(sourcePath, entry), path.join(destinationPath, entry), {
              recursive: true,
              force: false,
              errorOnExist: true,
            });
          }
        }
        installed.push(`${selected}:${skill}`);
      }

      const newlyInstalled = installed
        .filter((entry) => entry.startsWith(`${selected}:`))
        .map((entry) => entry.slice(selected.length + 1));
      const manifestSkills = [...new Set([...previousSkills, ...newlyInstalled])].sort();
      await persistManifest(manifestPath, {
        version: "1.0",
        agent: selected,
        installedAt: new Date().toISOString(),
        skills: manifestSkills,
      });
      manifestCommitted = true;
    } catch (error) {
      const rollbackErrors = [];
      for (const destinationPath of createdPaths.reverse()) {
        try { await rm(destinationPath, { recursive: true, force: true }); }
        catch (rollbackError) { rollbackErrors.push(rollbackError.message); }
      }
      for (const { destinationPath, backupPath } of backups.reverse()) {
        try {
          await rm(destinationPath, { recursive: true, force: true });
          await rename(backupPath, destinationPath);
        } catch (rollbackError) { rollbackErrors.push(rollbackError.message); }
      }
      if (rollbackErrors.length > 0) {
        throw new Error(`Installation failed: ${error.message}. Rollback also failed: ${rollbackErrors.join("; ")}`);
      }
      throw error;
    } finally {
      try {
        if (manifestCommitted) {
          for (const { backupPath } of backups) {
            try { await rm(backupPath, { recursive: true, force: true }); }
            catch (error) {
              process.stderr.write(`WARNING: Installation committed, but backup cleanup failed at ${backupPath}: ${error.message}\n`);
            }
          }
        }
      } finally {
        await releaseLock();
      }
    }
  }

  return { installed, skipped, planned, dryRun };
}
export async function installSkills(options) {
  return executeInstall(await resolveSelection(options, options), options);
}

function printHelp() {
  process.stdout.write(`WebCraft Pro skill installer

Usage:
  node scripts/install-skills.mjs --agent <codex|claude|copilot|all> [options]

Options:
  --agent <name>       Destination agent. Use "all" to install all three.
  --target <path>      Project root. Defaults to the current directory.
  --stage <list>       Comma-separated stage numbers or directory names.
  --skills <list>      Comma-separated canonical skill names.
  --overwrite          Replace existing skill directories.
  --force              Alias for --overwrite.
  --dry-run            Preview actions without writing files or manifests.
  --help               Show this help.

With no --stage or --skills selector, all canonical skills are installed.
Stage 1 and Stage 8 currently contain no installable skills.
`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) return printHelp();
  const result = await installSkills({ ...options, targetRoot: path.resolve(options.target) });
  const mode = result.dryRun ? "Preview" : "Installation";
  process.stdout.write(`${mode} complete: ${result.installed.length} installed, ${result.planned.length} planned, ${result.skipped.length} skipped.\n`);
  if (result.skipped.length > 0) process.stdout.write(`Skipped existing skills: ${result.skipped.join(", ")}\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    process.stderr.write(`ERROR: ${error.message}\n`);
    process.exitCode = 1;
  });
}
