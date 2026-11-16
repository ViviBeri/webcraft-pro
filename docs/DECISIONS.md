# Architecture Decision Log

This log backfills decisions that are evidenced by the repository's existing files. Exact decision dates are not recorded for these entries; each is therefore marked **backfilled**. The ordering below follows the dependency and architecture sequence reflected in the repository, not a claim about exact decision timestamps.

## Decisions

### backfilled — Keep the package free of declared runtime dependencies

- **Decision:** Keep the package free of declared runtime dependencies. Browser automation and accessibility tooling are development-only dependencies.
- **Rationale:** The installer remains dependency-free at runtime. Playwright and axe-core are used only for browser QA and do not become dependencies of installed skills or consumer projects.
- **Alternatives considered:** A zero-dependency Chrome DevTools Protocol implementation and Puppeteer were considered. CDP would require maintaining browser protocol, navigation, keyboard, screenshot and accessibility integration directly. Puppeteer was not selected because Playwright better aligns with the Stage 8 browser-project and cross-browser direction.
- **Source:** This decision and implementation are recorded in commit "Add browser checker with Playwright".

### backfilled — Use Node.js 20 or later as the toolchain requirement

- **Decision:** Set Node.js >=20 as the package engine requirement and document Node.js 20 or later for installation and validation.
- **Rationale:** The repository specifies this minimum version. The reason for selecting Node.js 20 is not documented in repo.
- **Alternatives considered:** Not recorded in repo.
- **Source:** package.json; README.md.

### backfilled — Distribute original project materials under MIT and preserve upstream attribution terms

- **Decision:** License original WebCraft Pro project materials under MIT, while retaining applicable third-party license and attribution requirements.
- **Rationale:** The repository states that original project materials use MIT except where a file or third-party material states otherwise.
- **Alternatives considered:** Not recorded in repo.
- **Source:** README.md; LICENSE; REFERENCES.md.

### backfilled — Keep portable skills separate from stage indexes and shared standards

- **Decision:** Use canonical portable skill files under skills/, shared engineering standards under standards/, and stage indexes under stages/.
- **Rationale:** This avoids duplicating skill stores across agents and stage folders.
- **Alternatives considered:** A flat skills-only structure was not recorded as a formally evaluated alternative.
- **Source:** README.md; stages/01-foundation/README.md.

### backfilled — Pin GitHub Actions to verified full commit SHAs

- **Decision:** Pin external GitHub Actions to verified full commit SHAs.
- **Rationale:** Stage 8 explicitly requires verified full commit SHAs.
- **Alternatives considered:** Not recorded in repo.
- **Source:** .github/workflows/validate.yml; stages/08-browser-qa-release/README.md.

### backfilled — Grant CI the minimum contents read permission

- **Decision:** Set workflow-level permissions: contents: read for repository validation.
- **Rationale:** The repository requires least-privilege GITHUB_TOKEN permissions.
- **Alternatives considered:** Not recorded in repo.
- **Source:** .github/workflows/validate.yml; stages/08-browser-qa-release/README.md.

### 2026-11-16 — Use Playwright and axe-core as development-only browser QA dependencies

- **Decision:** Use Playwright for Chromium automation and @axe-core/playwright for accessibility scans. Both are devDependencies. The initial runner is Chromium-first and requires an explicit target URL.
- **Rationale:** Real rendering, JavaScript execution, keyboard interaction and screenshots require a browser engine. Playwright provides a maintained automation API; axe-core adds repeatable accessibility checks. Dev-only dependencies preserve the dependency-free runtime and installer. Chromium-first limits initial CI installation and runtime cost.
- **Alternatives considered:** A zero-dependency CDP implementation would require custom protocol and lifecycle handling for navigation, keyboard, viewport emulation, screenshots and accessibility. Puppeteer was considered but not selected because Playwright aligns better with the Stage 8 cross-browser direction.
- **Source:** This decision and implementation are introduced together in commit "Add browser checker with Playwright"; package metadata and licenses are recorded in package.json and REFERENCES.md.


### 2026-11-16 — Use Playwright documentation as the browser-check demonstration target

- **Decision:** The browser checker accepts arbitrary user-provided HTTP(S) target URLs. Set `https://playwright.dev` as the default target for manual workflow demonstrations.
- **Rationale:** `example.com` is a minimal placeholder page, not a meaningful accessibility benchmark. A modern documentation site provides a more representative demonstration target while the workflow input continues to allow users to test their own sites.
- **Alternatives considered:** Keep `https://example.com` as the default; this was not selected because its minimal structure makes it a poor demonstration target for accessibility and UX checks.
- **Source:** `.github/workflows/browser-check.yml`; `scripts/browser-checker.mjs`.

## Pending decisions

- **Layout deck asset:** Decide whether assets/layout-decks.json is needed. Its absence and the unresolved decision are recorded in TODO.md.
- **Examples index:** Decide whether examples/README.md should be rewritten to match the examples currently present. The discrepancy is recorded in TODO.md.
- **Frontend templates:** Decide whether the three unfilled frontend templates should be populated or explicitly labeled template-only: examples/frontend/architecture-decision-record.md, examples/frontend/component-contract-matrix.md and examples/frontend/responsive-verification-matrix.md. This work is recorded in TODO.md.
