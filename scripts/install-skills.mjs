import { access, cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
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
  if (values.length === 0) {
    throw new Error(`Provide at least one value for ${flag}.`);
  }
  return [...new Set(values)];
}

export function parseArgs(args) {
  const options = {
    agent: null,
    target: process.cwd(),
    stage: [],
    skills: [],
    overwrite: false,
    dryRun: false,
    help: false,
  };

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];

    if (argument === "--help" || argument === "-h") {
      options.help = true;
    } else if (argument === "--overwrite" || argument === "--force") {
      options.overwrite = true;
    } else if (argument === "--dry-run") {
      options.dryRun = true;
    } else if (["--agent", "--target", "--stage", "--skills"].includes(argument)) {
      const value = args[index + 1];
      if (!value || value.startsWith("--")) {
        throw new Error(`Missing value for ${argument}`);
      }
      if (argument === "--agent") options.agent = value;
      if (argument === "--target") options.target = value;
      if (argument === "--stage") options.stage = parseList(value, argument);
      if (argument === "--skills") options.skills = parseList(value, argument);
      index += 1;
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }

  if (!options.help && !options.agent) {
    throw new Error("Specify --agent codex, claude, copilot or all.");
  }

  return options;
}

async function pathExists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

async function listSkillNames(source) {
  const entries = await readdir(source, { withFileTypes: true });
  const skills = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  if (skills.length === 0) {
    throw new Error(`No skill directories found in ${source}`);
  }
  for (const skill of skills) {
    if (!(await pathExists(path.join(source, skill, "SKILL.md")))) {
      throw new Error(`Skill "${skill}" is missing SKILL.md`);
    }
  }
  return skills;
}

function canonicalSkillLinks(content) {
  const heading = /^## Canonical skills\s*$/gm;
  const match = heading.exec(content);
  if (!match) return [];
  const start = match.index + match[0].length;
  const remainder = content.slice(start);
  const nextHeading = remainder.search(/^## /m);
  const section = nextHeading === -1 ? remainder : remainder.slice(0, nextHeading);
  const names = [];
  const linkPattern = /\]\((?:\.\.\/)+skills\/([a-z0-9]+(?:-[a-z0-9]+)*)\/SKILL\.md(?:#[^)\s]*)?\)/g;
  for (const link of section.matchAll(linkPattern)) names.push(link[1]);
  return names;
}

export async function resolveSelection(options, {
  source = sourceRoot,
  stages = stagesRoot,
} = {}) {
  const allSkills = await listSkillNames(source);
  if (!options.stage?.length && !options.skills?.length) return allSkills;

  const selected = new Set();

  if (options.stage?.length) {
    const stageEntries = await readdir(stages, { withFileTypes: true });
    const availableStages = stageEntries
      .filter((entry) => entry.isDirectory() && /^\d{2}-/.test(entry.name))
      .map((entry) => entry.name)
      .sort();

    for (const requested of options.stage) {
      const stage = availableStages.find((name) => name === requested || name.startsWith(`${requested}-`));
      if (!stage) {
        throw new Error(`Unknown stage "${requested}". Valid stages: ${availableStages.join(", ")}.`);
      }
      const readme = path.join(stages, stage, "README.md");
      const names = canonicalSkillLinks(await readFile(readme, "utf8"));
      if (names.length === 0) {
        throw new Error(`Stage "${stage}" has no installable skills.`);
      }
      for (const name of names) {
        if (!allSkills.includes(name)) {
          throw new Error(`Stage "${stage}" references unknown skill "${name}".`);
        }
        selected.add(name);
      }
    }
  }

  if (options.skills?.length) {
    for (const name of options.skills) {
      if (!allSkills.includes(name)) {
        throw new Error(`Unknown skill "${name}". Valid skills: ${allSkills.join(", ")}.`);
      }
      selected.add(name);
    }
  }

  if (selected.size === 0) {
    throw new Error("The selection contains no installable skills.");
  }
  return [...selected].sort();
}

export async function executeInstall(selectedSkills, {
  agent,
  targetRoot,
  overwrite = false,
  dryRun = false,
  source = sourceRoot,
}) {
  const selectedAgents = agent === "all" ? Object.keys(destinations) : [agent];
  for (const selected of selectedAgents) {
    if (!Object.hasOwn(destinations, selected)) {
      throw new Error(`Unsupported agent "${selected}". Use codex, claude, copilot or all.`);
    }
  }

  const installed = [];
  const skipped = [];
  const planned = [];

  for (const selected of selectedAgents) {
    const destinationRoot = path.join(targetRoot, destinations[selected]);
    if (dryRun) {
      for (const skill of selectedSkills) {
        const destinationSkill = path.join(destinationRoot, skill);
        if (await pathExists(destinationSkill) && !overwrite) {
          skipped.push(`${selected}:${skill}`);
        } else {
          planned.push(`${selected}:${skill}`);
          process.stdout.write(`[DRY RUN] Would install ${skill} for ${selected}.\n`);
        }
      }
      continue;
    }

    await mkdir(destinationRoot, { recursive: true });
    for (const skill of selectedSkills) {
      const sourcePath = path.join(source, skill);
      const destinationPath = path.join(destinationRoot, skill);
      const exists = await pathExists(destinationPath);
      if (exists && !overwrite) {
        skipped.push(`${selected}:${skill}`);
        process.stdout.write(`[SKIP] ${skill} already exists for ${selected}.\n`);
        continue;
      }
      await cp(sourcePath, destinationPath, {
        recursive: true,
        force: overwrite,
        errorOnExist: !overwrite,
      });
      installed.push(`${selected}:${skill}`);
    }

    const manifestDirectory = path.join(destinationRoot, ".webcraft");
    const manifestPath = path.join(manifestDirectory, "manifest.json");
    let previousSkills = [];
    if (await pathExists(manifestPath)) {
      try {
        const previous = JSON.parse(await readFile(manifestPath, "utf8"));
        if (previous.version === "1.0" && previous.agent === selected && Array.isArray(previous.skills)) {
          previousSkills = previous.skills.filter((name) => typeof name === "string");
        }
      } catch {
        throw new Error(`Existing manifest is invalid: ${manifestPath}`);
      }
    }
    const newlyInstalled = installed
      .filter((entry) => entry.startsWith(`${selected}:`))
      .map((entry) => entry.slice(selected.length + 1));
    const manifestSkills = [...new Set([...previousSkills, ...newlyInstalled])].sort();
    await mkdir(manifestDirectory, { recursive: true });
    await writeFile(manifestPath, `${JSON.stringify({
      version: "1.0",
      agent: selected,
      installedAt: new Date().toISOString(),
      skills: manifestSkills,
    }, null, 2)}\n`, "utf8");
  }

  return { installed, skipped, planned, dryRun };
}

export async function installSkills(options) {
  const selectedSkills = await resolveSelection(options, options);
  return executeInstall(selectedSkills, options);
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
  if (options.help) {
    printHelp();
    return;
  }
  const result = await installSkills({
    ...options,
    targetRoot: path.resolve(options.target),
  });
  const mode = result.dryRun ? "Preview" : "Installation";
  process.stdout.write(`${mode} complete: ${result.installed.length} installed, ${result.planned.length} planned, ${result.skipped.length} skipped.\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    process.stderr.write(`ERROR: ${error.message}\n`);
    process.exitCode = 1;
  });
}
