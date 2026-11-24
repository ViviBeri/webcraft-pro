---
name: visual-design-review
description: Review implemented web pages for visual quality, responsive behavior, accessibility and interaction defects using browser evidence or supplied screenshots. Use when validating a new page, reviewing a redesign, comparing implementation against a reference, or identifying visual regressions before release.
---

# Visual Design Review

## Objective

Evaluate the rendered interface, not just its source code. Identify reproducible visual and usability defects, prioritize them by impact and verify fixes at relevant viewport sizes.

## Evidence requirements

Use the strongest available evidence:

1. Live browser inspection with the target page loaded.
2. Local browser preview when the project can be run.
3. Supplied screenshots with viewport dimensions.
4. Source inspection only when rendered evidence is unavailable.

State which evidence was used. Do not claim browser testing from source inspection alone.

## Review workflow

### 1. Establish review scope

Record the target URL or route, expected page purpose, reference design if supplied, supported browsers and viewport sizes. Identify the key user journey and important interactive elements.

### 2. Inspect the complete page

Review:

- Header, navigation and hero.
- Section order and visual rhythm.
- Typography, alignment and line lengths.
- Color, contrast, borders and shadows.
- Image quality, crop and loading.
- Buttons, links, forms and feedback.
- Footer and secondary navigation.
- Empty, loading, error and success states where applicable.

Do not limit review to the first viewport.

### 3. Review responsive behavior

At minimum, inspect a narrow mobile viewport, a tablet-sized viewport, a typical laptop viewport and a wide desktop viewport when browser tooling permits.

Look for:

- Horizontal overflow.
- Clipped or overlapping content.
- Unusable navigation.
- Text that is too small or too large.
- Buttons and controls with insufficient space.
- Poor image crops.
- Unexpected section ordering.
- Sticky UI covering content or keyboard focus.

Record exact viewport dimensions for reproducible findings.

### 4. Review accessibility

Check:

- Semantic landmarks and heading hierarchy.
- Keyboard navigation and visible focus.
- Accessible names for controls.
- Form labels and understandable errors.
- Text and non-text contrast.
- Image alternatives.
- Reduced-motion behavior.
- Zoom and text resizing.

Use automated tools as supporting evidence, not as a substitute for manual checks.

### 5. Review interactions

Test navigation, calls to action, menus, dialogs, forms, accordions and other visible controls. Check loading, success and failure feedback. Confirm that links lead to the intended destinations and buttons perform the advertised action.

### 6. Pre-Flight Check

Before presenting the review or completed work, inspect the output against this checklist:

- **Intentional motion:** motion has a clear purpose, does not distract or delay interaction, and responds appropriately to user actions.
- **Responsive behavior:** layouts, navigation, content, images and controls work at the supported viewport sizes without clipping or horizontal overflow.
- **Keyboard focus:** interactive elements are reachable and operable by keyboard, with a clear visible focus indicator and sensible focus order.
- **Reduced motion:** non-essential motion is reduced or removed when the user requests reduced motion; essential state changes remain understandable.

Record the evidence and any limitations. Fix confirmed defects when implementation is in scope; otherwise include them as prioritized findings. Do not mark a check as passed without inspecting it.

### 7. Prioritize findings

Classify each issue:

- **Critical:** blocks a primary task, exposes sensitive data or creates a serious accessibility/security risk.
- **High:** major layout failure, broken primary action or severe mobile usability defect.
- **Medium:** noticeable visual inconsistency or secondary interaction defect.
- **Low:** minor polish issue with limited user impact.

Separate confirmed defects from subjective design preferences.

### 8. Report and fix

For each finding, include:

- Severity.
- Page and viewport.
- Exact observed behavior.
- Reproduction steps.
- Expected behavior.
- Recommended fix.
- Evidence such as screenshot or browser observation, when available.

Fix the highest-impact issues first when implementation is requested. Re-run the same checks after changes.

## Guardrails

- Do not invent defects that are not visible or reproducible.
- Do not call a design inaccessible based only on appearance.
- Do not treat automated scores as proof of full compliance.
- Do not change brand direction during a QA pass unless asked.
- Preserve existing functionality while correcting visual defects.
- Avoid unnecessary rewrites for isolated issues.

## Review output

Return an actionable report grouped by severity, followed by the checks performed and any unverified areas.

## Design quality scorecard

Score each dimension from 0 to 4 using the evidence available:

| Score | Meaning |
|---|---|
| 0 | Missing, broken or actively harmful |
| 1 | Major weakness; users are likely to struggle |
| 2 | Partially effective; meaningful gaps remain |
| 3 | Effective; only limited issues remain |
| 4 | Strong, consistent and supported by evidence |

Evaluate product specificity and content truth; information hierarchy and composition; typography, spacing and visual consistency; responsive behavior and content reflow; and accessibility and interaction clarity.

For every score below 3, record at least one concrete observation and recommended action. Mark a dimension not assessed when evidence is insufficient; do not assign it a neutral score. Never hide a critical or high-severity defect behind an average score. The scorecard is a prioritization aid, not a certification or objective measure of taste.

## Design quality scorecard

Score each dimension from 0 to 4 using the evidence available:

| Score | Meaning |
|---|---|
| 0 | Missing, broken or actively harmful |
| 1 | Major weakness; users are likely to struggle |
| 2 | Partially effective; meaningful gaps remain |
| 3 | Effective; only limited issues remain |
| 4 | Strong, consistent and supported by evidence |

Evaluate product specificity and content truth; information hierarchy and composition; typography, spacing and visual consistency; responsive behavior and content reflow; and accessibility and interaction clarity.

For every score below 3, record at least one concrete observation and recommended action. Mark a dimension not assessed when evidence is insufficient; do not assign it a neutral score. Never hide a critical or high-severity defect behind an average score. The scorecard is a prioritization aid, not a certification or objective measure of taste.

## Completion checklist

- [ ] Review scope and evidence are stated.
- [ ] Full page has been inspected.
- [ ] Relevant viewport sizes have been checked.
- [ ] Key interactions have been tested.
- [ ] Keyboard and accessibility checks have been performed where possible.
- [ ] Findings include reproducible details.
- [ ] Fixes have been rechecked.
- [ ] Unverified items are clearly identified.

## Common AI failure mode

**Failure:** An agent approves a page's visual quality after inspecting only a desktop viewport, without checking the same page at narrow widths.

**Why it matters:** Responsive overflow, clipped controls, overlapping navigation, unreadable text, and broken section ordering can make the primary task unusable on mobile even though the desktop screenshot looks polished.

**Symptoms:**
- The review has no recorded narrow viewport dimensions or mobile evidence.
- Content or controls overflow, overlap, or become unreachable when the viewport narrows.
- Desktop-only screenshots are used to claim responsive behavior passed.

**Prevention:** Inspect the complete page at a narrow mobile viewport as well as the supported tablet and desktop sizes. Record exact dimensions, test navigation and primary interactions, and check overflow, clipping, focus visibility, text reflow, and section order. Mark any viewport not actually inspected as untested; do not infer responsive quality from source CSS alone.
