import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const skillRoot = path.join(root, "skills");

async function main() {
  const entries = await readdir(skillRoot, { withFileTypes: true });
  const directories = [];

  for (const entry of entries
    .filter((item) => item.isDirectory())
    .sort((left, right) => left.name.localeCompare(right.name))) {
    const files = await readdir(path.join(skillRoot, entry.name), {
      withFileTypes: true,
    });

    if (files.some((file) => file.isFile() && file.name === "SKILL.md")) {
      directories.push(entry.name);
    }
  }

  const index = await readFile(path.join(skillRoot, "README.md"), "utf8");

  const listed = index.split("\n").flatMap((line) => {
    if (!line.startsWith("| [")) return [];
    const labelStart = line.indexOf("[") + 1;
    const labelEnd = line.indexOf("](", labelStart);
    const targetStart = labelEnd + 2;
    const targetEnd = line.indexOf("/SKILL.md)", targetStart);
    if (labelEnd < 0 || targetEnd < 0) return [];
    const label = line.slice(labelStart, labelEnd);
    const target = line.slice(targetStart, targetEnd);
    if (label !== target) {
      throw new Error(`Skill index label/path mismatch: ${label} -> ${target}`);
    }
    return [target];
  }).sort();

  if (listed.length !== directories.length) {
    throw new Error(
      `skills/README.md lists ${listed.length} skills, but skills/ contains ${directories.length} canonical SKILL.md files`,
    );
  }

  const missing = directories.filter((name) => !listed.includes(name));
  const stale = listed.filter((name) => !directories.includes(name));

  if (missing.length || stale.length) {
    throw new Error(
      `Skill index mismatch. Missing: ${missing.join(", ") || "none"}. Stale: ${stale.join(", ") || "none"}.`,
    );
  }

  console.log(
    `Skill index passed: ${directories.length} canonical SKILL.md files match skills/README.md.`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
