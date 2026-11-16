import { access, cp, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const sourceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "skills");

const destinations = {
  codex: ".agents/skills",
  claude: ".claude/skills",
  copilot: ".github/skills",
};

function parseArguments(args) {
  const options = {
    agent: null,
    target: process.cwd(),
    overwrite: false,
    dryRun: false,
    help: false,
  };

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];

    if (argument === "--help" || argument === "-h") {
      options.help = true;
    } else if (argument === "--overwrite") {
      options.overwrite = true;
    } else if (argument === "--dry-run") {
      options.dryRun = true;
    } else if (argument === "--agent" || argument === "--target") {
      const value = args[index + 1];

      if (!value || value.startsWith("--")) {
        throw new Error(`Missing value for ${argument}`);
      }

      options[argument === "--agent" ? "agent" : "target"] = value;
      index += 1;
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }

  if (!options.help && !options.agent) {
    throw new Error("Specify --agent codex, claude, copilot or all.");
  }

  return options;
}

async function pathExists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

export async function installSkills({
  agent,
  targetRoot,
  overwrite = false,
  dryRun = false,
  source = sourceRoot,
}) {
  const selectedAgents = agent === "all" ? Object.keys(destinations) : [agent];

  for (const selected of selectedAgents) {
    if (!Object.hasOwn(destinations, selected)) {
      throw new Error(`Unsupported agent "${selected}". Use codex, claude, copilot or all.`);
    }
  }

  const entries = await readdir(source, { withFileTypes: true });
  const skills = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  if (skills.length === 0) {
    throw new Error(`No skill directories found in ${source}`);
  }

  for (const skill of skills) {
    if (!(await pathExists(path.join(source, skill, "SKILL.md")))) {
      throw new Error(`Skill "${skill}" is missing SKILL.md`);
    }
  }

  const installed = [];
  const skipped = [];

  for (const selected of selectedAgents) {
    const destinationRoot = path.join(targetRoot, destinations[selected]);

    if (!dryRun) {
      await mkdir(destinationRoot, { recursive: true });
    }

    for (const skill of skills) {
      const sourcePath = path.join(source, skill);
      const destinationPath = path.join(destinationRoot, skill);
      const exists = await pathExists(destinationPath);

      if (exists && !overwrite) {
        skipped.push(`${selected}:${skill}`);
        continue;
      }

      if (!dryRun) {
        await cp(sourcePath, destinationPath, {
          recursive: true,
          force: overwrite,
          errorOnExist: !overwrite,
        });
      }

      installed.push(`${selected}:${skill}`);
    }
  }

  return { installed, skipped, dryRun };
}

function printHelp() {
  process.stdout.write(`WebCraft Pro skill installer

Usage:
  node scripts/install-skills.mjs --agent <codex|claude|copilot|all> --target <project-path>

Options:
  --agent       Destination agent. Use "all" to install all three.
  --target      Target project directory. Defaults to the current directory.
  --overwrite   Replace existing skill directories. Review changes before using.
  --dry-run     Preview the actions without writing files.
  --help        Show this help.

Destinations:
  Codex         .agents/skills/
  Claude Code   .claude/skills/
  Copilot      .github/skills/

Existing skill directories are skipped unless --overwrite is supplied.
`);
}

async function main() {
  const options = parseArguments(process.argv.slice(2));

  if (options.help) {
    printHelp();
    return;
  }

  const result = await installSkills({
    ...options,
    targetRoot: path.resolve(options.target),
  });

  const mode = result.dryRun ? "Preview" : "Installation";
  process.stdout.write(`${mode} complete: ${result.installed.length} planned/installed, ${result.skipped.length} skipped.\n`);

  if (result.skipped.length > 0) {
    process.stdout.write(`Skipped existing skills: ${result.skipped.join(", ")}\n`);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    process.stderr.write(`ERROR: ${error.message}\n`);
    process.exitCode = 1;
  });
}
