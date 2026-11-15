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

### 6. Prioritize findings

Classify each issue:

- **Critical:** blocks a primary task, exposes sensitive data or creates a serious accessibility/security risk.
- **High:** major layout failure, broken primary action or severe mobile usability defect.
- **Medium:** noticeable visual inconsistency or secondary interaction defect.
- **Low:** minor polish issue with limited user impact.

Separate confirmed defects from subjective design preferences.

### 7. Report and fix

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

## Completion checklist

- [ ] Review scope and evidence are stated.
- [ ] Full page has been inspected.
- [ ] Relevant viewport sizes have been checked.
- [ ] Key interactions have been tested.
- [ ] Keyboard and accessibility checks have been performed where possible.
- [ ] Findings include reproducible details.
- [ ] Fixes have been rechecked.
- [ ] Unverified items are clearly identified.
