import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const stagesRoot = path.join(root, "stages");
const skillsRoot = path.join(root, "skills");
const errors = [];

function reportError(message) {
  errors.push(message);
}

async function main() {
  const [stageEntries, skillEntries] = await Promise.all([
    readdir(stagesRoot, { withFileTypes: true }),
    readdir(skillsRoot, { withFileTypes: true }),
  ]);

  const stageDirectories = stageEntries
    .filter((entry) => entry.isDirectory() && /^\d{2}-/.test(entry.name))
    .map((entry) => entry.name)
    .sort();
  const skillDirectories = skillEntries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  if (stageDirectories.length !== 8) {
    reportError(
      `Expected 8 numbered stage directories; found ${stageDirectories.length}.`,
    );
  }

  const assignedSkills = new Set();

  for (const stageDirectory of stageDirectories) {
    const readmePath = path.join(stagesRoot, stageDirectory, "README.md");
    let content;

    try {
      content = await readFile(readmePath, "utf8");
    } catch {
      reportError(`${stageDirectory}: Missing README.md`);
      continue;
    }

    const canonicalSections = content.matchAll(
      /^## Canonical (?:skills|assets)\s*$([\s\S]*?)(?=^## |\s*$)/gm,
    );

    for (const section of canonicalSections) {
      const links = section[1].matchAll(
        /\]\(((?:\.\.\/)+skills\/([a-z0-9]+(?:-[a-z0-9]+)*)\/SKILL\.md)(?:#[^)\s]*)?\)/g,
      );

      for (const match of links) {
        const relativePath = match[1];
        const skillName = match[2];
        const resolvedPath = path.resolve(path.dirname(readmePath), relativePath);
        const expectedPath = path.join(skillsRoot, skillName, "SKILL.md");

        if (resolvedPath !== expectedPath) {
          reportError(
            `${stageDirectory}: Skill link for "${skillName}" resolves outside its canonical path.`,
          );
          continue;
        }

        if (!skillDirectories.includes(skillName)) {
          reportError(
            `${stageDirectory}: Unknown skill reference "${skillName}".`,
          );
          continue;
        }

        try {
          await access(expectedPath);
        } catch {
          reportError(`${stageDirectory}: Missing SKILL.md for "${skillName}".`);
          continue;
        }

        assignedSkills.add(skillName);
      }
    }
  }

  const unassigned = skillDirectories.filter(
    (skillName) => !assignedSkills.has(skillName),
  );

  if (unassigned.length > 0) {
    reportError(
      `Canonical skills missing from every stage: ${unassigned.join(", ")}.`,
    );
  }

  if (errors.length > 0) {
    console.error("Stage skill coverage validation failed:");

    for (const error of errors) {
      console.error(`- ${error}`);
    }

    process.exitCode = 1;
    return;
  }

  console.log(
    `Stage skill coverage passed: ${skillDirectories.length} canonical skills are assigned across ${stageDirectories.length} stages. Multiple-stage membership is allowed.`,
  );
}

await main();
