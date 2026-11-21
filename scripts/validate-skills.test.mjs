import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const validatorPath = path.join(repositoryRoot, "scripts", "validate-skills.mjs");

const requiredFiles = [
  "AGENTS.md",
  "CLAUDE.md",
  ".github/copilot-instructions.md",
  "stages/README.md",
  "stages/01-foundation/README.md",
  "stages/02-design-intelligence/README.md",
  "stages/03-frontend-engineering/README.md",
  "stages/04-motion-gsap/README.md",
  "stages/05-accessibility/README.md",
  "stages/06-web-api-security/README.md",
  "stages/07-performance/README.md",
  "stages/08-browser-qa-release/README.md",
];

async function createRepository({ skills = [], omitFiles = [] } = {}) {
  const root = await mkdtemp(path.join(os.tmpdir(), "webcraft-validate-"));
  await mkdir(path.join(root, "skills"), { recursive: true });

  for (const file of requiredFiles) {
    if (omitFiles.includes(file)) {
      continue;
    }

    const destination = path.join(root, file);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, "# Test fixture\n");
  }

  for (const skill of skills) {
    const directory = path.join(root, "skills", skill.directory);
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, "SKILL.md"), skill.content);
  }

  return root;
}

function runValidator(root, args = []) {
  return spawnSync(process.execPath, [validatorPath, ...args], {
    cwd: root,
    encoding: "utf8",
  });
}

const validSkill = (name) =>
  `---\nname: ${name}\ndescription: A sufficiently descriptive test skill for validation.\n---\n\n# Instructions\n\nFollow the test fixture instructions.\n`;

test("accepts a valid skill and complete repository structure", async () => {
  const root = await createRepository({
    skills: [{ directory: "example-skill", content: validSkill("example-skill") }],
  });

  try {
    const result = runValidator(root);
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /Validated 1 skill/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("JSON mode exposes validated metadata while default output remains byte-for-byte stable", async () => {
  const root = await createRepository({
    skills: [{ directory: "example-skill", content: validSkill("example-skill") }],
  });

  try {
    const defaultResult = runValidator(root);
    const jsonResult = runValidator(root, ["--json"]);
    assert.equal(defaultResult.status, 0, defaultResult.stderr);
    assert.equal(jsonResult.status, 0, jsonResult.stderr);
    assert.equal(
      defaultResult.stdout,
      "Repository validation passed. Validated 1 skill(s), 8 stage index file(s), and 3 agent entry point(s).\n",
    );
    const report = JSON.parse(jsonResult.stdout);
    assert.deepEqual(report, {
      valid: true,
      skills: [{
        directory: "example-skill",
        file: "skills/example-skill/SKILL.md",
        name: "example-skill",
        description: "A sufficiently descriptive test skill for validation.",
      }],
      errors: [],
    });
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("rejects malformed frontmatter", async () => {
  const root = await createRepository({
    skills: [{
      directory: "broken-skill",
      content: "---\nname: broken-skill\ndescription: Missing closing delimiter and instructions.\n",
    }],
  });

  try {
    const result = runValidator(root);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Missing closing frontmatter delimiter/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("rejects missing name and description fields", async (t) => {
  const cases = [
    {
      directory: "missing-name",
      content: "---\ndescription: A sufficiently descriptive test skill.\n---\n\nInstructions.\n",
      expected: /Missing or empty name field/,
    },
    {
      directory: "missing-description",
      content: "---\nname: missing-description\n---\n\nInstructions.\n",
      expected: /Missing or empty description field/,
    },
  ];

  for (const fixture of cases) {
    await t.test(fixture.directory, async () => {
      const root = await createRepository({ skills: [fixture] });

      try {
        const result = runValidator(root);
        assert.equal(result.status, 1);
        assert.match(result.stderr, fixture.expected);
      } finally {
        await rm(root, { recursive: true, force: true });
      }
    });
  }
});

test("rejects duplicate skill names", async () => {
  const root = await createRepository({
    skills: [
      { directory: "first-skill", content: validSkill("shared-name") },
      { directory: "second-skill", content: validSkill("shared-name") },
    ],
  });

  try {
    const result = runValidator(root);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Duplicate skill name "shared-name"/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("rejects a repository missing a required file", async () => {
  const missingFile = "stages/08-browser-qa-release/README.md";
  const root = await createRepository({ omitFiles: [missingFile] });

  try {
    const result = runValidator(root);
    assert.equal(result.status, 1);
    assert.ok(result.stderr.includes(missingFile), result.stderr);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
