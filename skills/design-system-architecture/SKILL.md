---
name: design-system-architecture
description: Architect a maintainable, accessible design system for a website or product interface. Use when defining semantic design tokens, typography and spacing scales, component foundations, theme variants, documentation, or governance for a new or existing design system.
---

# Design System Architecture

## Objective

Create a small, coherent design system that makes common interface decisions reusable without forcing every page into the same composition. The system must support product identity, content variation, responsive behavior, accessibility and maintainable implementation.

## 1. Audit before designing

Inspect the existing codebase and identify:

- Current CSS strategy, component library and build constraints.
- Existing tokens, variables, themes and naming conventions.
- Repeated components and inconsistent one-off values.
- Brand assets, typography licenses and supported languages.
- Required themes, contrast modes and user preferences.
- Existing accessibility and browser support requirements.

Do not replace a working design system just to introduce a preferred naming convention or library.

## 2. Define design foundations

Create semantic tokens for:

- Color roles: canvas, surface, elevated surface, primary text, secondary text, border, action, focus, status and overlay.
- Typography: family, size, weight, line height, letter spacing and content measure.
- Spacing: a documented scale that supports both compact and spacious contexts.
- Layout: content widths, gutters, grid behavior and breakpoints.
- Shape: radius, border width and divider treatment.
- Depth: elevation and overlay levels, used sparingly.
- Motion: duration, easing and distance, with reduced-motion alternatives.

Separate primitive values from semantic aliases. A component should consume a role such as `--color-surface-raised`, not an arbitrary palette index.

## 3. Design token architecture

Use three layers when they improve clarity:

1. **Primitive tokens:** raw values such as a color ramp or spacing unit.
2. **Semantic tokens:** roles such as text, surface, border and action.
3. **Component tokens:** narrowly scoped overrides for components with a real need.

Avoid creating component tokens for every property. Prefer semantic tokens until a component needs an independently governed variation.

Example:

```css
:root {
  --palette-ink-900: #17212b;
  --palette-paper-50: #f7f6f2;
  --palette-blue-700: #245a78;

  --color-canvas: var(--palette-paper-50);
  --color-text: var(--palette-ink-900);
  --color-action: var(--palette-blue-700);

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
}
```

Values are illustrative only. Measure contrast and choose colors for the actual product.

## 4. Establish component foundations

Prioritize components by reuse and interaction risk:

- Buttons and links.
- Form controls and validation feedback.
- Navigation and disclosure patterns.
- Cards and content containers.
- Dialogs and overlays.
- Alerts, status messages and empty states.

For each component, document:

- Purpose and when not to use it.
- Semantic element and accessible name requirements.
- Supported variants and sizes.
- Default, hover, focus, active, disabled, loading and error states.
- Responsive behavior and content constraints.
- Keyboard and assistive-technology expectations.
- Test coverage and known limitations.

Do not create a custom component where native HTML already provides the required behavior.

## 5. Support themes and responsive contexts

Use semantic tokens to support theme changes. Check text, borders, focus indicators, charts and disabled states in every theme.

Prefer fluid layout primitives and content-driven breakpoints. Avoid encoding device names as layout rules when content width is the actual constraint.

Ensure the design system handles:

- Long translated labels.
- User text resizing and browser zoom.
- High-contrast or forced-color modes.
- Reduced motion.
- Touch and pointer input.
- Dense and spacious content contexts.

## 6. Document and govern

Provide a token reference, component usage guidance and contribution rules. Define how a token or component is proposed, reviewed, deprecated and removed.

A change should identify affected components and pages. Avoid silent token renames that break consuming applications.

## 7. Verify

- Check token references for undefined or obsolete values.
- Compare representative pages before and after a token change.
- Test component states and keyboard behavior.
- Verify contrast for actual foreground/background pairs.
- Test responsive and theme variants.
- Run the existing visual and component test suites.
- Record breaking changes and migration steps.

## Deliverables

1. Existing-system audit.
2. Token taxonomy and naming rules.
3. Component inventory and state matrix.
4. Theme and responsive strategy.
5. Documentation and governance approach.
6. Verification evidence and migration notes.

## Completion checklist

- [ ] Existing implementation and constraints were inspected.
- [ ] Tokens are semantic and have clear ownership.
- [ ] Primitive, semantic and component layers are not needlessly duplicated.
- [ ] Components document semantics, states and usage constraints.
- [ ] Themes, zoom, localization and reduced motion are considered.
- [ ] Token changes are verified against representative pages.
- [ ] Governance and deprecation rules are documented.
