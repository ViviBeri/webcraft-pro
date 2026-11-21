import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { analyzeLinks, extractHeadingSlugs } from "./check-links.mjs";

async function createRepository(files) {
  const root = await mkdtemp(path.join(os.tmpdir(), "webcraft-link-checker-"));
  for (const [file, content] of Object.entries(files)) {
    const destination = path.join(root, file);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, content);
  }
  return root;
}

test("generates GitHub-style slugs for punctuation, duplicate headings, and Unicode", () => {
  const slugs = extractHeadingSlugs([
    "# API: Endpoints",
    "## Usage",
    "## Usage",
    "### Hello World",
    "## Café déjà vu",
    "#### Ignored fourth-level heading",
  ].join("\n"));

  assert.deepEqual([...slugs], [
    "api-endpoints",
    "usage",
    "usage-1",
    "hello-world",
    "café-déjà-vu",
  ]);
});

test("checks relative Markdown paths and valid anchors", async () => {
  const root = await createRepository({
    "README.md": [
      "# Home",
      "[Guide](docs/guide.md)",
      "[Section](docs/guide.md#api-endpoints)",
      "[Directory](docs/)",
      "[Same file](#home)",
      "",
    ].join("\n"),
    "docs/README.md": "# Docs index\n",
    "docs/guide.md": "# API: Endpoints\n## Usage\n## Usage\n### Hello World\n",
  });

  try {
    const report = await analyzeLinks(root);
    assert.equal(report.summary.filesScanned, 3);
    assert.deepEqual(report.diagnostics, []);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("reports missing Markdown targets and missing anchors with source lines", async () => {
  const root = await createRepository({
    "README.md": [
      "# Home",
      "[Missing file](docs/missing.md)",
      "[Missing anchor](docs/guide.md#not-here)",
    ].join("\n"),
    "docs/guide.md": "# Existing section\n",
  });

  try {
    const report = await analyzeLinks(root);
    assert.equal(report.summary.errors, 2);
    assert.deepEqual(report.diagnostics.map((item) => ({
      file: item.file,
      line: item.line,
      target: item.target,
      message: item.message,
    })), [
      {
        file: "README.md",
        line: 2,
        target: "docs/missing.md",
        message: "Target file does not exist",
      },
      {
        file: "README.md",
        line: 3,
        target: "docs/guide.md#not-here",
        message: "Target heading anchor does not exist",
      },
    ]);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("ignores external URLs, HTML targets, and links inside fenced code blocks", async () => {
  const root = await createRepository({
    "README.md": [
      "[External](https://example.com/outage)",
      "[HTML](page.html#section)",
      "\x60\x60\x60md",
      "[Example](missing.md#not-real)",
      "\x60\x60\x60",
      "~~~",
      "[Another example](also-missing.md)",
      "~~~",
    ].join("\n"),
    "page.html": "<h1 id=\"section\">Section</h1>\n",
  });

  try {
    const report = await analyzeLinks(root);
    assert.equal(report.summary.errors, 0);
    assert.equal(report.summary.filesScanned, 1);
    assert.deepEqual(report.diagnostics, []);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("ignores existing directories without a Markdown README", async () => {
  const root = await createRepository({
    "README.md": "[Fixture directory](fixture/)\\n",
    "fixture/example.txt": "Not a Markdown target.\\n",
  });

  try {
    const report = await analyzeLinks(root);
    assert.equal(report.summary.errors, 0);
    assert.deepEqual(report.diagnostics, []);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("reports links that escape the repository root", async () => {
  const root = await createRepository({
    "README.md": "[Outside](../../outside.md)\n",
  });

  try {
    const report = await analyzeLinks(root);
    assert.equal(report.summary.errors, 1);
    assert.equal(report.diagnostics[0].message, "Target path escapes the repository root");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("emits the stable versioned JSON report shape", async () => {
  const root = await createRepository({
    "README.md": "# Home\n[Missing](missing.md)\n",
  });

  try {
    const report = await analyzeLinks(root);
    assert.deepEqual(Object.keys(report), [
      "tool",
      "schemaVersion",
      "summary",
      "diagnostics",
    ]);
    assert.equal(report.tool, "webcraft-link-checker");
    assert.equal(report.schemaVersion, "1.0");
    assert.deepEqual(report.summary, {
      filesScanned: 1,
      errors: 1,
      warnings: 0,
    });
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
