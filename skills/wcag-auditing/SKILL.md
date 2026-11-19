---
name: wcag-auditing
description: Use when evaluating or remediating a website against WCAG 2.2, planning an accessibility audit, or documenting conformance evidence and limitations.
---

# WCAG Auditing

## Objective

Run a reproducible, evidence-based accessibility assessment. Treat WCAG as testable success criteria, not a visual style checklist. Default to WCAG 2.2 Level AA when the project has no stated target, but confirm the applicable policy, jurisdiction and contract before making a compliance claim.

## Workflow

1. **Define scope.** Record URLs, templates, authenticated states, languages, responsive breakpoints, user journeys, embedded content and third-party boundaries.
2. **Set the target.** Record WCAG version, conformance level and any applicable legal or contractual requirement. Do not silently substitute a different standard.
3. **Inventory journeys.** Include navigation, search, forms, validation, dialogs, menus, media, authentication, checkout or other critical tasks.
4. **Run automated checks.** Use axe-core or an equivalent checker on representative rendered states. Capture rule IDs, affected nodes and reproducible steps.
5. **Perform manual checks.** Review semantic structure, keyboard-only operation, focus visibility/order, zoom and reflow, contrast, labels, error handling, status messages, reading order and motion preferences.
6. **Test assistive technology.** Verify representative journeys with screen readers and native platform accessibility tools. Include touch and mobile behavior where relevant.
7. **Map findings to criteria.** For every issue, record the criterion and level, affected component/state, evidence, impact, reproduction steps, severity, owner and proposed fix.
8. **Retest.** Verify the original failure and nearby regressions after remediation. Keep evidence tied to the tested build and date.

## WCAG 2.2 areas to check

Prioritize the criteria relevant to the product, including:
- Text alternatives, captions and meaningful structure.
- Contrast, text resizing, reflow and non-text contrast.
- Keyboard access, no keyboard traps, focus order and visible focus.
- Focus Not Obscured (Minimum), target size (Minimum) and dragging alternatives.
- Labels, instructions, error identification and error suggestions.
- Name, role, value and status messages.
- Accessible authentication and consistent navigation.

Do not assume this list is exhaustive. Consult the normative standard and applicable success criteria.

## Finding format

For each finding include:
- ID and concise title.
- URL, component and state.
- WCAG criterion and conformance level.
- User impact and severity rationale.
- Exact reproduction steps and expected/actual behavior.
- Evidence (screenshot, DOM details, test output or assistive-technology observation).
- Recommended remediation and retest result.

## Reporting rules

- Separate confirmed failures, potential risks, passed checks and untested areas.
- State sample coverage and exclusions.
- Never infer full-site conformance from a homepage scan or a clean automated report.
- Automated tools detect only a subset of accessibility issues; manual assessment and user testing remain necessary.
- Do not claim certification, legal compliance or universal accessibility without a valid, scoped conformance evaluation.

## Completion criteria

The audit has a defined scope and target, representative workflows have been tested, findings map to evidence and criteria, limitations are explicit, and remediated issues have been retested.

## Common AI failure mode

**Failure:** An agent treats a clean automated scan or a small sample of pages as proof that the entire site conforms to WCAG.

**Why it matters:** Automated tools detect only a subset of accessibility failures, and untested templates, states, journeys, and assistive-technology behavior can contain serious barriers.

**Prevention:** Define and record scope, WCAG version and level; combine automated checks with manual keyboard, reflow, content, and assistive-technology testing; map findings to criteria and evidence; and state exclusions and untested areas explicitly.
