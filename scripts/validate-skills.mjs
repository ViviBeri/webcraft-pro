import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const skillsRoot = path.join(root, "skills");

const errors = [];
const names = new Set();

function reportError(message) {
  errors.push(message);
}

function readScalar(frontmatter, key) {
  const match = frontmatter.match(new RegExp("^" + key + ":\\s*(.*)$", "m"));

  if (!match) {
    return null;
  }

  const value = match[1].trim();

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

async function validateSkill(directory) {
  const skillDirectory = path.join(skillsRoot, directory);
  const skillFile = path.join(skillDirectory, "SKILL.md");

  let content;

  try {
    content = await readFile(skillFile, "utf8");
  } catch {
    reportError(`${directory}: Missing SKILL.md`);
    return;
  }

  if (!content.startsWith("---\n")) {
    reportError(`${directory}: Missing YAML frontmatter`);
    return;
  }

  const closingIndex = content.indexOf("\n---\n", 4);

  if (closingIndex === -1) {
    reportError(`${directory}: Missing closing frontmatter delimiter`);
    return;
  }

  const frontmatter = content.slice(4, closingIndex);
  const name = readScalar(frontmatter, "name");
  const description = readScalar(frontmatter, "description");

  if (!name) {
    reportError(`${directory}: Missing or empty name field`);
    return;
  }

  if (!description) {
    reportError(`${directory}: Missing or empty description field`);
    return;
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
    reportError(`${directory}: Invalid skill name "${name}"`);
  }

  if (name.length > 64) {
    reportError(`${directory}: Skill name exceeds 64 characters`);
  }

  if (name !== directory) {
    reportError(`${directory}: Skill name must match its directory`);
  }

  if (names.has(name)) {
    reportError(`${directory}: Duplicate skill name "${name}"`);
  }

  names.add(name);

  if (description.length < 20 || description.length > 1024) {
    reportError(
      `${directory}: Description must contain 20-1024 characters`
    );
  }

  const instructions = content.slice(closingIndex + 5).trim();

  if (instructions.length === 0) {
    reportError(`${directory}: Skill instructions are empty`);
  }
}

async function main() {
  let entries;

  try {
    entries = await readdir(skillsRoot, { withFileTypes: true });
  } catch {
    console.error("ERROR: skills/ directory does not exist.");
    process.exitCode = 1;
    return;
  }

  const directories = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  for (const directory of directories) {
    await validateSkill(directory);
  }

  if (errors.length > 0) {
    console.error("Skill validation failed:");

    for (const error of errors) {
      console.error(`- ${error}`);
    }

    process.exitCode = 1;
    return;
  }

  console.log(
    `Skill validation passed. Validated ${directories.length} skill(s).`
  );
}

await main();
