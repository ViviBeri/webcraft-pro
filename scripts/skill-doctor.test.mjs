import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { analyzeSkills } from "./skill-doctor.mjs";

const script = path.resolve("scripts/skill-doctor.mjs");

async function fixture(t, skills) {
  const root = await mkdtemp(path.join(os.tmpdir(), "webcraft-skill-doctor-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  for (const [name, content] of Object.entries(skills)) {
    const directory = path.join(root, "skills", name);
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, "SKILL.md"), content, "utf8");
  }
  return root;
}

function skill(name, description, body = "") {
  return `---\nname: ${name}\ndescription: ${description}\n---\n\n# ${name}\n\n${body}`;
}

function run(root, ...args) {
  return spawnSync(process.execPath, [script, ...args], {
    cwd: root,
    encoding: "utf8",
  });
}

test("empty clean inventory returns stable zero-diagnostic report", async (t) => {
  const root = await fixture(t, {
    alpha: skill("alpha", "Use alpha for a focused example workflow."),
  });
  const report = await analyzeSkills(root);
  assert.equal(report.schemaVersion, "1.0");
  assert.equal(report.tool, "webcraft-skill-doctor");
  assert.deepEqual(report.summary, {
    filesScanned: 1, diagnostics: 0, errors: 0, warnings: 0, info: 0,
  });
  assert.deepEqual(report.diagnostics, []);
});

test("duplicate descriptions produce deterministic warning diagnostics", async (t) => {
  const description = "Use this skill for a focused example workflow.";
  const root = await fixture(t, {
    alpha: skill("alpha", description),
    beta: skill("beta", description),
  });
  const report = await analyzeSkills(root);
  assert.equal(report.summary.warnings, 2);
  assert.equal(report.summary.errors, 0);
  assert.deepEqual(report.diagnostics.map((item) => item.file), [
    "skills/alpha/SKILL.md", "skills/beta/SKILL.md",
  ]);
  assert.ok(report.diagnostics.every((item) =>
    item.ruleId === "SKILL001" &&
    item.severity === "warning" &&
    item.fixHint.length > 0 &&
    item.relatedFiles.length === 1
  ));
});

test("broken inter-skill links produce error diagnostics with source lines", async (t) => {
  const root = await fixture(t, {
    alpha: skill("alpha", "Use alpha for a focused example workflow.", "[Missing](../missing/SKILL.md)"),
  });
  const report = await analyzeSkills(root);
  assert.equal(report.summary.errors, 1);
  assert.equal(report.diagnostics[0].ruleId, "SKILL002");
  assert.equal(report.diagnostics[0].line, 8);
  assert.match(report.diagnostics[0].message, /missing/);
});

test("valid relative inter-skill links are accepted", async (t) => {
  const root = await fixture(t, {
    alpha: skill("alpha", "Use alpha for a focused example workflow.", "[Beta](../beta/SKILL.md)"),
    beta: skill("beta", "Use beta for a separate focused example workflow."),
  });
  const report = await analyzeSkills(root);
  assert.equal(report.summary.diagnostics, 0);
});

test("default mode passes warnings while strict mode fails them", async (t) => {
  const description = "Use this skill for a focused example workflow.";
  const root = await fixture(t, {
    alpha: skill("alpha", description),
    beta: skill("beta", description),
  });
  assert.equal(run(root).status, 0);
  assert.equal(run(root, "--strict").status, 1);
});

test("errors fail in default and strict modes; tool failures exit 2", async (t) => {
  const root = await fixture(t, {
    alpha: skill("alpha", "Use alpha for a focused example workflow.", "[Missing](../missing/SKILL.md)"),
  });
  assert.equal(run(root).status, 1);
  assert.equal(run(root, "--strict").status, 1);
  const missingRoot = await mkdtemp(path.join(os.tmpdir(), "webcraft-doctor-error-"));
  t.after(() => rm(missingRoot, { recursive: true, force: true }));
  assert.equal(run(missingRoot).status, 2);
  assert.equal(run(missingRoot, "--unknown").status, 2);
});

test("--json emits parseable contract output without console noise", async (t) => {
  const root = await fixture(t, {
    alpha: skill("alpha", "Use alpha for a focused example workflow."),
  });
  const result = run(root, "--json");
  assert.equal(result.status, 0);
  const report = JSON.parse(result.stdout);
  assert.equal(report.tool, "webcraft-skill-doctor");
  assert.ok(Array.isArray(report.diagnostics));
  assert.equal(result.stderr, "");
});
