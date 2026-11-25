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

## v1.6.3 candidate — `website-reconstruction` skill

**Source:** https://github.com/JCodesMore/ai-website-cloner-template (MIT)
**Gap filled:** URL→local-route reconstruction with visual/interaction parity.
**Stage placement:** 02 (Design Intelligence), 03 (Frontend Engineering), 08 (Browser QA)
**Draft scope:**
- Map source URLs to local routes
- Inspect at desktop/tablet/mobile
- Extract fonts, images, SVGs, video, design tokens
- Capture interactions, scroll, menus, animations
- Rebuild in editable code
- Compare original vs rebuilt; fix deltas
- Production checks + gap report

**WebCraft Pro enhancements over upstream:**
- Measurable visual comparison (not subjective)
- Multi-viewport verification (desktop/tablet/mobile)
- Accessibility: keyboard + axe-core
- Security: audit downloaded assets and external refs
- Performance: image, font, rendering budgets
- Existing-project safety: protect routes/components not in scope
- Evidence-based completion report

**Licensing:** MIT. Retain upstream copyright + license notice in
`THIRD_PARTY_NOTICES.md` and in the skill's header comment. Attribution
required; enhancement diff should be documented in the skill's commit
message.

**Why not v1.6.2:** Phase 1 is failure-mode coverage only. New skills
reopen the 44-skill denominator and the #12 closure criteria. Target:
v1.6.3 or v1.7.0 (adoption release — this is genuinely an adoption
feature).

**Pre-work before opening a PR:**
1. Decide canonical naming (`website-reconstruction` vs `site-cloning`)
2. Decide whether it replaces or complements `visual-reference-analysis`
3. Draft the Failure/Why/Prevention section *first* (Phase 1 rubric)
4. Add to stage indexes + README + validator in same PR
