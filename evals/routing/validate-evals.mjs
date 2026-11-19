import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const routingRoot = path.join(root, "evals", "routing");
const skillsRoot = path.join(root, "skills");

function fail(message) {
  console.error(`Routing eval validation failed: ${message}`);
  process.exitCode = 1;
}

async function readJson(file) {
  try {
    return JSON.parse(await readFile(path.join(routingRoot, file), "utf8"));
  } catch (error) {
    fail(`Unable to read valid JSON from ${file}: ${error.message}`);
    return null;
  }
}

async function main() {
  const prompts = await readJson("prompts.json");
  const expected = await readJson("expected-skills.json");

  if (prompts === null || expected === null) return;

  if (!Array.isArray(prompts) || prompts.length !== 9) {
    fail("prompts.json must contain exactly nine starter prompts");
    return;
  }

  if (!expected || Array.isArray(expected) || typeof expected !== "object") {
    fail("expected-skills.json must be an object keyed by prompt ID");
    return;
  }

  const ids = new Set();
  for (const [index, item] of prompts.entries()) {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      fail(`Prompt at index ${index} must be an object`);
      continue;
    }
    if (typeof item.id !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id)) {
      fail(`Prompt at index ${index} has an invalid id`);
      continue;
    }
    if (ids.has(item.id)) fail(`Duplicate prompt id: ${item.id}`);
    ids.add(item.id);
    if (typeof item.prompt !== "string" || item.prompt.trim().length < 12) {
      fail(`${item.id}: prompt must contain at least 12 non-whitespace characters`);
    }
  }

  const expectedIds = Object.keys(expected).sort();
  const promptIds = [...ids].sort();
  if (JSON.stringify(expectedIds) !== JSON.stringify(promptIds)) {
    fail("expected-skills.json keys must match prompt IDs exactly");
  }

  let skillDirectories;
  try {
    skillDirectories = new Set(
      (await readdir(skillsRoot, { withFileTypes: true }))
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
    );
  } catch {
    fail("skills/ directory is missing or unreadable");
    return;
  }

  for (const id of expectedIds) {
    const skills = expected[id];
    if (!Array.isArray(skills) || skills.length === 0) {
      fail(`${id}: expected skills must be a non-empty array`);
      continue;
    }
    if (new Set(skills).size !== skills.length) {
      fail(`${id}: expected skills contain duplicates`);
    }
    for (const skill of skills) {
      if (typeof skill !== "string" || !skillDirectories.has(skill)) {
        fail(`${id}: unknown skill reference ${String(skill)}`);
      }
    }
  }

  if (process.exitCode !== 1) {
    console.log(`Routing eval static validation passed: ${prompts.length} prompts, ${expectedIds.length} mappings, ${skillDirectories.size} available skills. No model execution was performed.`);
  }
}

await main();
