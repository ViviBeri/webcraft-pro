# Post-v1.6.2 Work

> This file lists work explicitly deferred from v1.6.2. Adding items is
> encouraged. Removing items requires a linked PR that completes the work.

This is the single repository-maintained parking lot for work explicitly deferred beyond v1.6.2. Items remain unchecked until delivered and verified in their assigned release.

## v1.6.3 — Quality tooling

- [ ] Skill Doctor validator extension
- [ ] Safe uninstall with JSON reports (#29), narrow scope only
- [ ] Real-agent compatibility evidence for at least one agent (#17)

## v1.7.0 — Adoption

- [ ] QuickStart onboarding (#19)
- [ ] Verified reference app or static skill explorer (#19)
- [ ] Landing-page polish (#23)
- [ ] Contributor-experience documentation

## Deferred migrations and housekeeping

- [ ] Preserve the prohibition on state-changing GET submissions in `forms-and-validation`; allow GET only for non-sensitive, read-only forms (HeyDeer Batch 2 review)

- [ ] Add `failure_mode_format` front-matter to all 44 skills and extend the validator (after Batch 4)
- [ ] Migrate native-button guidance into `accessible-components`
- [ ] Migrate DOM-selector guidance into `modern-css`
- [ ] Move render-side-effect guidance into the appropriate framework skill
- [ ] Move snapshot-as-accessibility-proof guidance into the appropriate testing skill
- [ ] Trim the redundant Why-matters passage in `component-engineering`

## v1.7.0+ expansion

- [ ] HyperFrames Stage 09

## Operating rule

Do not pull these items into v1.6.2 batches. Re-scope an item only through an explicit roadmap change, with its target release and rationale recorded here and in `docs/roadmap.md`.

## Post-v1.6.2 candidate — controlled agent evaluation

**Gap:** Current repository checks demonstrate that selected engineering guardrails pass; they do not establish that WebCraft Pro causes AI agents to produce better code.

**Evaluation design:**
- Compare the same model and pinned model version with and without WebCraft Pro.
- Use identical task prompts, repository snapshots, dependencies, tool permissions, and execution limits.
- Select representative React and Vue tasks covering accessibility, security, responsive behavior, and functional correctness.
- Run multiple independent trials per condition; record model settings, timestamps, task inputs, generated diffs, and tool outputs.
- Evaluate outputs against predeclared objective tests and a blinded human-review rubric.
- Report pass rates, severity-weighted defects, regressions, task completion, and review effort; publish failures and confidence limitations.
- Keep CI results separate from causal claims: passing repository checks alone does not prove the skills improved model output.

**Website evidence:**
- Audit the public WebCraft Pro site against the same published quality claims.
- Record reproducible desktop/mobile browser checks, accessibility findings, broken links, console errors, and performance measurements.
- Fix or explicitly disclose material defects before using the site as a showcase benchmark.

**Why deferred:** Phase 1 / v1.6.2 is limited to failure-mode coverage. This evaluation is a separate quality/adoption workstream and must not interrupt Batch 4. Re-scope during v1.6.3 planning after Phase 1 closes.
