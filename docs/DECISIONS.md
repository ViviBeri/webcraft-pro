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

### 2026-11-16 — Use a local accessible fixture as the deterministic browser-check baseline

- **Decision:** Support validated local `file://` URLs in the browser checker and use `examples/test-page.html` as the default CI target. Keep the manual workflow input available for arbitrary live HTTP(S) URLs.
- **Rationale:** Live websites can change their markup and accessibility state independently of this repository, making them unstable CI baselines. A small, version-controlled accessible fixture provides a deterministic target for verifying navigation, keyboard focus, screenshots and axe-core integration. Local file URLs are accepted only when they resolve to an existing regular file.
- **Alternatives considered:** Continue using a third-party live site as the default; this was not selected because its content and accessibility defects are outside this repository's control.
- **Source:** `.github/workflows/browser-check.yml`; `scripts/browser-checker.mjs`; `examples/test-page.html`.

### 2026-11-16 — Verify the local browser-check baseline in GitHub Actions

- **Decision:** Record the successful manual workflow run using the blank `target_url` input as the Stage 8 local-fixture verification.
- **Evidence:** Manual Browser Check run #7 (run ID `43919942669`) completed successfully on commit `dc3b92800ba686575096143ef16f05218849aaa4`. The workflow resolved the blank input to `file:///home/runner/work/webcraft-pro/webcraft-pro/examples/test-page.html`; the browser checker reported 24 passed and 0 failed. The Chromium job, report/screenshot artifact upload and all workflow steps completed successfully.
- **Qualification:** Dependency installation emitted a non-blocking `EBADENGINE` warning: `@axe-core/playwright@4.14.0` declares Node.js `>=22.12.0`, while this workflow currently selects Node.js 20. The run passed, but the workflow runtime should be aligned with the dependency's declared engine before treating the toolchain as warning-free.
- **Source:** [Manual Browser Check run #7](https://github.com/ViviBeri/webcraft-pro/actions/runs/43919942669); workflow artifact `browser-check-artifacts`.

## Scope Boundaries

### 2026-11-17 — Keep backend framework implementations out of scope

- **Decision:** WebCraft Pro intentionally excludes backend frameworks (e.g., Go/Gin, Node/Express) to maintain a strict focus on frontend engineering, UI/UX, and client-side security. Backend security is referenced through OWASP standards, but specific framework implementations are out of scope.
- **Rationale:** Adding framework-specific backend skills would expand the toolkit beyond its frontend engineering purpose and undermine its framework-agnostic frontend scope. Backend security concepts remain covered at the standards level without prescribing a backend stack.
- **Alternatives considered:** Adding Go/Gin or Node/Express framework skills was rejected as scope creep.
- **Source:** Maintainer scope decision recorded in this change.
- **Additional note:** While tools like FastAPI and Stable Diffusion WebUI are excellent, they represent backend logic and specialized ML interfaces. WebCraft Pro remains strictly focused on framework-agnostic frontend engineering.

## Pending decisions

- **Layout deck asset:** Decide whether assets/layout-decks.json is needed. Its absence and the unresolved decision are recorded in TODO.md.
- **Examples index:** Decide whether examples/README.md should be rewritten to match the examples currently present. The discrepancy is recorded in TODO.md.
- **Frontend templates:** Decide whether the three unfilled frontend templates should be populated or explicitly labeled template-only: examples/frontend/architecture-decision-record.md, examples/frontend/component-contract-matrix.md and examples/frontend/responsive-verification-matrix.md. This work is recorded in TODO.md.
