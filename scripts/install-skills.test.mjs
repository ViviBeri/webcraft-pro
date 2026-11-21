import assert from "node:assert/strict";
import { access, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { executeInstall, installSkills, parseArgs, resolveSelection } from "./install-skills.mjs";

async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "webcraft-test-"));
  const source = path.join(root, "source");
  const stages = path.join(root, "stages");
  const target = path.join(root, "target");
  for (const name of ["design-direction", "api-security", "keyboard-focus"]) {
    const directory = path.join(source, name);
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, "SKILL.md"), `# ${name}\n`);
  }
  for (const [stage, names] of [["01-foundation", []], ["02-design", ["design-direction", "keyboard-focus"]], ["03-security", ["api-security", "keyboard-focus"]], ["04-motion", ["design-direction"]], ["08-release", []]]) {
    const directory = path.join(stages, stage);
    await mkdir(directory, { recursive: true });
    const links = names.map((name) => `- [${name}](../../skills/${name}/SKILL.md)`).join("\n");
    const heading = stage === "04-motion" ? "Canonical assets" : "Canonical skills";
    await writeFile(path.join(directory, "README.md"), `# ${stage}\n\n## ${heading}\n\n${links}\n\n## Other content\n`);
  }
  return { root, source, stages, target };
}
async function exists(file) {
  try { await access(file); return true; } catch { return false; }
}

test("parseArgs preserves flags and parses comma-separated selectors", () => {
  const options = parseArgs(["--agent", "claude", "--target", "/tmp/project", "--stage", "02,03", "--skills", "api-security,keyboard-focus", "--dry-run", "--overwrite"]);
  assert.equal(options.agent, "claude");
  assert.equal(options.target, "/tmp/project");
  assert.deepEqual(options.stage, ["02", "03"]);
  assert.deepEqual(options.skills, ["api-security", "keyboard-focus"]);
  assert.equal(options.dryRun, true);
  assert.equal(options.overwrite, true);
  assert.equal(parseArgs(["--agent", "claude", "--force"]).overwrite, true);
  const repeated = parseArgs(["--agent", "claude", "--stage", "2", "--stage", "03", "--skills", "design-direction", "--skills", "api-security"]);
  assert.deepEqual(repeated.stage, ["2", "03"]);
  assert.deepEqual(repeated.skills, ["design-direction", "api-security"]);
});
test("requires agent and selector values", () => {
  assert.throws(() => parseArgs([]), /Specify --agent/);
  assert.throws(() => parseArgs(["--agent", "claude", "--skills"]), /Missing value/);
});
test("installs all skills by default and writes manifest", async () => {
  const f = await fixture();
  try {
    const selected = await resolveSelection({ stage: [], skills: [] }, f);
    assert.deepEqual(selected, ["api-security", "design-direction", "keyboard-focus"]);
    const result = await installSkills({ agent: "codex", targetRoot: f.target, source: f.source, stages: f.stages });
    assert.equal(result.installed.length, 3);
    const manifest = JSON.parse(await readFile(path.join(f.target, ".agents/skills/.webcraft/manifest.json"), "utf8"));
    assert.equal(manifest.version, "1.0");
    assert.equal(manifest.agent, "codex");
    assert.deepEqual(manifest.skills, selected);
    assert.ok(manifest.installedAt);
  } finally { await rm(f.root, { recursive: true, force: true }); }
});
test("--skills installs only the requested subset", async () => {
  const f = await fixture();
  try {
    const result = await installSkills({ agent: "claude", targetRoot: f.target, source: f.source, stages: f.stages, skills: ["api-security", "keyboard-focus"] });
    assert.equal(result.installed.length, 2);
    assert.equal(await exists(path.join(f.target, ".claude/skills/design-direction")), false);
    assert.equal(await exists(path.join(f.target, ".claude/skills/api-security/SKILL.md")), true);
  } finally { await rm(f.root, { recursive: true, force: true }); }
});
test("--stage resolves canonical skill links from numeric prefix", async () => {
  const f = await fixture();
  try {
    assert.deepEqual(await resolveSelection({ stage: ["2"], skills: [] }, f), ["design-direction", "keyboard-focus"]);
    assert.deepEqual(await resolveSelection({ stage: ["04"], skills: [] }, f), ["design-direction"]);
  } finally { await rm(f.root, { recursive: true, force: true }); }
});
test("combined selectors form a sorted deduplicated union", async () => {
  const f = await fixture();
  try {
    assert.deepEqual(await resolveSelection({ stage: ["02", "03"], skills: ["api-security", "design-direction"] }, f), ["api-security", "design-direction", "keyboard-focus"]);
  } finally { await rm(f.root, { recursive: true, force: true }); }
});
test("Stage 1 and Stage 8 return explicit empty-stage errors", async () => {
  const f = await fixture();
  try {
    await assert.rejects(resolveSelection({ stage: ["01"], skills: [] }, f), /has no installable skills/);
    await assert.rejects(resolveSelection({ stage: ["08"], skills: [] }, f), /has no installable skills/);
  } finally { await rm(f.root, { recursive: true, force: true }); }
});
test("unknown skills and stages fail clearly", async () => {
  const f = await fixture();
  try {
    await assert.rejects(resolveSelection({ stage: [], skills: ["missing-skill"] }, f), /Unknown skill "missing-skill"/);
    await assert.rejects(resolveSelection({ stage: ["99"], skills: [] }, f), /Unknown stage "99"/);
  } finally { await rm(f.root, { recursive: true, force: true }); }
});
test("dry-run writes no target directory or manifest", async () => {
  const f = await fixture();
  try {
    const result = await installSkills({ agent: "claude", targetRoot: f.target, source: f.source, stages: f.stages, skills: ["design-direction"], dryRun: true });
    assert.equal(result.planned.length, 1);
    assert.equal(result.installed.length, 0);
    assert.equal(await exists(f.target), false);
  } finally { await rm(f.root, { recursive: true, force: true }); }
});
test("existing skills are skipped and preserved without overwrite", async () => {
  const f = await fixture();
  const existing = path.join(f.target, ".claude/skills/design-direction");
  try {
    await mkdir(existing, { recursive: true });
    await writeFile(path.join(existing, "SKILL.md"), "local version");
    const result = await installSkills({ agent: "claude", targetRoot: f.target, source: f.source, stages: f.stages, skills: ["design-direction"] });
    assert.deepEqual(result.skipped, ["claude:design-direction"]);
    assert.equal(await readFile(path.join(existing, "SKILL.md"), "utf8"), "local version");
    const manifest = JSON.parse(await readFile(path.join(f.target, ".claude/skills/.webcraft/manifest.json"), "utf8"));
    assert.deepEqual(manifest.skills, []);
  } finally { await rm(f.root, { recursive: true, force: true }); }
});
test("--overwrite replaces content and --force is its CLI alias", async () => {
  const f = await fixture();
  const existing = path.join(f.target, ".github/skills/api-security");
  try {
    await mkdir(existing, { recursive: true });
    await writeFile(path.join(existing, "SKILL.md"), "old version");
    const options = parseArgs(["--agent", "copilot", "--force"]);
    const result = await executeInstall(["api-security"], { ...options, targetRoot: f.target, source: f.source });
    assert.deepEqual(result.installed, ["copilot:api-security"]);
    assert.match(await readFile(path.join(existing, "SKILL.md"), "utf8"), /# api-security/);
  } finally { await rm(f.root, { recursive: true, force: true }); }
});
test("all-agent installation retains the three existing destinations", async () => {
  const f = await fixture();
  try {
    const result = await installSkills({ agent: "all", targetRoot: f.target, source: f.source, stages: f.stages, skills: ["design-direction"] });
    assert.equal(result.installed.length, 3);
    for (const directory of [".agents", ".claude", ".github"]) {
      assert.equal(await exists(path.join(f.target, directory, "skills/design-direction/SKILL.md")), true);
    }
  } finally { await rm(f.root, { recursive: true, force: true }); }
});
test("repeated installs retain previously recorded manifest skills", async () => {
  const f = await fixture();
  try {
    const options = { agent: "claude", targetRoot: f.target, source: f.source, stages: f.stages };
    await installSkills({ ...options, skills: ["design-direction"] });
    await installSkills({ ...options, skills: ["api-security"] });
    const manifest = JSON.parse(await readFile(path.join(f.target, ".claude/skills/.webcraft/manifest.json"), "utf8"));
    assert.deepEqual(manifest.skills, ["api-security", "design-direction"]);
  } finally { await rm(f.root, { recursive: true, force: true }); }
});

test("dry-run rejects an invalid existing manifest without writing files", async () => {
  const f = await fixture();
  const destination = path.join(f.target, ".claude/skills");
  try {
    await mkdir(path.join(destination, ".webcraft"), { recursive: true });
    await writeFile(path.join(destination, ".webcraft/manifest.json"), "{invalid");
    await assert.rejects(
      installSkills({ agent: "claude", targetRoot: f.target, source: f.source, stages: f.stages, skills: ["design-direction"], dryRun: true }),
      /manifest is invalid or unsupported/,
    );
    assert.equal(await exists(path.join(destination, "design-direction")), false);
  } finally { await rm(f.root, { recursive: true, force: true }); }
});

test("invalid existing manifest is rejected before copying any selected skill", async () => {
  const f = await fixture();
  const destination = path.join(f.target, ".claude/skills");
  try {
    await mkdir(path.join(destination, ".webcraft"), { recursive: true });
    await writeFile(path.join(destination, ".webcraft/manifest.json"), "{invalid");
    await assert.rejects(
      installSkills({ agent: "claude", targetRoot: f.target, source: f.source, stages: f.stages, skills: ["design-direction"] }),
      /manifest is invalid or unsupported/,
    );
    assert.equal(await exists(path.join(destination, "design-direction")), false);
  } finally { await rm(f.root, { recursive: true, force: true }); }
});


test("concurrent installs serialize manifest updates and retain the union", async () => {
  const f = await fixture();
  try {
    const base = { agent: "claude", targetRoot: f.target, source: f.source, stages: f.stages };
    await Promise.all([
      installSkills({ ...base, skills: ["design-direction"] }),
      installSkills({ ...base, skills: ["api-security"] }),
    ]);
    const manifest = JSON.parse(await readFile(path.join(f.target, ".claude/skills/.webcraft/manifest.json"), "utf8"));
    assert.deepEqual(manifest.skills, ["api-security", "design-direction"]);
  } finally { await rm(f.root, { recursive: true, force: true }); }
});

test("failed overwrite restores the original skill directory", async () => {
  const f = await fixture();
  const destination = path.join(f.target, ".claude/skills/design-direction");
  const missingSource = path.join(f.root, "missing-source");
  try {
    await mkdir(destination, { recursive: true });
    await writeFile(path.join(destination, "SKILL.md"), "user version");
    await assert.rejects(
      executeInstall(["design-direction"], {
        agent: "claude",
        targetRoot: f.target,
        source: missingSource,
        overwrite: true,
      }),
    );
    assert.equal(await readFile(path.join(destination, "SKILL.md"), "utf8"), "user version");
    const entries = await (await import("node:fs/promises")).readdir(path.dirname(destination));
    assert.equal(entries.some((name) => name.includes("webcraft-backup-")), false);
  } finally { await rm(f.root, { recursive: true, force: true }); }
});

test("successful manifest replacement leaves no temporary files", async () => {
  const f = await fixture();
  const metadata = path.join(f.target, ".claude/skills/.webcraft");
  try {
    await installSkills({
      agent: "claude",
      targetRoot: f.target,
      source: f.source,
      stages: f.stages,
      skills: ["design-direction"],
    });
    const entries = await (await import("node:fs/promises")).readdir(metadata);
    assert.deepEqual(entries, ["manifest.json"]);
  } finally { await rm(f.root, { recursive: true, force: true }); }
});


test("every canonical skill is linked from at least one real stage README", async () => {
  const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const stagesRoot = path.join(repositoryRoot, "stages");
  const skillsRoot = path.join(repositoryRoot, "skills");
  const stages = (await readdir(stagesRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && /^\d{2}-/.test(entry.name))
    .map((entry) => entry.name);
  const covered = new Set();
  for (const stage of stages) {
    try {
      for (const skill of await resolveSelection({ stage: [stage], skills: [] })) covered.add(skill);
    } catch (error) {
      if (!/has no installable skills/.test(error.message)) throw error;
    }
  }
  const canonical = (await readdir(skillsRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  assert.deepEqual([...covered].sort(), canonical);
});


test("manifest persistence failure removes newly copied skill directories", async () => {
  const f = await fixture();
  const destination = path.join(f.target, ".claude/skills/design-direction");
  try {
    await assert.rejects(
      executeInstall(["design-direction"], {
        agent: "claude",
        targetRoot: f.target,
        source: f.source,
        persistManifest: async () => { throw new Error("simulated manifest write failure"); },
      }),
      /simulated manifest write failure/,
    );
    assert.equal(await exists(destination), false);
    assert.equal(await exists(path.join(f.target, ".claude/skills/.webcraft/manifest.json")), false);
  } finally { await rm(f.root, { recursive: true, force: true }); }
});

test("manifest persistence failure restores overwritten skill directories", async () => {
  const f = await fixture();
  const destination = path.join(f.target, ".claude/skills/design-direction");
  try {
    await mkdir(destination, { recursive: true });
    await writeFile(path.join(destination, "SKILL.md"), "user version");
    await assert.rejects(
      executeInstall(["design-direction"], {
        agent: "claude",
        targetRoot: f.target,
        source: f.source,
        overwrite: true,
        persistManifest: async () => { throw new Error("simulated manifest write failure"); },
      }),
      /simulated manifest write failure/,
    );
    assert.equal(await readFile(path.join(destination, "SKILL.md"), "utf8"), "user version");
    const entries = await readdir(path.dirname(destination));
    assert.equal(entries.some((name) => name.includes("webcraft-backup-")), false);
  } finally { await rm(f.root, { recursive: true, force: true }); }
});

test("preflights every agent manifest before changing any destination", async () => {
  const f = await fixture();
  const invalidManifest = path.join(f.target, ".github/skills/.webcraft/manifest.json");
  try {
    await mkdir(path.dirname(invalidManifest), { recursive: true });
    await writeFile(invalidManifest, "{invalid");
    await assert.rejects(
      installSkills({
        agent: "all",
        targetRoot: f.target,
        source: f.source,
        stages: f.stages,
        skills: ["design-direction"],
        overwrite: true,
      }),
      /manifest is invalid or unsupported/,
    );
    assert.equal(await exists(path.join(f.target, ".agents/skills/design-direction")), false);
    assert.equal(await exists(path.join(f.target, ".claude/skills/design-direction")), false);
  } finally { await rm(f.root, { recursive: true, force: true }); }
});

test("lock timeout reports the active owner and does not steal its lock", async () => {
  const f = await fixture();
  const lockPath = path.join(f.target, ".claude/skills/.webcraft/manifest.json.lock");
  try {
    await mkdir(lockPath, { recursive: true });
    await writeFile(path.join(lockPath, "owner.json"), JSON.stringify({ pid: process.pid, token: "active-owner" }));
    await assert.rejects(
      executeInstall(["design-direction"], {
        agent: "claude",
        targetRoot: f.target,
        source: f.source,
      }),
      /Timed out waiting for installer lock.*owned by PID/,
    );
    assert.equal(JSON.parse(await readFile(path.join(lockPath, "owner.json"), "utf8")).token, "active-owner");
  } finally { await rm(f.root, { recursive: true, force: true }); }
});

test("detects an abandoned lock and refuses unsafe automatic deletion", async () => {
  const f = await fixture();
  const lockPath = path.join(f.target, ".claude/skills/.webcraft/manifest.json.lock");
  let stalePid = process.pid + 1000000;
  while (true) {
    try {
      process.kill(stalePid, 0);
      stalePid += 1;
    } catch (error) {
      if (error.code === "ESRCH") break;
      if (error.code === "EPERM") {
        stalePid += 1;
        continue;
      }
      throw error;
    }
  }
  try {
    await mkdir(lockPath, { recursive: true });
    await writeFile(
      path.join(lockPath, "owner.json"),
      JSON.stringify({ pid: stalePid, token: "abandoned-owner" }),
    );
    await assert.rejects(
      executeInstall(["design-direction"], {
        agent: "claude",
        targetRoot: f.target,
        source: f.source,
      }),
      /Abandoned installer lock detected.*Remove it manually after confirming no installer is running/,
    );
    assert.equal(await exists(lockPath), true);
    assert.equal(await exists(path.join(f.target, ".claude/skills/design-direction")), false);
  } finally { await rm(f.root, { recursive: true, force: true }); }
});
