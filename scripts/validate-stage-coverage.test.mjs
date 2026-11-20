import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const validatorPath = path.join(repositoryRoot, "scripts", "validate-stage-coverage.mjs");
const stageNames = [
  "01-foundation",
  "02-design",
  "03-frontend",
  "04-motion",
  "05-accessibility",
  "06-security",
  "07-performance",
  "08-release",
];

async function createRepository({ skills = ["example-skill"], stageCount = 8, sections = [] } = {}) {
  const root = await mkdtemp(path.join(os.tmpdir(), "webcraft-stage-coverage-"));
  await mkdir(path.join(root, "skills"), { recursive: true });
  await mkdir(path.join(root, "stages"), { recursive: true });

  for (const skill of skills) {
    const directory = path.join(root, "skills", skill);
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, "SKILL.md"), "# Fixture skill\n");
  }

  for (const stageName of stageNames.slice(0, stageCount)) {
    const directory = path.join(root, "stages", stageName);
    await mkdir(directory, { recursive: true });
    const section = sections.find((item) => item.stage === stageName);
    const content = section?.content ?? "## Purpose\nFixture stage.\n";
    await writeFile(path.join(directory, "README.md"), content);
  }

  return root;
}

function runValidator(root) {
  return spawnSync(process.execPath, [validatorPath], {
    cwd: root,
    encoding: "utf8",
  });
}

test("accepts a valid repository and allows multiple-stage membership", async () => {
  const root = await createRepository({
    skills: ["example-skill"],
    sections: [
      {
        stage: "02-design",
        content: "## Canonical skills\n- [Example](../../skills/example-skill/SKILL.md)\n",
      },
      {
        stage: "03-frontend",
        content: "## Canonical assets\n- [Example](../../skills/example-skill/SKILL.md#workflow)\n",
      },
    ],
  });

  try {
    const result = runValidator(root);
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /1 canonical skills are assigned across 8 stages/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("rejects an unknown skill link with a URL fragment", async () => {
  const root = await createRepository({
    sections: [{
      stage: "02-design",
      content: "## Canonical skills\n- [Unknown](../../skills/unknown-skill/SKILL.md#workflow)\n",
    }],
  });

  try {
    const result = runValidator(root);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Unknown skill reference "unknown-skill"/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("rejects a canonical skill directory without SKILL.md", async () => {
  const root = await createRepository({ skills: [] });
  const missingDirectory = path.join(root, "skills", "missing-file");
  await mkdir(missingDirectory, { recursive: true });
  await writeFile(
    path.join(root, "stages", "02-design", "README.md"),
    "## Canonical skills\n- [Missing file](../../skills/missing-file/SKILL.md)\n",
  );

  try {
    const result = runValidator(root);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Missing SKILL\.md for "missing-file"/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("rejects a canonical skill that is not assigned to any stage", async () => {
  const root = await createRepository({
    skills: ["unassigned-skill"],
  });

  try {
    const result = runValidator(root);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Canonical skills missing from every stage: unassigned-skill/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("rejects an incorrect numbered stage count", async () => {
  const root = await createRepository({ stageCount: 7 });

  try {
    const result = runValidator(root);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Expected 8 numbered stage directories; found 7/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("does not count skill links outside the canonical section", async () => {
  const root = await createRepository({
    sections: [{
      stage: "02-design",
      content: [
        "## Purpose",
        "A non-canonical reference: [Example](../../skills/example-skill/SKILL.md)",
        "## Canonical skills",
        "No skill links here.",
      ].join("\n"),
    }],
  });

  try {
    const result = runValidator(root);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Canonical skills missing from every stage: example-skill/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("checks canonical skill sections across all eight stage READMEs", async () => {
  const skillStages = stageNames.slice(1, 7);
  const skills = skillStages.map((stageName) => `${stageName}-skill`);
  const sections = stageNames.map((stageName, index) => {
    if (index === 0 || index === 7) {
      return {
        stage: stageName,
        content: "## Canonical assets\\n- [Stage index](../../stages/README.md)\\n",
      };
    }

    const skill = `${stageName}-skill`;
    const heading = index % 2 === 0 ? "Canonical assets" : "Canonical skills";
    return {
      stage: stageName,
      content: `## ${heading}\\n- [Stage skill](../../skills/${skill}/SKILL.md)\\n`,
    };
  });
  const root = await createRepository({ skills, sections });

  try {
    const result = runValidator(root);
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /6 canonical skills are assigned across 8 stages/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
