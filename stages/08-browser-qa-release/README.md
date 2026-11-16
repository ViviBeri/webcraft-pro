# Stage 8 — Browser Automation, QA and Release

## Purpose

Provide a reusable, framework-agnostic quality workflow for browser behavior, responsive rendering, accessibility, performance, supply-chain signals and release readiness.

## Planned capabilities

- Playwright setup, locators, assertions, fixtures and browser projects.
- Critical journey tests across Chromium, Firefox and WebKit.
- Screenshots at mobile, tablet and desktop viewports.
- Reduced-motion and keyboard-focused checks.
- axe-core scans on representative routes and interactive states.
- Trace, screenshot and report artifacts for failed CI runs.
- Lighthouse CI collection and evidence-based performance budgets.
- OpenSSF Scorecard workflow and result interpretation.
- Release checklist, smoke testing, deployment verification and rollback.

## Authoritative references

- [Playwright best practices](https://playwright.dev/docs/best-practices)
- [Playwright CI](https://playwright.dev/docs/ci)
- [Playwright trace viewer](https://playwright.dev/docs/trace-viewer)
- [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing)
- [Lighthouse CI getting started](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/getting-started.md)
- [OpenSSF Scorecard](https://scorecard.dev/)

## Design constraints

- Keep the runner reusable by projects with different frameworks and build tools.
- Do not add fake end-to-end tests to this skills repository; it has no product web application to exercise.
- Separate reusable templates from workflows actually enabled in this repository.
- Use least-privilege `GITHUB_TOKEN` permissions and pin external actions to verified full commit SHAs.
- Do not expose secrets to fork pull requests or upload sensitive traces and screenshots publicly.
- Use deterministic test data and isolate state-changing tests from production systems.
- Treat automated accessibility checks as one layer, not WCAG certification.
- Start performance budgets from a measured baseline; avoid arbitrary Lighthouse score gates.

## Acceptance gate

- [ ] Runner supports explicit target URL or local server configuration.
- [ ] Three viewport profiles are configurable and produce traceable screenshots.
- [ ] Reduced-motion and keyboard checks are repeatable.
- [ ] axe scans cover meaningful route and interaction states.
- [ ] Cross-browser coverage and exclusions are documented.
- [ ] Lighthouse CI assertions are configurable and reports are retained safely.
- [ ] Scorecard workflow permissions and SARIF handling are verified.
- [ ] Release checklist includes smoke tests, deployment health and rollback.
- [ ] Templates are tested in a sample application before being described as production-ready.
