import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const TOOL = "webcraft-skill-doctor";
const SCHEMA_VERSION = "1.0";

function parseFrontmatter(content) {
  if (!content.startsWith("---\n")) return null;
  const end = content.indexOf("\n---\n", 4);
  if (end < 0) return null;
  const block = content.slice(4, end);
  const read = (key) => {
    const match = block.match(new RegExp("^" + key + ":\\s*(.*)$", "m"));
    if (!match) return null;
    const value = match[1].trim();
    return value.replace(/^(['"])(.*)\\1$/, "$2");
  };
  return { name: read("name"), description: read("description") };
}

function diagnostic(ruleId, severity, file, message, fixHint, relatedFiles = [], line) {
  return {
    ruleId,
    severity,
    file,
    ...(Number.isInteger(line) && line > 0 ? { line } : {}),
    message,
    relatedFiles: [...new Set(relatedFiles)].sort(),
    fixHint,
  };
}

function normalizeDescription(value) {
  return value.trim().replace(/\\s+/g, " ").toLocaleLowerCase("en-US");
}

function resolveSkillReference(destination, sourceFile, skillNames) {
  if (/^(?:https?:|mailto:|#|data:)/i.test(destination)) return null;
  const clean = destination.split(/[?#]/, 1)[0];
  if (!clean || !/SKILL\\.md$/i.test(clean)) return null;
  const normalized = clean.replace(/\\\\/g, "/");
  const segments = normalized.split("/");
  const skillsIndex = segments.lastIndexOf("skills");
  let target;
  if (skillsIndex >= 0 && segments[skillsIndex + 1]) {
    target = segments[skillsIndex + 1];
  } else {
    const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(sourceFile), normalized));
    const match = resolved.match(/^skills\\/([^/]+)\\/SKILL\\.md$/);
    if (match) target = match[1];
  }
  if (!target) return null;
  return skillNames.has(target) ? null : target;
}

export async function analyzeSkills(root = process.cwd()) {
  const skillsRoot = path.join(root, "skills");
  const entries = await readdir(skillsRoot, { withFileTypes: true });
  const directories = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  const skillNames = new Set(directories);
  const records = [];
  const diagnostics = [];

  for (const directory of directories) {
    const relativeFile = `skills/${directory}/SKILL.md`;
    let content;
    try {
      content = await readFile(path.join(root, relativeFile), "utf8");
    } catch {
      continue;
    }
    const metadata = parseFrontmatter(content);
    if (!metadata?.description) continue;
    records.push({ directory, file: relativeFile, description: metadata.description, content });
  }

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
    const files = group.map((item) => item.file).sort();
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

  for (const record of records) {
    const linkPattern = /\\[[^\\]]*\\]\\(([^)]+)\\)/g;
    for (const match of record.content.matchAll(linkPattern)) {
      const destination = match[1].trim().replace(/^<|>$/g, "").split(/\\s+/)[0];
      const missing = resolveSkillReference(destination, record.file, skillNames);
      if (!missing) continue;
      const line = record.content.slice(0, match.index).split("\\n").length;
      diagnostics.push(diagnostic(
        "SKILL002",
        "error",
        record.file,
        `Inter-skill reference targets unknown skill "${missing}".`,
        "Change the link to an existing canonical skills/<name>/SKILL.md path, or remove the stale reference.",
        [],
        line,
      ));
    }
  }

  diagnostics.sort((a, b) =>
    a.file.localeCompare(b.file) ||
    (a.line ?? Number.MAX_SAFE_INTEGER) - (b.line ?? Number.MAX_SAFE_INTEGER) ||
    a.ruleId.localeCompare(b.ruleId)
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
  return `Usage: node scripts/skill-doctor.mjs [--json] [--strict] [--help]

  --json    Emit only the versioned JSON report to stdout.
  --strict  Treat warnings as failures (exit 1).
  --help    Show this help text.`;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.some((arg) => !["--json", "--strict", "--help"].includes(arg)) ||
      args.filter((arg) => arg === "--json").length > 1 ||
      args.filter((arg) => arg === "--strict").length > 1) {
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
    report = await analyzeSkills();
  } catch (error) {
    console.error(`Skill Doctor failed: ${error.message}`);
    process.exitCode = 2;
    return;
  }

  if (args.includes("--json")) {
    console.log(JSON.stringify(report, null, 2));
  } else if (report.diagnostics.length === 0) {
    console.log(`Skill Doctor passed: scanned ${report.summary.filesScanned} skill files; no cross-skill diagnostics.`);
  } else {
    for (const item of report.diagnostics) {
      const location = item.line ? `:${item.line}` : "";
      console.log(`[${item.severity.toUpperCase()}] ${item.ruleId} ${item.file}${location}: ${item.message}`);
      console.log(`  Fix: ${item.fixHint}`);
      if (item.relatedFiles.length) console.log(`  Related: ${item.relatedFiles.join(", ")}`);
    }
    console.log(`Scanned ${report.summary.filesScanned} skill files; ${report.summary.errors} error(s), ${report.summary.warnings} warning(s), ${report.summary.info} info.`);
  }

  const failed = report.summary.errors > 0 ||
    (args.includes("--strict") && report.summary.warnings > 0);
  process.exitCode = failed ? 1 : 0;
}

const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : "";
if (invokedPath === import.meta.url) await main();
