import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const skillRoot = path.join(root, "skills");
const targetFiles = [
  "README.md",
  "docs/index.html",
  "skills/README.md",
  "package.json",
];

const claimPatterns = [
  /(?<![\w])(\d{1,3})\s+(?:(?:reusable|portable|canonical|agent|engineering)\s+){0,3}skills\b/gi,
  /(?<![\w])(\d{1,3})-skills?\b/gi,
  /(?<![\w])(\d{1,3})\s+(?:portable\s+)?`?SKILL\.md`?\s+files\b/gi,
];

async function countCanonicalSkills() {
  const entries = await readdir(skillRoot, { withFileTypes: true });
  let count = 0;

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const files = await readdir(path.join(skillRoot, entry.name), {
      withFileTypes: true,
    });

    if (files.some((file) => file.isFile() && file.name === "SKILL.md")) {
      count += 1;
    }
  }

  return count;
}

function scanClaims(file, content, actualCount, errors, lineOffset = 0) {
  const lines = content.split(/\r?\n/);

  lines.forEach((line, index) => {
    for (const pattern of claimPatterns) {
      pattern.lastIndex = 0;

      for (const match of line.matchAll(pattern)) {
        // "Top 10 skills" describes a ranked list, not the repository inventory.
        if (/\btop\s*$/i.test(line.slice(0, match.index))) continue;

        const found = Number(match[1]);
        if (found !== actualCount) {
          errors.push({
            file,
            line: index + 1 + lineOffset,
            expected: actualCount,
            found,
            claim: match[0],
          });
        }
      }
    }
  });
}

async function main() {
  const actualCount = await countCanonicalSkills();
  const errors = [];

  for (const file of targetFiles) {
    const filePath = path.join(root, file);
    const content = await readFile(filePath, "utf8");

    if (file === "package.json") {
      const metadata = JSON.parse(content);
      if (typeof metadata.description !== "string") continue;

      const lines = content.split(/\r?\n/);
      const descriptionLine = lines.findIndex((line) =>
        /^\s*"description"\s*:/.test(line),
      );
      if (descriptionLine !== -1) {
        scanClaims(
          file,
          metadata.description,
          actualCount,
          errors,
          descriptionLine,
        );
      }
      continue;
    }

    scanClaims(file, content, actualCount, errors);
  }

  if (errors.length > 0) {
    console.error(
      `Skill-count consistency failed: found ${actualCount} canonical SKILL.md files.`,
    );

    for (const error of errors) {
      console.error(
        `- ${error.file}:${error.line}: expected ${error.expected}, found ${error.found} (" ${error.claim} ")`,
      );
    }

    process.exitCode = 1;
    return;
  }

  console.log(
    `Skill-count consistency passed: ${actualCount} canonical SKILL.md files; all public skill-count claims match.`,
  );
}

main().catch((error) => {
  console.error(`Skill-count consistency could not complete: ${error.message}`);
  process.exitCode = 1;
});
