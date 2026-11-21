import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checkerPath = path.join(repositoryRoot, "scripts", "check-version-sync.mjs");

async function createRepository({
  packageVersion = "1.5.1",
  lockVersion = packageVersion,
  lockRootVersion = packageVersion,
  readmeVersion = packageVersion,
  changelog = null,
} = {}) {
  const root = await mkdtemp(path.join(os.tmpdir(), "webcraft-version-sync-"));
  await mkdir(path.join(root, "scripts"), { recursive: true });
  await writeFile(path.join(root, "package.json"), JSON.stringify({ name: "fixture", version: packageVersion }, null, 2) + "\n");
  await writeFile(path.join(root, "package-lock.json"), JSON.stringify({
    name: "fixture",
    version: lockVersion,
    lockfileVersion: 3,
    packages: { "": { name: "fixture", version: lockRootVersion } },
  }, null, 2) + "\n");
  const releaseLine = "**Latest release: [v" + readmeVersion + "](https://example.test/releases/tag/v" + readmeVersion + ").**\n";
  await writeFile(path.join(root, "README.md"), "# Fixture\n\n" + releaseLine);
  if (changelog !== null) await writeFile(path.join(root, "CHANGELOG.md"), changelog);
  return root;
}

function runChecker(root, githubRef = "") {
  return spawnSync(process.execPath, [checkerPath], {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, GITHUB_REF: githubRef },
  });
}

test("passes when package, lockfile, README, and release tag agree", async () => {
  const root = await createRepository();
  try {
    const result = runChecker(root, "refs/tags/v1.5.1");
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /agree on 1\.5\.1/);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test("fails when package-lock top-level version drifts", async () => {
  const root = await createRepository({ lockVersion: "1.5.0" });
  try {
    const result = runChecker(root);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /package-lock\.json version is 1\.5\.0/);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test("fails when package-lock root package version drifts", async () => {
  const root = await createRepository({ lockRootVersion: "1.5.0" });
  try {
    const result = runChecker(root);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /packages\[""\]\.version is 1\.5\.0/);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test("fails when README latest release does not match package.json", async () => {
  const root = await createRepository({ readmeVersion: "1.5.0" });
  try {
    const result = runChecker(root);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /README\.md latest release is 1\.5\.0/);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test("fails when a tagged commit does not match package.json", async () => {
  const root = await createRepository();
  try {
    const result = runChecker(root, "refs/tags/v1.6.0");
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Git tag version is 1\.6\.0/);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test("does not require a release tag on a normal branch build", async () => {
  const root = await createRepository();
  try {
    const result = runChecker(root, "refs/heads/main");
    assert.equal(result.status, 0, result.stderr);
  } finally { await rm(root, { recursive: true, force: true }); }
});

test("validates the newest changelog heading when CHANGELOG.md exists", async () => {
  const root = await createRepository({ changelog: "## [1.5.0] - 2026-10-01\n\nOlder release.\n" });
  try {
    const result = runChecker(root);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /CHANGELOG\.md latest version heading is 1\.5\.0/);
  } finally { await rm(root, { recursive: true, force: true }); }
});
