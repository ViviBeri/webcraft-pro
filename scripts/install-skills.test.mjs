import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { installSkills } from "./install-skills.mjs";

async function createSource(root) {
  for (const name of ["design-direction", "api-security"]) {
    const directory = path.join(root, name);
    await mkdir(directory, { recursive: true });
    await writeFile(
      path.join(directory, "SKILL.md"),
      `---\nname: ${name}\ndescription: Test skill description for installer.\n---\n\n# ${name}\n`,
    );
  }
}

test("installs selected skills to the Codex project path", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "webcraft-install-"));
  const source = path.join(root, "source");
  const target = path.join(root, "target");

  try {
    await createSource(source);
    const result = await installSkills({ agent: "codex", source, targetRoot: target });

    assert.equal(result.installed.length, 2);
    assert.equal(result.skipped.length, 0);
    const installed = await readFile(
      path.join(target, ".agents", "skills", "design-direction", "SKILL.md"),
      "utf8",
    );
    assert.match(installed, /# design-direction/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("preserves existing skill directories by default", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "webcraft-install-"));
  const source = path.join(root, "source");
  const target = path.join(root, "target");
  const existing = path.join(target, ".claude", "skills", "design-direction");

  try {
    await createSource(source);
    await mkdir(existing, { recursive: true });
    await writeFile(path.join(existing, "SKILL.md"), "local version");

    const result = await installSkills({ agent: "claude", source, targetRoot: target });

    assert.equal(result.skipped.length, 1);
    assert.equal(await readFile(path.join(existing, "SKILL.md"), "utf8"), "local version");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("overwrites only when explicitly requested", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "webcraft-install-"));
  const source = path.join(root, "source");
  const target = path.join(root, "target");
  const existing = path.join(target, ".github", "skills", "api-security");

  try {
    await createSource(source);
    await mkdir(existing, { recursive: true });
    await writeFile(path.join(existing, "SKILL.md"), "old version");

    const result = await installSkills({
      agent: "copilot",
      source,
      targetRoot: target,
      overwrite: true,
    });

    assert.equal(result.installed.length, 2);
    assert.equal(result.skipped.length, 0);
    assert.match(
      await readFile(path.join(existing, "SKILL.md"), "utf8"),
      /# api-security/,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("installs to all supported agent locations", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "webcraft-install-"));
  const source = path.join(root, "source");
  const target = path.join(root, "target");

  try {
    await createSource(source);
    const result = await installSkills({ agent: "all", source, targetRoot: target });

    assert.equal(result.installed.length, 6);
    for (const directory of [".agents", ".claude", ".github"]) {
      assert.equal(
        await readFile(
          path.join(target, directory, "skills", "design-direction", "SKILL.md"),
          "utf8",
        ).then(() => true),
        true,
      );
    }
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("dry run reports planned changes without creating the target", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "webcraft-install-"));
  const source = path.join(root, "source");
  const target = path.join(root, "target");

  try {
    await createSource(source);
    const result = await installSkills({
      agent: "codex",
      source,
      targetRoot: target,
      dryRun: true,
    });

    assert.equal(result.installed.length, 2);
    await assert.rejects(readFile(path.join(target, ".agents", "skills", "design-direction", "SKILL.md")));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("rejects unsupported agent names", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "webcraft-install-"));

  try {
    await createSource(path.join(root, "source"));
    await assert.rejects(
      installSkills({ agent: "unknown", source: path.join(root, "source"), targetRoot: root }),
      /Unsupported agent/,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
