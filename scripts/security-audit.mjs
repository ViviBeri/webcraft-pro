import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const SCAN_DIRECTORIES = ["examples", "standards", "skills"];
const EXEMPTION_TAGS = new Set(["bad", "insecure"]);

const RULES = [
  {
    id: "no-eval",
    scope: "line",
    severity: "high",
    description: "Use of eval()",
    pattern: /\beval\s*\(/i,
  },
  {
    id: "no-new-function",
    scope: "line",
    severity: "high",
    description: "Use of new Function()",
    pattern: /\bnew\s+Function\s*\(/i,
  },
  {
    id: "no-innerhtml",
    scope: "line",
    severity: "medium",
    description: "Assignment to innerHTML (requires review)",
    pattern: /\.innerHTML\s*=(?!=)/i,
  },
  {
    id: "no-dangerous-html",
    scope: "line",
    severity: "high",
    description: "Use of dangerouslySetInnerHTML",
    pattern: /\bdangerouslySetInnerHTML\b/,
  },
  {
    id: "no-document-write",
    scope: "line",
    severity: "high",
    description: "Use of document.write()",
    pattern: /\bdocument\s*\.\s*write\s*\(/i,
  },
  {
    id: "unsafe-href",
    scope: "line",
    severity: "medium",
    description: "Potentially unsafe or untrusted href (requires review)",
    pattern:
      /\bhref\s*=\s*(?:["']\s*javascript\s*:|["'][^"']*\$\{|["'][^"']*\{\{|\{\s*(?:user|untrusted|raw|input|query|params|redirect|destination)[\w.$[\]]*)/i,
  },
  {
    id: "unsafe-postmessage",
    scope: "block",
    severity: "high",
    description: "postMessage() uses a wildcard target origin",
    pattern:
      /\.postMessage\s*\([\s\S]*?,\s*["']\*["']\s*\)/i,
  },
];

function printHelp() {
  console.log(`WebCraft Pro Security Audit

Usage:
  node scripts/security-audit.mjs [--root <directory>] [--json]
  node scripts/security-audit.mjs --help

Flags:
  --root <directory>  Repository root to scan (default: current directory)
  --json              Print the report as JSON
  --help, -h          Show this help

Exit codes:
  0  Scan completed with no findings or scan errors
  1  One or more findings or scan errors
  2  Script cannot run: invalid arguments or inaccessible root

Scope:
  Scans Markdown code fences in examples/, standards/, and skills/.
  Fences tagged with the standalone info-string token "bad" or
  "insecure" are exempt. This is a static pattern review aid,
  not proof of security or a substitute for dynamic testing.`);
}

function parseArguments(argv) {
  const options = {
    root: process.cwd(),
    json: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];

    if (argument === "--json") {
      options.json = true;
      continue;
    }

    if (argument === "--root") {
      const value = argv[index + 1];

      if (!value || value.startsWith("--")) {
        throw new Error("--root requires a directory path");
      }

      options.root = path.resolve(value);
      index += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${argument}`);
  }

  return options;
}

function isExemptFence(infoString) {
  const tokens = infoString.trim().toLowerCase().split(/\s+/);

  if (tokens.length < 2 || !tokens[0]) {
    return false;
  }

  return tokens.slice(1).some((token) => EXEMPTION_TAGS.has(token));
}

function parseFencedBlocks(content) {
  const lines = content.split(/\r?\n/);
  const blocks = [];

  let activeFence = null;
  let activeInfo = "";
  let activeStartLine = 0;
  let activeBody = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})(.*)$/);

    if (!activeFence && fenceMatch) {
      activeFence = {
        character: fenceMatch[1][0],
        length: fenceMatch[1].length,
      };
      activeInfo = fenceMatch[2].trim();
      activeStartLine = index + 2;
      activeBody = [];
      continue;
    }

    if (activeFence && fenceMatch) {
      const closingFence = fenceMatch[1];
      const isClosing =
        closingFence[0] === activeFence.character &&
        closingFence.length >= activeFence.length &&
        fenceMatch[2].trim() === "";

      if (isClosing) {
        blocks.push({
          startLine: activeStartLine,
          info: activeInfo,
          body: activeBody,
          exempt: isExemptFence(activeInfo),
        });

        activeFence = null;
        activeInfo = "";
        activeBody = [];
        continue;
      }
    }

    if (activeFence) {
      activeBody.push({
        line: index + 1,
        text: line,
      });
    }
  }

  const warnings = [];

  if (activeFence) {
    warnings.push({
      line: activeStartLine - 1,
      message: "Unclosed fenced code block; block was not scanned",
    });
  }

  return { blocks, warnings };
}

function scanBlock(filePath, block) {
  if (block.exempt) {
    return [];
  }

  const findings = [];
  const seen = new Set();

  function addFinding(rule, line, evidence) {
    const key = `${line}:${rule.id}`;

    if (seen.has(key)) {
      return;
    }

    seen.add(key);

    findings.push({
      file: filePath,
      line,
      rule: rule.id,
      severity: rule.severity,
      message: rule.description,
      evidence: evidence.trim(),
    });
  }

  for (const rule of RULES) {
    if (rule.scope !== "line") {
      continue;
    }

    for (const sourceLine of block.body) {
      if (rule.pattern.test(sourceLine.text)) {
        addFinding(rule, sourceLine.line, sourceLine.text);
      }
    }
  }

  const joinedBody = block.body.map((line) => line.text).join("\n");

  for (const rule of RULES) {
    if (rule.scope !== "block") {
      continue;
    }

    const match = rule.pattern.exec(joinedBody);

    if (!match || match.index === undefined) {
      continue;
    }

    const precedingText = joinedBody.slice(0, match.index);
    const matchedLineOffset = precedingText.split("\n").length - 1;
    const sourceLine = block.body[matchedLineOffset];

    if (sourceLine) {
      addFinding(rule, sourceLine.line, match[0]);
    }
  }

  return findings;
}

async function collectMarkdownFiles(directory, root, results, errors) {
  let entries;

  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code !== "ENOENT") {
      errors.push({
        file: path.relative(root, directory),
        message: `Cannot read directory: ${error.message}`,
      });
    }
    return;
  }

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isSymbolicLink()) {
      continue;
    }

    if (entry.isDirectory()) {
      await collectMarkdownFiles(absolutePath, root, results, errors);
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      results.push(absolutePath);
    }
  }
}

async function scanFile(absolutePath, root, report) {
  const relativePath = path.relative(root, absolutePath);

  let content;

  try {
    content = await readFile(absolutePath, "utf8");
  } catch (error) {
    report.errors.push({
      file: relativePath,
      message: `Cannot read file: ${error.message}`,
    });
    return;
  }

  const parsed = parseFencedBlocks(content);

  for (const warning of parsed.warnings) {
    report.warnings.push({
      file: relativePath,
      line: warning.line,
      message: warning.message,
    });
  }

  for (const block of parsed.blocks) {
    report.findings.push(...scanBlock(relativePath, block));
  }
}

function printTextReport(report) {
  console.log("WebCraft Pro Security Audit");
  console.log("===========================");
  console.log(`Files scanned: ${report.filesScanned}`);
  console.log(`Findings: ${report.findings.length}`);
  console.log(`Scan errors: ${report.errors.length}`);
  console.log(`Warnings: ${report.warnings.length}`);
  console.log("");

  if (report.findings.length > 0) {
    console.log("FINDINGS");

    for (const finding of report.findings) {
      console.log(
        `[${finding.severity.toUpperCase()}] ${finding.file}:${finding.line} ` +
          `${finding.rule} — ${finding.message}`,
      );
      console.log(`  ${finding.evidence}`);
    }

    console.log("");
  }

  if (report.errors.length > 0) {
    console.log("SCAN ERRORS");

    for (const error of report.errors) {
      console.log(`${error.file}: ${error.message}`);
    }

    console.log("");
  }

  if (report.warnings.length > 0) {
    console.log("WARNINGS");

    for (const warning of report.warnings) {
      console.log(
        `${warning.file}:${warning.line}: ${warning.message}`,
      );
    }

    console.log("");
  }

  if (
    report.findings.length === 0 &&
    report.errors.length === 0 &&
    report.warnings.length === 0
  ) {
    console.log("No security-pattern findings.");
  }

  console.log("");
  console.log(
    "Scope: static pattern checks in Markdown code fences only. " +
      "This is not proof of security or a substitute for dynamic testing.",
  );
}

async function main() {
  const argv = process.argv.slice(2);

  if (argv.includes("--help") || argv.includes("-h")) {
    printHelp();
    process.exitCode = 0;
    return;
  }

  let options;

  try {
    options = parseArguments(argv);
  } catch (error) {
    console.error(`Argument error: ${error.message}`);
    process.exitCode = 2;
    return;
  }

  let rootEntries;

  try {
    rootEntries = await readdir(options.root);
  } catch (error) {
    console.error(`Cannot access root directory: ${error.message}`);
    process.exitCode = 2;
    return;
  }

  if (!Array.isArray(rootEntries)) {
    console.error("Root path is not a readable directory.");
    process.exitCode = 2;
    return;
  }

  const report = {
    root: options.root,
    filesScanned: 0,
    findings: [],
    errors: [],
    warnings: [],
  };

  const markdownFiles = [];

  for (const directoryName of SCAN_DIRECTORIES) {
    const directory = path.join(options.root, directoryName);

    await collectMarkdownFiles(
      directory,
      options.root,
      markdownFiles,
      report.errors,
    );
  }

  markdownFiles.sort();

  for (const file of markdownFiles) {
    await scanFile(file, options.root, report);
    report.filesScanned += 1;
  }

  if (options.json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    printTextReport(report);
  }

  process.exitCode =
    report.findings.length > 0 || report.errors.length > 0 ? 1 : 0;
}

await main();
