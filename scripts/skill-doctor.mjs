import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const TOOL = "webcraft-skill-doctor";
const SCHEMA_VERSION = "1.0";
const SCRIPT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const REPOSITORY_ROOT = path.resolve(SCRIPT_DIRECTORY, "..");

function compareText(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function diagnostic(ruleId, severity, file, message, fixHint, relatedFiles = [], line) {
  return {
    ruleId,
    severity,
    file,
    ...(Number.isInteger(line) && line > 0 ? { line } : {}),
    message,
    relatedFiles: [...new Set(relatedFiles)].sort(compareText),
    fixHint,
  };
}

function normalizeDescription(value) {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase("en-US");
}

function resolveSkillReference(destination, sourceFile, skillNames) {
  if (destination.startsWith("#") || destination.startsWith("//")) {
    return null;
  }

  const clean = destination.split(/[?#]/, 1)[0];
  if (!clean || !/SKILL\.md$/.test(clean)) return null;

  if (
    clean.startsWith("/") ||
    /^[a-zA-Z]:[\\/]/.test(clean) ||
    clean.includes("\\")
  ) {
    return clean;
  }
  if (/^[a-z][a-z0-9+.-]*:/i.test(clean)) return null;

  const resolved = path.posix.normalize(
    path.posix.join(path.posix.dirname(sourceFile), clean),
  );
  const match = /^skills\/([^/]+)\/SKILL\.md$/.exec(resolved);
  if (!match) return resolved;

  return skillNames.has(match[1]) ? null : match[1];
}
function removeFencedCodeBlocks(content) {
  let fence = null;

  return content.split("\n").map((line) => {
    const opening = /^ {0,3}([\x60]{3,}|~{3,})/.exec(line);

    if (!fence && opening) {
      fence = { character: opening[1][0], length: opening[1].length };
      return "";
    }

    if (fence) {
      const closing = new RegExp(
        "^ {0,3}" + fence.character + "{" + fence.length + ",}[ \\t]*$",
      );
      if (closing.test(line)) fence = null;
      return "";
    }

    return line;
  }).join("\n");
}

export async function analyzeSkills(root = REPOSITORY_ROOT) {
  const validatorPath = path.join(root, "scripts", "validate-skills.mjs");
  const result = spawnSync(process.execPath, [validatorPath, "--json"], {
    cwd: root,
    encoding: "utf8",
  });

  if (result.error) {
    throw new Error("Unable to run the existing skill validator: " + result.error.message);
  }
  if (result.status !== 0) {
    const detail = result.stderr.trim() || result.stdout.trim() || ("exit code " + result.status);
    throw new Error("Existing skill validation failed: " + detail);
  }

  let validation;
  try {
    validation = JSON.parse(result.stdout);
  } catch (error) {
    throw new Error("Existing skill validator returned invalid JSON: " + error.message);
  }
  if (!validation.valid || !Array.isArray(validation.skills)) {
    throw new Error("Existing skill validator returned an invalid metadata report.");
  }

  const skillNames = new Set(validation.skills.map((skill) => skill.directory));
  const records = validation.skills.map((skill) => ({
    file: skill.file,
    description: skill.description,
  }));
  const diagnostics = [];
  const descriptions = new Map();

  for (const record of records) {
    const key = normalizeDescription(record.description);
    if (!key) continue;
    const group = descriptions.get(key) ?? [];
    group.push(record);
    descriptions.set(key, group);
  }

  for (const group of descriptions.values()) {
    if (group.length < 2) continue;
    const files = group.map((item) => item.file).sort(compareText);
    for (const item of group) {
      diagnostics.push(diagnostic(
        "SKILL001",
        "warning",
        item.file,
        "This skill description duplicates another canonical skill description.",
        "Rewrite the description to state this skill's distinct capability and activation conditions.",
        files.filter((file) => file !== item.file),
        3,
      ));
    }
  }

  const loadedRecords = await Promise.all(records.map(async (record) => ({
    ...record,
    content: removeFencedCodeBlocks(
      await readFile(path.join(root, record.file), "utf8"),
    ),
  })));

  for (const record of loadedRecords) {
    const linkPattern = /\[[^\]]*\]\(([^)]+)\)/g;
    for (const match of record.content.matchAll(linkPattern)) {
      const destination = match[1].trim().replace(/^<|>$/g, "").split(/\s+/)[0];
      const missing = resolveSkillReference(destination, record.file, skillNames);
      if (!missing) continue;
      const line = record.content.slice(0, match.index).split("\n").length;
      diagnostics.push(diagnostic(
        "SKILL002",
        "error",
        record.file,
        "Inter-skill reference does not resolve to an existing canonical skill: " + missing + ".",
        "Use a relative Markdown link that resolves to an existing skills/<name>/SKILL.md file.",
        [],
        line,
      ));
    }
  }

  diagnostics.sort((a, b) =>
    compareText(a.file, b.file) ||
    (a.line ?? Number.MAX_SAFE_INTEGER) - (b.line ?? Number.MAX_SAFE_INTEGER) ||
    compareText(a.ruleId, b.ruleId)
  );

  const summary = {
    filesScanned: records.length,
    diagnostics: diagnostics.length,
    errors: diagnostics.filter((item) => item.severity === "error").length,
    warnings: diagnostics.filter((item) => item.severity === "warning").length,
    info: diagnostics.filter((item) => item.severity === "info").length,
  };

  return { schemaVersion: SCHEMA_VERSION, tool: TOOL, summary, diagnostics };
}

function usage() {
  return "Usage: node scripts/skill-doctor.mjs [--json] [--strict] [--root <path>] [--help]\n\n" +
    "  --json       Emit only the versioned JSON report to stdout.\n" +
    "  --strict     Treat warnings as failures (exit 1).\n" +
    "  --root PATH  Validate the specified repository root (defaults to this repository).\n" +
    "  --help       Show this help text.";
}

async function main() {
  const args = process.argv.slice(2);
  const rootIndex = args.indexOf("--root");
  const root = rootIndex >= 0 ? path.resolve(args[rootIndex + 1] ?? "") : REPOSITORY_ROOT;
  const allowed = new Set(["--json", "--strict", "--help", "--root"]);
  if (
    args.some((arg, index) => !allowed.has(arg) && !(rootIndex >= 0 && index === rootIndex + 1)) ||
    args.filter((arg) => arg === "--json").length > 1 ||
    args.filter((arg) => arg === "--strict").length > 1 ||
    (rootIndex >= 0 && (!args[rootIndex + 1] || args.indexOf("--root", rootIndex + 1) >= 0))
  ) {
    console.error(usage());
    process.exitCode = 2;
    return;
  }
  if (args.includes("--help")) {
    console.log(usage());
    return;
  }

  let report;
  try {
    report = await analyzeSkills(root);
  } catch (error) {
    console.error("Skill Doctor failed: " + error.message);
    process.exitCode = 2;
    return;
  }

  if (args.includes("--json")) {
    console.log(JSON.stringify(report, null, 2));
  } else if (report.diagnostics.length === 0) {
    console.log("Skill Doctor passed: scanned " + report.summary.filesScanned + " skill files; no cross-skill diagnostics.");
  } else {
    for (const item of report.diagnostics) {
      const location = item.line ? ":" + item.line : "";
      console.log("[" + item.severity.toUpperCase() + "] " + item.ruleId + " " + item.file + location + ": " + item.message);
      console.log("  Fix: " + item.fixHint);
      if (item.relatedFiles.length) console.log("  Related: " + item.relatedFiles.join(", "));
    }
    console.log("Scanned " + report.summary.filesScanned + " skill files; " + report.summary.errors + " error(s), " + report.summary.warnings + " warning(s), " + report.summary.info + " info.");
  }

  const failed = report.summary.errors > 0 ||
    (args.includes("--strict") && report.summary.warnings > 0);
  process.exitCode = failed ? 1 : 0;
}

const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : "";
if (invokedPath === import.meta.url) await main();
