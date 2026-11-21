import assert from "node:assert/strict";
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
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
    await writeFile(path.join(directory, "README.md"), `# ${stage}\n\n## Canonical skills\n\n${links}\n\n## Other content\n`);
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
  assert.equal(parseArgs(["--agent", "claude", "--force"]).overwrite, true);\n  const repeated = parseArgs(["--agent", "claude", "--stage", "2", "--stage", "03", "--skills", "design-direction", "--skills", "api-security"]);\n  assert.deepEqual(repeated.stage, ["2", "03"]);\n  assert.deepEqual(repeated.skills, ["design-direction", "api-security"]);
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
    assert.deepEqual(await resolveSelection({ stage: ["2"], skills: [] }, f), ["design-direction", "keyboard-focus"]);\n    assert.deepEqual(await resolveSelection({ stage: ["04"], skills: [] }, f), ["design-direction"]);
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
});\n
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
