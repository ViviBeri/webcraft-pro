# Stage 8 — Browser Automation, QA and Release

## Purpose

Provide a reusable, framework-agnostic quality workflow for browser behavior, responsive rendering, accessibility, performance, supply-chain signals and release readiness.

## Implemented in this repository

- [x] Manual browser-check workflow accepts an explicit HTTP(S) or local file URL and defaults to the repository's local fixture.
- [x] Version-controlled accessible test fixture at `examples/test-page.html`.
- [x] Playwright Chromium execution with mobile, tablet and desktop viewport profiles, standard and reduced-motion modes, keyboard-focus checks and axe-core scans.
- [x] JSON report and screenshot artifact upload from the manual workflow.

## Remaining planned capabilities

- Critical journey tests across Chromium, Firefox and WebKit.
- Trace collection and richer failure diagnostics.
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

- [x] Manual browser runner accepts explicit HTTP(S) and local file targets, with a local fixture default.
- [x] A minimal accessible local test fixture is maintained at `examples/test-page.html`.
- [x] Playwright Chromium execution completes against the local fixture in standard and reduced-motion modes.
- [x] Browser-check JSON report and screenshots are uploaded as a workflow artifact.
- [ ] Runner supports a configurable local-server lifecycle in addition to direct URL targets.
- [x] Three viewport profiles are configurable and produce traceable screenshots.
- [x] Reduced-motion and keyboard checks run in the current Chromium fixture workflow.
- [x] axe scans run against the local fixture; meaningful multi-route and interaction-state coverage remains outstanding.
- [ ] Cross-browser coverage and exclusions are documented.
- [ ] Lighthouse CI assertions are configurable and reports are retained safely.
- [ ] Scorecard workflow permissions and SARIF handling are verified.
- [ ] Release checklist includes smoke tests, deployment health and rollback.
- [ ] Templates are tested in a sample application before being described as production-ready.
