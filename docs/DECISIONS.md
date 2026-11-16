# Architecture Decision Log

This log backfills decisions that are evidenced by the repository's existing files. Exact decision dates are not recorded for these entries; each is therefore marked **backfilled**. The ordering below follows the dependency and architecture sequence reflected in the repository, not a claim about exact decision timestamps.

## Decisions

### backfilled — Keep the package free of declared runtime dependencies

- **Decision:** Keep `package.json` free of declared runtime dependencies and development dependencies. The repository's installer is described as dependency-free.
- **Rationale:** The repository records a dependency-free Node.js installer. A further rationale for the zero-dependency policy is not documented in repo.
- **Alternatives considered:** Not recorded in repo.
- **Source:** `package.json`; `stages/01-foundation/README.md`.

### backfilled — Use Node.js 20 or later as the toolchain requirement

- **Decision:** Set Node.js `>=20` as the package engine requirement and document Node.js 20 or later for installation and validation.
- **Rationale:** The repository specifies this minimum version. The reason for selecting Node.js 20 is not documented in repo.
- **Alternatives considered:** Not recorded in repo.
- **Source:** `package.json`; `README.md`.

### backfilled — Distribute original project materials under MIT and preserve upstream attribution terms

- **Decision:** License original WebCraft Pro project materials under MIT, while retaining applicable third-party license and attribution requirements. The reference register identifies upstream materials under CC-BY-4.0 and CC-BY-SA-4.0, among other licenses.
- **Rationale:** The repository states that original project materials use MIT except where a file or third-party material states otherwise, and that third-party references retain their own licenses and attribution requirements. No further rationale is documented in repo.
- **Alternatives considered:** Not recorded in repo.
- **Source:** `README.md`; `LICENSE`; `REFERENCES.md`.

### backfilled — Keep portable skills separate from stage indexes and shared standards

- **Decision:** Use the staged architecture with canonical portable skill files under `skills/<name>/SKILL.md`, shared engineering standards under `standards/`, and stage indexes and acceptance records under `stages/`. Do not duplicate skill stores inside stage folders.
- **Rationale:** The repository states that portable skill source remains in `skills/` so skill files are not duplicated across agents, and that stage folders are indexes and acceptance records rather than duplicate skill stores.
- **Alternatives considered:** A flat skills-only structure is not recorded as a formally evaluated alternative; the repository does state that stage folders are used instead of duplicating skills in them.
- **Source:** `README.md`; `stages/01-foundation/README.md`.

### backfilled — Pin GitHub Actions to verified full commit SHAs

- **Decision:** Pin external GitHub Actions to verified full commit SHAs. The active validation workflow pins `actions/checkout` to a full SHA and includes its version comment.
- **Rationale:** Stage 8 explicitly requires verified full commit SHAs as a design constraint. The repository does not document a more detailed rationale for this policy.
- **Alternatives considered:** Not recorded in repo.
- **Source:** `.github/workflows/validate.yml`; `README.md`; `stages/08-browser-qa-release/README.md`.

### backfilled — Grant CI the minimum contents read permission

- **Decision:** Set workflow-level `permissions: contents: read` for the repository validation workflow.
- **Rationale:** The README describes the workflow as using read-only repository permissions; Stage 8 requires least-privilege `GITHUB_TOKEN` permissions. No additional rationale is documented in repo.
- **Alternatives considered:** Not recorded in repo.
- **Source:** `.github/workflows/validate.yml`; `README.md`; `stages/08-browser-qa-release/README.md`.

## Pending decisions

- **Browser checker implementation:** Decide whether `browser-checker.mjs` should use Playwright or remain zero-dependency. The repository references Playwright and describes browser automation as planned, but does not record a decision to add Playwright as a dependency. Related outstanding browser QA work is tracked in `TODO.md`.
- **Layout deck asset:** Decide whether `assets/layout-decks.json` is needed. Its absence and the unresolved decision are recorded in `TODO.md`.
- **Examples index:** Decide whether `examples/README.md` should be rewritten to match the examples currently present. The discrepancy is recorded in `TODO.md`.
- **Frontend templates:** Decide whether the three unfilled frontend templates should be populated or explicitly labeled template-only: `examples/frontend/architecture-decision-record.md`, `examples/frontend/component-contract-matrix.md` and `examples/frontend/responsive-verification-matrix.md`. This work is recorded in `TODO.md`.
