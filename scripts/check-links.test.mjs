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

test("strips rendered HTML tags from heading text without regex sanitization", () => {
  const slugs = extractHeadingSlugs([
    "# Hello <em>World</em>",
    "# A heading with an unmatched <script",
  ].join("\n"));

  assert.deepEqual([...slugs], [
    "hello-world",
    "a-heading-with-an-unmatched-script",
  ]);
});

test("generates GitHub-style slugs for punctuation, duplicates, underscores, and Unicode", () => {
  const slugs = extractHeadingSlugs([
    "# API: Endpoints",
    "## Usage",
    "## Usage",
    "## Usage",
    "## Usage-1",
    "### _Options_",
    "### Hello World",
    "## Café déjà vu",
    "#### Details",
    "##### Deep details",
    "###### Final details",
    "## my_option",
    "## café_bar",
    "## café_x_",
    "## _Foo_ _Bar_",
    "## Community Standards & Snippet Libraries",
    "## Double  Spaces",
    "Heading 1",
    "=========",
    "Heading 2",
    "---------",
  ].join("\n"));

  assert.deepEqual([...slugs], [
    "api-endpoints",
    "usage",
    "usage-1",
    "usage-2",
    "usage-1-1",
    "options",
    "hello-world",
    "café-déjà-vu",
    "details",
    "deep-details",
    "final-details",
    "my_option",
    "café_bar",
    "café_x_",
    "foo-bar",
    "community-standards--snippet-libraries",
    "double--spaces",
    "heading-1",
    "heading-2",
  ]);
});

test("checks relative Markdown paths and valid anchors", async () => {
  const root = await createRepository({
    "README.md": [
      "# Home",
      "[Guide](docs/guide.md)",
      "[Section](docs/guide.md#api-endpoints)",
      "[Duplicate heading](docs/guide.md#usage-1)",
      "[Unicode heading](docs/guide.md#café-déjà-vu)",
      "[Directory](docs/)",
      "[Same file](#home)",
      "",
    ].join("\n"),
    "docs/README.md": "# Docs index\n",
    "docs/guide.md": "# API: Endpoints\n## Usage\n## Usage\n### Hello World\n## Café déjà vu\n",
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

test("validates links in indented list-item continuations", async () => {
  const root = await createRepository({
    "README.md": "- List item\n    [List continuation](missing-list.md)\n",
  });

  try {
    const report = await analyzeLinks(root);
    assert.equal(report.summary.errors, 1);
    assert.equal(report.diagnostics[0].target, "missing-list.md");
    assert.equal(report.diagnostics[0].line, 2);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("preserves paragraph and loose-list continuations while ignoring indented code", async () => {
  const root = await createRepository({
    "README.md": [
      "See the setup notes and",
      "    the [paragraph continuation](missing-paragraph.md).",
      "",
      "    [Indented code](missing-code.md)",
      "",
      "- List item",
      "",
      "    [Loose list continuation](missing-list.md)",
      "",
      "[Real link](real.md)",
    ].join("\n"),
    "real.md": "# Real guide\n",
  });

  try {
    const report = await analyzeLinks(root);
    assert.deepEqual(report.diagnostics.map((item) => item.target), [
      "missing-paragraph.md",
      "missing-list.md",
    ]);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("ignores inline and indented code link examples", async () => {
  const root = await createRepository({
    "README.md": [
      "Use `[Guide](missing-inline.md)` as an example.",
      "",
      "    [Indented](missing-indented.md)",
      "\t[Tabbed](missing-tabbed.md)",
      "[Real link](real.md)",
    ].join("\n"),
    "real.md": "# Real guide\n",
  });

  try {
    const report = await analyzeLinks(root);
    assert.deepEqual(report.diagnostics, []);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("validates the outer destination of image-wrapped and nested-label links", async () => {
  const root = await createRepository({
    "README.md": [
      "[![Badge](badge.svg)](target.md)",
      "[a [nested] label](target.md)",
      "[![Broken outer](badge.svg)](missing.md)",
    ].join("\n"),
    "target.md": "# Target\n",
  });

  try {
    const report = await analyzeLinks(root);
    assert.equal(report.summary.errors, 1);
    assert.equal(report.diagnostics[0].target, "missing.md");
    assert.equal(report.diagnostics[0].line, 3);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("recognizes Setext headings and anchors with repeated hyphens", async () => {
  const root = await createRepository({
    "README.md": [
      "[Setext one](guide.md#heading-1)",
      "[Setext two](guide.md#heading-2)",
      "[Double spaces](guide.md#double--spaces)",
      "[Underscore](guide.md#my_option)",
    ].join("\n"),
    "guide.md": [
      "Heading 1",
      "=========",
      "Heading 2",
      "---------",
      "Double  Spaces",
      "------------",
      "my_option",
      "---------",
    ].join("\n"),
  });

  try {
    const report = await analyzeLinks(root);
    assert.deepEqual(report.diagnostics, []);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("preserves rendered links in indented list content and rejects links hidden by unmatched code ticks", async () => {
  const root = await createRepository({
    "README.md": [
      "1. Documentation",
      "    [Nested guide](missing-list.md)",
      "",
      "A paragraph with an unmatched ` delimiter.",
      "",
      "A real [broken link](missing-after-code.md).",
    ].join("\n"),
  });

  try {
    const report = await analyzeLinks(root);
    assert.deepEqual(report.diagnostics.map((item) => item.target), [
      "missing-list.md",
      "missing-after-code.md",
    ]);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
