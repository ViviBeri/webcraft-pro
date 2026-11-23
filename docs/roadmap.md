# WebCraft Pro — Revised Roadmap & Next Actions

**Last updated:** 2026-11-24
**Status:** Phase 1 in progress (4/44 skills)
**Version:** v1.6.1 shipped (registry-verified, provenance, OIDC)

---

## Guiding principles

1. **Each phase ships as its own version.** No bundled "quality releases."
2. **Batch size ≥ 10 skills.** One review cycle per batch.
3. **Two review rounds max per PR.** Round 3 = merge-and-follow-up or abandon.
4. **Tiered verification:** Tier 1 = exhaustive; Tier 2 = trust the diff, spot-check; Tier 3 = trust, note as risk.
5. **Side-quests go to `post-v1.6.2` list.** Not into the current phase's PR.
6. **Binary status only.** No progress percentages.

---

## Roadmap

### v1.6.2 — Failure-Mode Coverage
**Target: 3–4 weeks**

Scope: Phase 1 only.

- [ ] Batch 2 — 10 skills, one review cycle
- [ ] Batch 3 — 12 skills, one review cycle
- [ ] Batch 4 — ~18 skills (partials + net-new), one review cycle
- [ ] `failure_mode_format` front-matter added to all 44 skills + validator extension
- [ ] Issue #12 acceptance criteria met
- [ ] Issue #12 closed with `stateReason: completed`
- [ ] Release gate enforced (carry-over checklist from PR #45)

**Deferred out of v1.6.2:**
- Skill Doctor (#15) → v1.6.3
- Agent compatibility evidence (#17) → v1.6.3
- QuickStart/Showcase (#19) → v1.7.0
- Landing page (#23) → v1.7.0
- Safe uninstall (#29) → v1.6.3 or later
- HyperFrames → v1.7.0

---

### v1.6.3 — Quality Tooling
**Target: +4 weeks**

- [ ] Skill Doctor complete + accepted (#15)
- [ ] Real-agent evaluation for at least one agent (#17)
- [ ] Safe uninstall + JSON reports (#29) — narrow scope only

---

### v1.7.0 — Adoption
**Target: +6 weeks**

- [ ] QuickStart onboarding (#19)
- [ ] One of: verified reference app OR static skill explorer (#19)
- [ ] Landing-page polish (#23)
- [ ] Contributor-experience docs

---

### v1.8.0 / v2.0.0 — Expansion

- [ ] HyperFrames Stage 09

---

## This week — 5 actions

### 1. Close PR #45
- [ ] Open PR #45 → Update branch
- [ ] Wait for Chromium, CodeQL, HeyDeer
- [ ] Merge if green (if HeyDeer rate-limited, merge with coverage note)

### 2. Delete stale branches
- [ ] `docs/failure-mode-batch-1` (merged in #43)
- [ ] `docs/anti-slop-ui-deduplicate-refinement` (merged in #44)
- [ ] Any `dependabot/*` from PR #37

### 3. Create `post-v1.6.2` list in Notion
Single page, one bullet per deferred item:

- [ ] `failure_mode_format` front-matter + validator
- [ ] Migration: native buttons → `accessible-components`
- [ ] Migration: DOM selectors → `modern-css`
- [ ] Migration: render side effects → framework skill
- [ ] Migration: snapshot-as-a11y-proof → testing skill
- [ ] Skill Doctor validator extension
- [ ] `component-engineering` Why-matters trim
- [ ] Landing-page polish
- [ ] Contributor-experience docs

### 4. Open Batch 2 as one PR (10 skills)
- 1 calibration: pick from `semantic-accessibility`, `screen-reader-testing`, `motion-design-systems` — whichever has largest Consequence gap
- 3–4 partial extensions: next highest-graded partials
- 5–6 net-new: prefer `authentication-sessions`, `secrets-configuration`

Review cycle: **one human pass on the batch as a whole.** Bots run as normal. If HeyDeer finds issues, apply or explicitly resolve in one round.

### 5. Re-baseline this roadmap
- [ ] Commit this document as `docs/roadmap.md`
- [ ] Update README roadmap reference
- [ ] Note v1.6.2 scope = failure-mode coverage only

---

## Phase 1 — done criteria

Phase 1 closes when **all** of the following are true:

- [ ] All 44 skills have `## Common AI failure mode` section
- [ ] All 44 pass all 5 rubric criteria
- [ ] 10 partials restructured (existing content absorbed, not duplicated)
- [ ] 31 net-new sections written
- [ ] `failure_mode_format` front-matter present on all 44
- [ ] `validate-skills.mjs` enforces section presence + format
- [ ] Issue #12 closed with `stateReason: completed`
- [ ] Release gate checklist merged and enforced

**When all above are checked, Phase 1 = v1.6.2 = shipped.**

---

## Cadence rules (apply from Batch 2 onward)

### Rule 1 — Batch size ≥ 10 skills
No more 4-skill batches. 10 per batch, one review cycle. Bots catch mechanical issues; human review checks shape.

### Rule 2 — Two review rounds max per PR
Round 3 = either merge-and-follow-up, or abandon. Exception: genuine correctness defects (fabricated evidence, broken links, inverted logic).

### Rule 3 — Tiered verification
- **Tier 1 (exhaustive):** published state, provenance, #12 closure, branch protection, anything closing a gate
- **Tier 2 (trust the diff, spot-check):** skill content changes with visible diff
- **Tier 3 (trust, note as risk):** docs, comments, front-matter

### Rule 4 — Side-quests gated to a phase
If a side-quest appears during Phase 1, it goes to `post-v1.6.2` list. Not into the current PR.

### Rule 5 — Binary status only
No progress percentages. Per-item checked/unchecked.

---

## Active work

| Phase | Status | Current |
|-------|--------|---------|
| Release integrity (v1.6.1) | ✅ Closed | Registry-verified, provenance, OIDC |
| Phase 1 — failure modes | 🟡 In progress | 4/44 skills (Batch 1 merged) |
| Phase 2–7 | ⚪ Not started | Gated on Phase 1 close |
| Phase 8 — HyperFrames | ⚪ Not started | v1.7.0+ |

**Next action:** Close PR #45, then open Batch 2 as a single 10-skill PR.

---

## What not to do

- ❌ No new side-quests until Batch 2–4 are open
- ❌ No front-matter changes during Phase 1 batches (do it as one PR after Batch 4)
- ❌ No migration candidates pulled forward individually (batch them)
- ❌ No landing-page / QuickStart / Skill Doctor work in v1.6.2
- ❌ No "verified" labels without evidence
- ❌ No progress percentages

---

## What to do if stuck

If a PR stalls past two review rounds:
1. List the open findings
2. Classify each: **defect** (fix now) vs **refinement** (park)
3. Merge the defects; move refinements to `post-v1.6.2`
4. Move on

Momentum > perfection on skill content.

---

## Success definition for v1.6.2

**v1.6.2 ships when:** all 44 skills have validated failure-mode sections, `#12` is closed with reason `completed`, and the carry-over gate is enforced.

Nothing else needs to be in v1.6.2. Every other quality item belongs to v1.6.3 or later.
