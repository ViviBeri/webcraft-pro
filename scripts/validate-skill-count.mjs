import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const skillRoot = path.join(root, "skills");

async function main() {
  const entries = await readdir(skillRoot, { withFileTypes: true });
  const directories = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  const count = directories.length;

  const [readme, index] = await Promise.all([
    readFile(path.join(root, "README.md"), "utf8"),
    readFile(path.join(skillRoot, "README.md"), "utf8"),
  ]);

  const requiredClaims = [
    `${count} reusable Agent Skills`,
    `${count} portable \`SKILL.md\` files`,
    `${count} canonical skills`,
  ];

  for (const claim of requiredClaims) {
    if (!readme.includes(claim)) {
      throw new Error(`README.md is missing the current inventory claim: "${claim}"`);
    }
  }

  const listed = [...index.matchAll(/^\| \[([a-z0-9-]+)\]\(\.\/[a-z0-9-]+\/SKILL\.md\) \|/gm)]
    .map((match) => match[1])
    .sort();

  if (listed.length !== count) {
    throw new Error(`skills/README.md lists ${listed.length} skills, but skills/ contains ${count} directories`);
  }

  const missing = directories.filter((name) => !listed.includes(name));
  const stale = listed.filter((name) => !directories.includes(name));

  if (missing.length || stale.length) {
    throw new Error(`Skill index mismatch. Missing: ${missing.join(", ") || "none"}. Stale: ${stale.join(", ") || "none"}.`);
  }

  console.log(`Skill inventory count passed: ${count} directories match README claims and index entries.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
