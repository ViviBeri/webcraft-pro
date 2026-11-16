import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const defaults = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];
const modes = ["standard", "reduced-motion"];
const help = [
  "Usage: node scripts/browser-checker.mjs --url <url> [options]",
  "",
  "Required: --url <url> (absolute HTTP(S) URL)",
  "Options:",
  "  --output-dir <dir>   Output directory (default: browser-check-artifacts)",
  "  --viewports <list>   Comma-separated name=WIDTHxHEIGHT profiles.",
  "                       Default: mobile=390x844,tablet=768x1024,desktop=1440x900",
  "  --required <css>     Required selector; repeatable",
  "  --help, -h           Show help",
  "",
  "Runs Chromium in standard and prefers-reduced-motion: reduce modes.",
  "Captures <host>-<viewport>-<mode>.png and browser-check-report.json.",
  "Checks navigation, uncaught JS errors, required selectors, keyboard focus/tab",
  "behavior, and axe-core. Chromium only; not full E2E or WCAG certification.",
  "Keyboard focus check is capped at the first 40 tab stops to bound runtime.",
  "Exit codes: 0 pass; 1 target check findings (including unreachable URL);",
  "2 script cannot run (bad arguments, missing dependencies, browser launch failure).",
].join("\n");

function parse(argv) {
  const o = { url: "", outputDir: "browser-check-artifacts", viewports: defaults, required: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--help" || a === "-h") return { help: true };
    if (!["--url", "--output-dir", "--viewports", "--required"].includes(a)) throw new Error("Unknown argument: " + a);
    const v = argv[++i];
    if (!v || v.startsWith("--")) throw new Error("Missing value for " + a);
    if (a === "--url") o.url = v;
    if (a === "--output-dir") o.outputDir = v;
    if (a === "--required") o.required.push(v);
    if (a === "--viewports") {
      o.viewports = v.split(",").map((item) => {
        const m = /^([a-zA-Z0-9_-]+)=(\d{2,4})x(\d{2,4})$/.exec(item.trim());
        if (!m) throw new Error("Invalid viewport: " + item);
        const width = Number(m[2]); const height = Number(m[3]);
        if (width < 200 || width > 4000 || height < 200 || height > 4000) throw new Error("Viewport dimensions out of range: " + item);
        return { name: m[1], width, height };
      });
    }
  }
  if (!o.url) throw new Error("--url is required unless --help is used");
  let u;
  try { u = new URL(o.url); } catch { throw new Error("--url must be an absolute URL"); }
  if (!["http:", "https:"].includes(u.protocol)) throw new Error("--url must use HTTP or HTTPS");
  if (!o.outputDir.trim()) throw new Error("--output-dir cannot be empty");
  if (!o.viewports.length || new Set(o.viewports.map((v) => v.name)).size !== o.viewports.length) throw new Error("Viewport names must be unique");
  o.url = u.toString();
  return o;
}
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "target";
function record(report, name, viewport, pass, severity, evidence) {
  report.checks.push({ name, viewport, pass, severity, evidence: String(evidence).slice(0, 2000) });
}
async function main() {
  let options;
  try {
    options = parse(process.argv.slice(2));
    if (options.help) { process.stdout.write(help + "\n"); return 0; }
  } catch (error) {
    process.stderr.write(error.message + "\n\n" + help + "\n");
    return 2;
  }
  let chromium; let AxeBuilder;
  try {
    ({ chromium } = await import("playwright"));
    ({ AxeBuilder } = await import("@axe-core/playwright"));
  } catch (error) {
    process.stderr.write("Playwright dependencies unavailable: " + error.message + "\nRun npm install and npm run install:browsers.\n");
    return 2;
  }
  const dir = path.resolve(options.outputDir);
  const reportPath = path.join(dir, "browser-check-report.json");
  const report = {
    schemaVersion: 1, targetUrl: options.url, browser: "Chromium",
    generatedAt: new Date().toISOString(), viewports: options.viewports, modes,
    checks: [], screenshots: [], summary: { passed: 0, failed: 0 },
  };
  try { await mkdir(dir, { recursive: true }); }
  catch (error) { process.stderr.write("Cannot create output directory: " + error.message + "\n"); return 2; }
  let browser;
  let fatalError = false;
  try {
    browser = await chromium.launch({ headless: true });
    for (const viewport of options.viewports) {
      for (const mode of modes) {
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
          reducedMotion: mode === "reduced-motion" ? "reduce" : "no-preference",
        });
        const page = await context.newPage();
        const pageErrors = [];
        page.on("pageerror", (error) => pageErrors.push(error.message));
        let loaded = false;
        try {
          const response = await page.goto(options.url, { waitUntil: "domcontentloaded", timeout: 30000 });
          loaded = Boolean(response && response.status() < 400);
          record(report, "navigation", viewport.name, loaded, "high",
            response ? "HTTP " + response.status() + " " + response.statusText() : "No HTTP response");
        } catch (error) {
          record(report, "navigation", viewport.name, false, "high", error.message);
        }
        if (loaded) {
          for (const selector of options.required) {
            try {
              const count = await page.locator(selector).count();
              record(report, "required-element: " + selector, viewport.name, count > 0, "high",
                count ? "Found " + count + " matching element(s)" : "No matching element found");
            } catch (error) {
              record(report, "required-element: " + selector, viewport.name, false, "high", error.message);
            }
          }
          try {
            const results = await new AxeBuilder({ page }).analyze();
            if (!results.violations.length) {
              record(report, "axe-core", viewport.name, true, "info",
                "No violations; " + results.passes.length + " rules passed; " + results.incomplete.length + " incomplete");
            } else {
              for (const violation of results.violations) {
                const targets = violation.nodes.slice(0, 5).map((n) => n.target.join(" ")).join("; ");
                record(report, "axe: " + violation.id, viewport.name, false, violation.impact || "moderate",
                  violation.help + ". Affected nodes: " + targets);
              }
            }
          } catch (error) {
            record(report, "axe-core", viewport.name, false, "high", "axe-core failed: " + error.message);
          }
          try {
            const expected = await page.evaluate(() => {
              const elements = [...document.querySelectorAll(
                'a[href],area[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
              )].filter((el) => {
                const style = getComputedStyle(el); const rect = el.getBoundingClientRect();
                return el.tabIndex >= 0 && style.display !== "none" && style.visibility !== "hidden" &&
                  Number(style.opacity) !== 0 && rect.width > 0 && rect.height > 0;
              }).map((el, order) => ({ el, order, tabIndex: el.tabIndex }));
              expectedSort(elements);
              elements.forEach((item, index) => item.el.setAttribute("data-browser-check-focus-index", String(index)));
              return elements.map((item) => ({ index: item.order, tabIndex: item.tabIndex }));
              function expectedSort(items) {
                items.sort((a, b) => {
                  const aPositive = a.tabIndex > 0; const bPositive = b.tabIndex > 0;
                  if (aPositive !== bPositive) return aPositive ? -1 : 1;
                  if (aPositive && a.tabIndex !== b.tabIndex) return a.tabIndex - b.tabIndex;
                  return a.order - b.order;
                });
              }
            });
            if (!expected.length) {
              record(report, "keyboard-tab-order-and-focus", viewport.name, true, "info", "No visible tabbable controls");
            } else {
              const visited = []; const issues = [];
              for (let i = 0; i < Math.min(expected.length, 40); i += 1) {
                await page.keyboard.press("Tab");
                const state = await page.evaluate(() => {
                  const el = document.activeElement;
                  if (!el || el === document.body || el === document.documentElement) return { index: null, visible: false, focus: false };
                  const rect = el.getBoundingClientRect(); const style = getComputedStyle(el);
                  return {
                    index: el.getAttribute("data-browser-check-focus-index"),
                    visible: rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden",
                    focus: el.matches(":focus-visible") &&
                      ((style.outlineStyle !== "none" && parseFloat(style.outlineWidth) > 0) || style.boxShadow !== "none"),
                  };
                });
                visited.push(state.index);
                if (!state.visible) issues.push("Tab reached a non-visible or unexpected target");
                else if (state.index !== String(i)) issues.push("Tab order mismatch at position " + (i + 1));
                if (state.visible && !state.focus) issues.push("No visible focus indicator at tab position " + (i + 1));
              }
              record(report, "keyboard-tab-order-and-focus", viewport.name,
                issues.length === 0 && visited.length === Math.min(expected.length, 40), "medium",
                "Expected tabbable targets: " + expected.length + "; visited: " + visited.length + "; " +
                (issues.slice(0, 5).join("; ") || "Keyboard traversal matched DOM/tabindex order with visible focus"));
            }
          } catch (error) {
            record(report, "keyboard-tab-order-and-focus", viewport.name, false, "medium", error.message);
          }
        }
        record(report, "uncaught-javascript-errors", viewport.name, pageErrors.length === 0, "high",
          pageErrors.length ? pageErrors.join(" | ") : "No uncaught page errors observed");
        const screenshot = slug(new URL(options.url).hostname) + "-" + slug(viewport.name) + "-" + mode + ".png";
        try {
          await page.screenshot({ path: path.join(dir, screenshot), fullPage: true, animations: "disabled", timeout: 30000 });
          report.screenshots.push(screenshot);
        } catch (error) {
          record(report, "screenshot", viewport.name, false, "medium", error.message);
        }
        await context.close();
      }
    }
  } catch (error) {
    fatalError = true;
    record(report, browser ? "unexpected-fatal-error" : "browser-launch", "all", false, "high", error.message);
    process.stderr.write((browser ? "Browser check failed unexpectedly: " : "Chromium launch failed: ") + error.message + "\n");
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (error) {
        fatalError = true;
        record(report, "browser-close", "all", false, "high", error.message);
      }
    }
    report.generatedAt = new Date().toISOString();
    report.summary.passed = report.checks.filter((c) => c.pass).length;
    report.summary.failed = report.checks.length - report.summary.passed;
    try {
      await writeFile(reportPath, JSON.stringify(report, null, 2) + "\n");
    } catch (error) {
      fatalError = true;
      process.stderr.write("Cannot write browser check report: " + error.message + "\n");
    }
  }
  process.stdout.write("Browser check: " + report.summary.passed + " passed, " + report.summary.failed + " failed.\nReport: " + reportPath + "\n");
  return fatalError ? 2 : report.summary.failed ? 1 : 0;
}
main().then((code) => { process.exitCode = code; }).catch((error) => {
  process.stderr.write("Browser checker cannot run: " + (error.stack || error.message) + "\n");
  process.exitCode = 2;
});
