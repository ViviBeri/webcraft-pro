import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const fixtureUrl = (name) =>
  pathToFileURL(
    path.join(repositoryRoot, "examples", "accessibility", "fixture", name),
  ).href;

let browser;

before(async () => {
  browser = await chromium.launch({ headless: true });
});

after(async () => {
  await browser?.close();
});

test("index fixture focuses a visible skip link on the first Tab", async () => {
  const page = await browser.newPage();
  try {
    await page.goto(fixtureUrl("index.html"));
    await page.keyboard.press("Tab");
    const skipLink = page.locator(".skip-link");
    assert.equal(await skipLink.evaluate((element) => element === document.activeElement), true);
    assert.equal(await skipLink.isVisible(), true);
    const bounds = await skipLink.boundingBox();
    assert.ok(bounds && bounds.width > 0 && bounds.height > 0);
  } finally {
    await page.close();
  }
});

test("form fixture announces and focuses the inline validation error", async () => {
  const page = await browser.newPage();
  try {
    await page.goto(fixtureUrl("form.html"));
    await page.getByRole("button", { name: "Send message" }).click();
    const error = page.getByRole("alert");
    await error.waitFor({ state: "visible" });
    assert.match(await error.textContent(), /complete all required fields/i);
    assert.equal(await error.evaluate((element) => element === document.activeElement), true);
    assert.equal(await error.getAttribute("tabindex"), "-1");
  } finally {
    await page.close();
  }
});

test("dialog fixture manages initial focus, Escape, and focus restoration", async () => {
  const page = await browser.newPage();
  try {
    await page.goto(fixtureUrl("dialog.html"));
    const trigger = page.getByRole("button", { name: "Open dialog" });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "Your details" });
    await dialog.waitFor({ state: "visible" });
    const firstInput = page.getByLabel("Name");
    assert.equal(await firstInput.evaluate((element) => element === document.activeElement), true);
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "hidden" });
    assert.equal(await trigger.evaluate((element) => element === document.activeElement), true);
  } finally {
    await page.close();
  }
});
