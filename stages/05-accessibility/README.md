# Stage 5 — Accessibility Engineering

## Purpose

Make accessibility a design and engineering requirement across semantics, keyboard interaction, assistive technology, component behavior and release verification.

## Canonical assets

- [WCAG auditing](../../skills/wcag-auditing/SKILL.md)
- [Semantic accessibility](../../skills/semantic-accessibility/SKILL.md)
- [Keyboard and focus](../../skills/keyboard-focus/SKILL.md)
- [Screen-reader testing](../../skills/screen-reader-testing/SKILL.md)
- [Accessible components](../../skills/accessible-components/SKILL.md)
- [Accessibility automation](../../skills/accessibility-automation/SKILL.md)
- [Accessibility review](../../skills/accessibility-review/SKILL.md)
- [Independent review](../../skills/independent-review/SKILL.md) — independent/fresh-perspective checks for accessibility regressions alongside design and security review.
- [Accessibility engineering standard](../../standards/accessibility-engineering.md)
- [Accessibility examples and audit templates](../../examples/accessibility/README.md)
- [Audit plan](../../examples/accessibility/accessibility-audit-plan.md)
- [Semantic checklist](../../examples/accessibility/semantic-review-checklist.md)
- [Screen-reader test matrix](../../examples/accessibility/screen-reader-test-matrix.md)
- [Audit report template](../../examples/accessibility/accessibility-audit-report-template.md)
- [Finding template](../../examples/accessibility/accessibility-finding-template.md)
- [Keyboard fixtures](../../examples/accessibility/fixture/)
- [Keyboard tests](../../tests/accessibility/keyboard.test.mjs)
- [Accessibility test workflow](../../.github/workflows/accessibility-check.yml)

## Acceptance gate

- [x] WCAG target and audit scope are explicit.
- [x] Native semantics are preferred over unnecessary ARIA.
- [x] Keyboard and focus behavior is tested for critical journeys.
- [x] Screen-reader checks use named browser/AT combinations.
- [x] Automated scans are not presented as proof of conformance.
- [x] Findings include criterion, impact, evidence and retest result.
