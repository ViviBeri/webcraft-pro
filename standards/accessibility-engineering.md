# Accessibility Engineering Standard

This standard defines the minimum engineering approach for accessible WebCraft Pro examples and projects.

## 1. Target and scope

- Use WCAG 2.2 Level AA as the default engineering target when no project-specific target is supplied.
- Confirm legal, contractual, procurement and product requirements before describing a conformance target.
- Scope routes, templates, authenticated states, languages, responsive breakpoints, embedded content and third-party components.
- Treat WCAG success criteria as the normative basis for conformance evaluation. This standard is implementation guidance, not certification.

## 2. Semantic foundations

- Prefer native HTML elements and browser behavior.
- Use meaningful landmarks, heading structure, labels, table headers and alternative text.
- Keep visual order, DOM order and reading order coherent.
- Provide accessible names for controls and ensure names remain consistent with visible labels.
- Use ARIA only when native HTML cannot express the required semantics; synchronize roles, states and relationships with actual behavior.

## 3. Keyboard and focus

- Make all functionality keyboard operable.
- Preserve logical focus order and visible focus indicators.
- Avoid positive tabindex values and keyboard traps.
- Ensure focused controls are not obscured by sticky or fixed content.
- Define focus entry, containment where appropriate, dismissal and restoration for dialogs and overlays.
- Implement custom widgets according to a documented WAI-ARIA APG pattern.

## 4. Content and interaction

- Associate controls with persistent labels and instructions.
- Identify errors in text, explain correction and associate messages with the relevant controls.
- Announce important asynchronous status changes without excessive interruptions.
- Provide alternatives to dragging and complex pointer gestures where required.
- Support zoom, reflow, text resizing and user preferences.
- Respect reduced-motion preferences and avoid relying on animation to communicate essential information.

## 5. Testing strategy

Use layered verification:
1. Static checks and semantic linting where available.
2. Automated axe-core scans on representative routes and interactive states.
3. Keyboard-only testing of critical journeys.
4. Browser accessibility-tree inspection.
5. Screen-reader testing on representative supported combinations.
6. Responsive, zoom, touch and reduced-motion checks.
7. Inclusive user testing when feasible and appropriate.

Automated checks are a useful safety net, not proof of WCAG conformance. Record test environment, build, coverage and exclusions.

## 6. Findings and remediation

Every finding should identify the affected route/component/state, applicable WCAG criterion and level, user impact, reproduction steps, evidence, owner and retest result.

Prioritize task-blocking barriers, shared component defects and issues that cause loss of information or control. Exceptions must be narrowly scoped, justified, owned and reviewed.

## 7. Release gate

A release review should confirm:
- Critical user journeys work with keyboard and supported assistive technologies.
- No unresolved high-impact accessibility blockers remain without an explicit risk decision.
- Automated scans run on representative states.
- Manual testing and coverage limitations are documented.
- Remediations have been retested against the original failure.

Do not claim certification or complete conformance based solely on an automated scan or this standard.

## 8. References

- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- WAI-ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/
- Playwright accessibility testing: https://playwright.dev/docs/accessibility-testing
- axe-core: https://github.com/dequelabs/axe-core
