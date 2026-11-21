import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { analyzeSkills } from "./skill-doctor.mjs";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const script = path.join(repositoryRoot, "scripts", "skill-doctor.mjs");
const validatorSource = await readFile(path.join(repositoryRoot, "scripts", "validate-skills.mjs"), "utf8");
const schemaPath = path.join(repositoryRoot, "docs", "schemas", "skill-doctor-report.v1.json");
const requiredFiles = [
  "AGENTS.md", "CLAUDE.md", ".github/copilot-instructions.md", "stages/README.md",
  "stages/01-foundation/README.md", "stages/02-design-intelligence/README.md",
  "stages/03-frontend-engineering/README.md", "stages/04-motion-gsap/README.md",
  "stages/05-accessibility/README.md", "stages/06-web-api-security/README.md",
  "stages/07-performance/README.md", "stages/08-browser-qa-release/README.md",
];

async function fixture(t, skills) {
  const root = await mkdtemp(path.join(os.tmpdir(), "webcraft-skill-doctor-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, "scripts"), { recursive: true });
  await writeFile(path.join(root, "scripts", "validate-skills.mjs"), validatorSource, "utf8");
  for (const file of requiredFiles) {
    const destination = path.join(root, file);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, "# Test fixture\n", "utf8");
  }
  for (const [name, content] of Object.entries(skills)) {
    const directory = path.join(root, "skills", name);
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, "SKILL.md"), content, "utf8");
  }
  return root;
}

function skill(name, description, body = "") {
  return "---\nname: " + name + "\ndescription: " + description +
    "\n---\n\n# " + name + "\n\n" + body;
}

function run(root, ...args) {
  return spawnSync(process.execPath, [script, ...args, "--root", root], {
    cwd: os.tmpdir(),
    encoding: "utf8",
  });
}

function validateReportAgainstSchema(report, schema) {
  const properties = schema.properties;
  assert.deepEqual(Object.keys(report).sort(), Object.keys(properties).sort());
  for (const key of schema.required) assert.ok(Object.hasOwn(report, key));
  assert.equal(report.schemaVersion, properties.schemaVersion.const);
  assert.equal(report.tool, properties.tool.const);

  const summarySchema = properties.summary;
  assert.deepEqual(Object.keys(report.summary).sort(), Object.keys(summarySchema.properties).sort());
  for (const key of summarySchema.required) {
    assert.ok(Number.isInteger(report.summary[key]));
    assert.ok(report.summary[key] >= 0);
  }

  assert.ok(Array.isArray(report.diagnostics));
  assert.equal(report.summary.diagnostics, report.diagnostics.length);
  for (const item of report.diagnostics) {
    const itemSchema = properties.diagnostics.items;
    const itemProperties = itemSchema.properties;
    for (const key of itemSchema.required) assert.ok(Object.hasOwn(item, key));
    assert.ok(Object.keys(item).every((key) => Object.hasOwn(itemProperties, key)));
    assert.match(item.ruleId, new RegExp(itemProperties.ruleId.pattern));
    assert.ok(itemProperties.severity.enum.includes(item.severity));
    assert.equal(typeof item.file, "string");
    assert.equal(typeof item.message, "string");
    assert.equal(typeof item.fixHint, "string");
    assert.ok(Array.isArray(item.relatedFiles));
    assert.equal(new Set(item.relatedFiles).size, item.relatedFiles.length);
    if (Object.hasOwn(item, "line")) {
      assert.ok(Number.isInteger(item.line) && item.line >= 1);
    }
  }

  const severityKeys = { errors: "error", warnings: "warning", info: "info" };
  for (const [key, severity] of Object.entries(severityKeys)) {
    assert.equal(
      report.summary[key],
      report.diagnostics.filter((item) => item.severity === severity).length,
    );
  }
}

test("validator subprocess supplies metadata and is actually invoked", async (t) => {
  const root = await fixture(t, {
    alpha: skill("alpha", "A focused description supplied by the validator."),
  });
  const marker = path.join(root, "validator-was-run");
  const stub = [
    'import { writeFileSync } from "node:fs";',
    "writeFileSync(" + JSON.stringify(marker) + ', "called");',
    'console.log(JSON.stringify({ valid: true, skills: [{ directory: "alpha", file: "skills/alpha/SKILL.md", name: "alpha", description: "Stub-provided description." }], errors: [] }));',
  ].join("\n");
  await writeFile(path.join(root, "scripts", "validate-skills.mjs"), stub, "utf8");

  const report = await analyzeSkills(root);
  assert.equal(await readFile(marker, "utf8"), "called");
  assert.equal(report.summary.filesScanned, 1);
  assert.deepEqual(report.diagnostics, []);
});

test("validator subprocess inherits repository cwd while CLI runs from outside the repository", async (t) => {
  const root = await fixture(t, {
    alpha: skill("alpha", "A focused description supplied by the validator."),
  });
  const result = run(root, "--json");
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).summary.filesScanned, 1);
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

test("valid relative Markdown links resolve to canonical skill files", async (t) => {
  const root = await fixture(t, {
    alpha: skill("alpha", "Use alpha for a focused example workflow.", "[Beta](../beta/SKILL.md)"),
    beta: skill("beta", "Use beta for a separate focused example workflow."),
  });
  const report = await analyzeSkills(root);
  assert.equal(report.summary.diagnostics, 0);
});

test("absolute paths are rejected as non-canonical references", async (t) => {
  const root = await fixture(t, {
    alpha: skill("alpha", "Use alpha for a focused example workflow.", "[Outside](/tmp/beta/SKILL.md)"),
  });
  const report = await analyzeSkills(root);
  assert.equal(report.summary.errors, 1);
  assert.match(report.diagnostics[0].message, /canonical skill/);
});

test("path traversal outside the skills tree is rejected", async (t) => {
  const root = await fixture(t, {
    alpha: skill("alpha", "Use alpha for a focused example workflow.", "[Outside](../../../outside/SKILL.md)"),
  });
  const report = await analyzeSkills(root);
  assert.equal(report.summary.errors, 1);
});

test("nested non-canonical SKILL.md paths are rejected", async (t) => {
  const root = await fixture(t, {
    alpha: skill("alpha", "Use alpha for a focused example workflow.", "[Nested](../beta/docs/SKILL.md)"),
    beta: skill("beta", "Use beta for a separate focused example workflow."),
  });
  const report = await analyzeSkills(root);
  assert.equal(report.summary.errors, 1);
});

test("external URLs are ignored", async (t) => {
  const root = await fixture(t, {
    alpha: skill("alpha", "Use alpha for a focused example workflow.", "[External](https://example.com/skills/beta/SKILL.md)"),
  });
  assert.equal((await analyzeSkills(root)).summary.diagnostics, 0);
});

test("anchor-only destinations are ignored", async (t) => {
  const root = await fixture(t, {
    alpha: skill("alpha", "Use alpha for a focused example workflow.", "[Anchor](#local-section)"),
  });
  assert.equal((await analyzeSkills(root)).summary.diagnostics, 0);
});

test("prose mentions are ignored", async (t) => {
  const root = await fixture(t, {
    alpha: skill("alpha", "Use alpha for a focused example workflow.", "The prose mentions skills/beta/SKILL.md without a Markdown link."),
  });
  assert.equal((await analyzeSkills(root)).summary.diagnostics, 0);
});

test("fenced Markdown examples are ignored", async (t) => {
  const fence = String.fromCharCode(96).repeat(3);
  const body = [
    fence + "md",
    "[Code example](../missing/SKILL.md)",
    fence,
    "~~~md",
    "[Tilde code example](../missing-too/SKILL.md)",
    "~~~",
  ].join("\n");
  const root = await fixture(t, {
    alpha: skill("alpha", "Use alpha for a focused example workflow.", body),
  });
  assert.equal((await analyzeSkills(root)).summary.diagnostics, 0);
});

test("absolute POSIX and Windows filesystem paths are rejected", async (t) => {
  const body = [
    "[POSIX](/tmp/beta/SKILL.md)",
    "[Windows](C:\\temp\\beta\\SKILL.md)",
  ].join("\n");
  const root = await fixture(t, {
    alpha: skill("alpha", "Use alpha for a focused example workflow.", body),
  });
  const report = await analyzeSkills(root);
  assert.equal(report.summary.errors, 2);
});

test("path traversal outside the skills tree is rejected", async (t) => {
  const root = await fixture(t, {
    alpha: skill("alpha", "Use alpha for a focused example workflow.", "[Outside](../../../outside/SKILL.md)"),
  });
  assert.equal((await analyzeSkills(root)).summary.errors, 1);
});

test("nested non-canonical SKILL.md paths are rejected", async (t) => {
  const root = await fixture(t, {
    alpha: skill("alpha", "Use alpha for a focused example workflow.", "[Nested](../beta/docs/SKILL.md)"),
    beta: skill("beta", "Use beta for a separate focused example workflow."),
  });
  assert.equal((await analyzeSkills(root)).summary.errors, 1);
});

test("diagnostics sort by file, line, and rule ID rather than discovery order", async (t) => {
  const first = "Use this skill for a shared capability [Missing](../missing/SKILL.md)";
  const second = "Use this skill for a different duplicate description group.";
  const root = await fixture(t, {
    alpha: skill("alpha", first),
    zeta: skill("zeta", first),
    beta: skill("beta", second, "[Later](../missing-too/SKILL.md)"),
    gamma: skill("gamma", second),
  });
  const report = await analyzeSkills(root);
  assert.deepEqual(
    report.diagnostics.map((item) => [item.file, item.line, item.ruleId]),
    [
      ["skills/alpha/SKILL.md", 3, "SKILL001"],
      ["skills/alpha/SKILL.md", 3, "SKILL002"],
      ["skills/beta/SKILL.md", 3, "SKILL001"],
      ["skills/beta/SKILL.md", 8, "SKILL002"],
      ["skills/gamma/SKILL.md", 3, "SKILL001"],
      ["skills/zeta/SKILL.md", 3, "SKILL001"],
      ["skills/zeta/SKILL.md", 3, "SKILL002"],
    ],
  );
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

test("--json output validates against the published JSON Schema", async (t) => {
  const root = await fixture(t, {
    alpha: skill("alpha", "Use this skill for a focused example workflow."),
    beta: skill("beta", "Use this skill for a focused example workflow."),
    gamma: skill("gamma", "Use gamma for a different workflow.", "[Missing](../missing/SKILL.md)"),
  });
  const result = run(root, "--json");
  assert.equal(result.status, 1);
  assert.equal(result.stderr, "");
  const report = JSON.parse(result.stdout);
  const schema = JSON.parse(await readFile(schemaPath, "utf8"));
  validateReportAgainstSchema(report, schema);
});
