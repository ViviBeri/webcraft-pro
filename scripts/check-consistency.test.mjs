import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const checkerPath = path.join(repositoryRoot, "scripts", "check-consistency.mjs");

async function createRepository({
  skillCount = 44,
  readme = "A toolkit with 44 reusable Agent Skills.\n",
  landing = "<p>44 skills.</p>\n",
  catalog = "The canonical 44-skill inventory.\n",
  description = "A framework-agnostic toolkit with 44 skills.",
  extraDirectory = false,
} = {}) {
  const root = await mkdtemp(path.join(os.tmpdir(), "webcraft-consistency-"));
  await mkdir(path.join(root, "skills"), { recursive: true });
  await mkdir(path.join(root, "docs"), { recursive: true });

  for (let index = 0; index < skillCount; index += 1) {
    const directory = path.join(root, "skills", `skill-${String(index + 1).padStart(2, "0")}`);
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, "SKILL.md"), "# Fixture skill\n");
  }

  if (extraDirectory) {
    const directory = path.join(root, "skills", "not-a-canonical-skill");
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, "README.md"), "# Not a skill\n");
  }

  await writeFile(path.join(root, "README.md"), readme);
  await writeFile(path.join(root, "docs", "index.html"), landing);
  await writeFile(path.join(root, "skills", "README.md"), catalog);
  await writeFile(
    path.join(root, "package.json"),
    JSON.stringify({
      name: "fixture",
      version: "1.0.0",
      description,
    }, null, 2) + "\n",
  );

  return root;
}

function runChecker(root) {
  return spawnSync(process.execPath, [checkerPath], {
    cwd: root,
    encoding: "utf8",
  });
}

test("passes when all public skill-count claims match 44 canonical SKILL.md files", async () => {
  const root = await createRepository();

  try {
    const result = runChecker(root);
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /44 canonical SKILL\.md files/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("reports a mismatched public claim with its file and line number", async () => {
  const root = await createRepository({
    readme: "Toolkit overview.\nThis project contains 43 reusable skills.\n",
  });

  try {
    const result = runChecker(root);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /README\.md:2: expected 44, found 43/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("does not treat a ranked Top 10 skills list as the repository inventory", async () => {
  const root = await createRepository({
    readme: "Top 10 skills for accessible interfaces.\nRollout to the remaining 41 skills is tracked separately.\n",
    landing: "<p>Top 10 skills selected by popularity.</p>\n",
    catalog: "Browse the skills catalog.\n",
    description: "A framework-agnostic engineering toolkit.",
  });

  try {
    const result = runChecker(root);
    assert.equal(result.status, 0, result.stderr);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("counts only skill directories that contain a direct SKILL.md file", async () => {
  const root = await createRepository({ extraDirectory: true });

  try {
    const result = runChecker(root);
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /44 canonical SKILL\.md files/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("checks the package description only when it contains a skill-count claim", async () => {
  const root = await createRepository({
    description: "A toolkit containing 43 reusable skills.",
  });

  try {
    const result = runChecker(root);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /package\.json:\d+: expected 44, found 43/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
