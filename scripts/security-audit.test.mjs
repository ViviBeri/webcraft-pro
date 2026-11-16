import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const auditPath = path.join(repositoryRoot, "scripts", "security-audit.mjs");

async function createAuditRoot() {
  const root = await mkdtemp(path.join(os.tmpdir(), "webcraft-security-"));

  for (const directory of ["examples", "standards", "skills"]) {
    await mkdir(path.join(root, directory), { recursive: true });
  }

  return root;
}

function runAudit(root) {
  return spawnSync(process.execPath, [auditPath, "--root", root, "--json"], {
    encoding: "utf8",
  });
}

test("finds eval() in a Markdown code fence and exits with code 1", async () => {
  const root = await createAuditRoot();

  try {
    await writeFile(
      path.join(root, "examples", "unsafe.md"),
      "```js\neval(userInput);\n```\n",
    );

    const result = runAudit(root);
    assert.equal(result.status, 1, result.stderr);

    const report = JSON.parse(result.stdout);
    assert.equal(report.findings.length, 1);
    assert.equal(report.findings[0].rule, "no-eval");
    assert.equal(report.findings[0].file, path.join("examples", "unsafe.md"));
    assert.equal(report.findings[0].line, 2);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("ignores fenced blocks tagged bad or insecure", async () => {
  const root = await createAuditRoot();

  try {
    await writeFile(
      path.join(root, "examples", "documented-exceptions.md"),
      [
        "```js bad",
        "eval(unsafeExample);",
        "```",
        "",
        "```javascript insecure",
        "eval(anotherUnsafeExample);",
        "```",
        "",
      ].join("\n"),
    );

    const result = runAudit(root);
    assert.equal(result.status, 0, result.stderr);

    const report = JSON.parse(result.stdout);
    assert.equal(report.findings.length, 0);
    assert.equal(report.filesScanned, 1);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("returns exit code 2 when the root directory is missing", async () => {
  const temporaryParent = await mkdtemp(path.join(os.tmpdir(), "webcraft-security-missing-"));
  const missingRoot = path.join(temporaryParent, "does-not-exist");

  try {
    const result = runAudit(missingRoot);
    assert.equal(result.status, 2);
    assert.match(result.stderr, /Cannot access root directory/);
  } finally {
    await rm(temporaryParent, { recursive: true, force: true });
  }
});
