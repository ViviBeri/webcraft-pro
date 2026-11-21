import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const TOOL = "webcraft-link-checker";
const SCHEMA_VERSION = "1.0";
const SCRIPT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const REPOSITORY_ROOT = path.resolve(SCRIPT_DIRECTORY, "..");

function compareText(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function removeFencedCodeBlocks(content) {
  let fence = null;

  return content.split(/\r?\n/).map((line) => {
    const opening = /^ {0,3}(\x60{3,}|~{3,})/.exec(line);

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

function createHeadingSlug(heading) {
  const text = heading
    .replace(/^ {0,3}#{1,3}[ \t]+/, "")
    .replace(/[ \t]+#+[ \t]*$/, "")
    .trim()
    .replace(/<[^>]*>/g, "")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/(\x60+)(.*?)\1/g, "$2")
    .toLocaleLowerCase("en-US");

  return text
    .replace(/[^\p{L}\p{N}\p{M}\s-]/gu, "")
    .trim()
    .replace(/\s+/gu, "-")
    .replace(/-+/g, "-");
}

export function extractHeadingSlugs(content) {
  const slugs = new Set();
  const counts = new Map();
  const clean = removeFencedCodeBlocks(content);

  for (const line of clean.split("\n")) {
    const match = /^ {0,3}(#{1,3})[ \t]+(.+?)[ \t]*#*[ \t]*$/.exec(line);
    if (!match) continue;

    const base = createHeadingSlug(match[0]);
    if (!base) continue;

    const count = counts.get(base) ?? 0;
    const slug = count === 0 ? base : base + "-" + count;
    counts.set(base, count + 1);
    slugs.add(slug);
  }

  return slugs;
}

async function collectMarkdownFiles(directory, root, files = []) {
  const entries = await readdir(directory, { withFileTypes: true });
  entries.sort((a, b) => compareText(a.name, b.name));

  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;

    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await collectMarkdownFiles(absolute, root, files);
    } else if (entry.isFile() && entry.name.toLocaleLowerCase("en-US").endsWith(".md")) {
      files.push(path.relative(root, absolute).split(path.sep).join("/"));
    }
  }

  return files;
}

function decodeAnchor(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function parseMarkdownLinks(content) {
  const links = [];
  const pattern = /(?<!!)\[[^\]]*\]\(\s*(<[^>\r\n]+>|(?:\\.|[^)\s])+)(?:\s+[^)]*)?\)/g;

  for (const match of content.matchAll(pattern)) {
    const rawTarget = match[1].replace(/^<|>$/g, "").replace(/\\([()\\])/g, "$1");
    const line = content.slice(0, match.index).split("\n").length;
    links.push({ target: rawTarget, line });
  }

  return links;
}

async function resolveMarkdownTarget(root, sourceFile, targetPath) {
  const decodedPath = decodeAnchor(targetPath);
  const sourceDirectory = path.posix.dirname(sourceFile);
  const resolved = path.posix.normalize(
    path.posix.join(sourceDirectory === "." ? "" : sourceDirectory, decodedPath),
  );

  if (
    resolved === ".." ||
    resolved.startsWith("../") ||
    path.posix.isAbsolute(resolved)
  ) {
    return { error: "Target path escapes the repository root" };
  }

  const absolute = path.resolve(root, ...resolved.split("/"));
  const relative = path.relative(root, absolute);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    return { error: "Target path escapes the repository root" };
  }

  try {
    const targetStat = await stat(absolute);
    if (targetStat.isDirectory()) {
      const readme = path.join(absolute, "README.md");
      const readmeStat = await stat(readme).catch(() => null);
      if (readmeStat?.isFile()) {
        return { file: path.relative(root, readme).split(path.sep).join("/") };
      }
      return { error: "Target directory does not contain a README.md file" };
    }
    if (!targetStat.isFile()) return { ignored: true };
    if (!absolute.toLocaleLowerCase("en-US").endsWith(".md")) return { ignored: true };
    return { file: relative.split(path.sep).join("/") };
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "ENOTDIR") {
      if (decodedPath.toLocaleLowerCase("en-US").endsWith(".md") || decodedPath.endsWith("/")) {
        return { error: "Target file does not exist" };
      }
      return { ignored: true };
    }
    throw error;
  }
}

export async function analyzeLinks(root = REPOSITORY_ROOT) {
  const repositoryRoot = path.resolve(root);
  const files = await collectMarkdownFiles(repositoryRoot, repositoryRoot);
  const contents = new Map();
  const headingCache = new Map();
  const diagnostics = [];

  for (const file of files) {
    contents.set(file, removeFencedCodeBlocks(
      await readFile(path.join(repositoryRoot, file), "utf8"),
    ));
  }

  for (const file of files) {
    const content = contents.get(file);
    for (const link of parseMarkdownLinks(content)) {
      const target = link.target.trim();
      if (!target || target.startsWith("//") || /^[a-z][a-z0-9+.-]*:/i.test(target)) {
        continue;
      }

      const hashIndex = target.indexOf("#");
      const pathPart = hashIndex === -1 ? target : target.slice(0, hashIndex);
      const anchorPart = hashIndex === -1 ? "" : target.slice(hashIndex + 1);
      const pathWithoutQuery = pathPart.split("?", 1)[0];

      let targetFile = file;
      if (pathWithoutQuery) {
        const resolved = await resolveMarkdownTarget(repositoryRoot, file, pathWithoutQuery);
        if (resolved.ignored) continue;
        if (resolved.error) {
          diagnostics.push({
            file,
            line: link.line,
            target,
            message: resolved.error,
          });
          continue;
        }
        targetFile = resolved.file;
      }

      if (hashIndex !== -1 && anchorPart) {
        if (!headingCache.has(targetFile)) {
          const targetContent = contents.get(targetFile) ??
            removeFencedCodeBlocks(await readFile(path.join(repositoryRoot, targetFile), "utf8"));
          headingCache.set(targetFile, extractHeadingSlugs(targetContent));
        }

        const anchor = decodeAnchor(anchorPart);
        if (!headingCache.get(targetFile).has(anchor)) {
          diagnostics.push({
            file,
            line: link.line,
            target,
            message: "Target heading anchor does not exist",
          });
        }
      }
    }
  }

  diagnostics.sort((a, b) =>
    compareText(a.file, b.file) ||
    a.line - b.line ||
    compareText(a.target, b.target) ||
    compareText(a.message, b.message)
  );

  return {
    tool: TOOL,
    schemaVersion: SCHEMA_VERSION,
    summary: {
      filesScanned: files.length,
      errors: diagnostics.length,
      warnings: 0,
    },
    diagnostics,
  };
}

function usage() {
  return "Usage: node scripts/check-links.mjs [--json] [--root <path>] [--help]\n\n" +
    "  --json       Emit only the versioned JSON report to stdout.\n" +
    "  --root PATH  Validate the specified repository root (defaults to this repository).\n" +
    "  --help       Show this help text.";
}

async function main() {
  const args = process.argv.slice(2);
  const rootIndex = args.indexOf("--root");
  const allowed = new Set(["--json", "--help", "--root"]);
  if (
    args.some((arg, index) => !allowed.has(arg) && !(rootIndex >= 0 && index === rootIndex + 1)) ||
    args.filter((arg) => arg === "--json").length > 1 ||
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
    report = await analyzeLinks(rootIndex >= 0 ? path.resolve(args[rootIndex + 1]) : REPOSITORY_ROOT);
  } catch (error) {
    console.error("Markdown link checker failed: " + error.message);
    process.exitCode = 2;
    return;
  }

  if (args.includes("--json")) {
    console.log(JSON.stringify(report, null, 2));
  } else if (report.summary.errors === 0) {
    console.log("Markdown link check passed: scanned " + report.summary.filesScanned + " Markdown files; no broken internal links.");
  } else {
    for (const item of report.diagnostics) {
      console.log("[ERROR] " + item.file + ":" + item.line + ": " + item.target + " — " + item.message);
    }
    console.log("Scanned " + report.summary.filesScanned + " Markdown files; " + report.summary.errors + " error(s).");
  }

  process.exitCode = report.summary.errors > 0 ? 1 : 0;
}

const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : "";
if (invokedPath === import.meta.url) await main();
