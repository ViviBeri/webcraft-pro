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
- [Accessibility engineering standard](../../standards/accessibility-engineering.md)
- [Accessibility examples](../../examples/accessibility/README.md)
- [Keyboard fixtures](../../examples/accessibility/fixture/)
- [Keyboard tests](../../tests/accessibility/keyboard.test.mjs)
- [Accessibility test workflow](../../.github/workflows/accessibility-check.yml)

## Acceptance gate

- [ ] WCAG target and audit scope are explicit.
- [ ] Native semantics are preferred over unnecessary ARIA.
- [x] Keyboard and focus behavior is tested for critical journeys.
- [ ] Screen-reader checks use named browser/AT combinations.
- [ ] Automated scans are not presented as proof of conformance.
- [ ] Findings include criterion, impact, evidence and retest result.
