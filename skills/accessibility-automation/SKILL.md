---
name: accessibility-automation
description: Use when adding automated accessibility checks to unit, component, browser, or CI tests with axe-core, Playwright, or equivalent tooling.
---

# Accessibility Automation

## Objective

Make repeatable accessibility checks part of the delivery pipeline while keeping automated results in their proper scope.

## Workflow

1. Select representative pages, templates and meaningful UI states rather than scanning only the homepage.
2. Integrate axe-core through the project's existing test framework. For Playwright, use the maintained @axe-core/playwright integration.
3. Run scans after the page and relevant asynchronous content have settled.
4. Exercise interactive states before scanning: open dialogs, reveal validation messages, expand navigation and load dynamic results.
5. Fail CI on new, confirmed violations. Keep known exceptions narrow, documented, owned and time-bounded.
6. Preserve scan output as test artifacts or actionable CI logs where practical.
7. Add manual test tasks for keyboard operation, focus behavior, screen-reader announcements, zoom/reflow and content quality.
8. Re-run checks after remediation and verify the original state and nearby flows.

## Playwright example

Use the existing package manager and test conventions. Install compatible versions of Playwright and @axe-core/playwright through the project's normal dependency process.

```ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home page has no automated accessibility violations', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('main')).toBeVisible();

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
```

Adapt the route, readiness condition and test setup to the actual application. A single clean scan does not establish WCAG conformance.

## Handling existing violations

- Prefer fixing the underlying issue over suppressing a rule.
- If an exception is unavoidable, record the rule ID, selector or component, reason, owner, issue link and expiry/review date.
- Exclude only the smallest known affected region.
- Do not disable broad rule categories or silently ignore new violations.
- Keep a baseline separate from newly introduced failures when adopting checks in a legacy codebase.

## CI guidance

- Run accessibility tests alongside functional browser tests.
- Use least-privilege workflow permissions.
- Pin third-party actions to reviewed immutable commit SHAs.
- Do not upload sensitive page content, credentials or personal data in test artifacts.
- Keep tests deterministic and report browser, viewport and application build.

## Limitations

Automated scanners detect a subset of issues and cannot reliably judge every text alternative, content clarity, keyboard journey, focus experience, screen-reader announcement or cognitive barrier. Combine automated checks with manual assessment and inclusive user testing.

## Completion criteria

Representative states are scanned in CI, new violations fail visibly, exceptions are scoped and tracked, and manual testing covers issues automation cannot establish.
