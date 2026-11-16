---
name: modern-css
description: Use when writing or refactoring CSS architecture, design tokens, layout systems, cascade strategy, responsive styling, themes or motion preferences.
---

# Modern CSS Engineering

## Objective

Use platform CSS capabilities to create maintainable, resilient styles without unnecessary dependencies or unsupported browser assumptions.

## Workflow

1. **Inspect the current system**
   - Identify CSS methodology, build tooling, preprocessor, browser support policy and existing tokens.
   - Review global styles, resets, component boundaries and specificity hotspots.
   - Preserve established conventions unless they cause a concrete problem.
2. **Define a deliberate cascade**
   - Use clear ownership for reset, tokens, base elements, layout, components and utilities.
   - Consider cascade layers when the project has competing style sources or needs predictable precedence.
   - Keep selector specificity low and avoid !important except for documented integration constraints.
   - Scope component styles to avoid accidental leakage.
3. **Build tokens around decisions**
   - Centralize repeated color, spacing, typography, radius, shadow, border and motion values.
   - Use semantic token names for roles such as surface, text, border and action rather than naming every token after a visual color.
   - Define theme changes through tokens instead of duplicating whole component styles.
   - Do not introduce tokens for one-off values without a reuse or consistency reason.
4. **Choose layout primitives**
   - Use Grid for two-dimensional placement and Flexbox for one-dimensional alignment.
   - Use intrinsic sizing and minmax() to avoid brittle fixed widths.
   - Use container queries for reusable components that respond to their own available space.
   - Use logical properties for writing-mode and direction resilience.
   - Avoid layout hacks based on arbitrary transforms or absolute positioning when normal flow works.
5. **Handle states and preferences**
   - Provide focus-visible styling and meaningful hover/active/disabled states.
   - Respect prefers-reduced-motion and avoid motion as the only status signal.
   - Support forced colors and increased contrast when relevant.
   - Use color-scheme only when the actual UI supports the corresponding browser-native surfaces.
6. **Optimize safely**
   - Avoid expensive broad selectors and unnecessary animation of layout properties.
   - Prefer transform and opacity for motion when appropriate, but verify compositing and rendering rather than assuming every transform is free.
   - Reserve image/media dimensions to reduce layout shifts.
   - Remove obsolete styles only after checking all consumers.
7. **Verify**
   - Test supported browsers and responsive conditions.
   - Check focus, hover, reduced motion, dark/light themes and forced colors as relevant.
   - Inspect computed styles and layout shifts in a real browser when available.
   - Run existing CSS lint/build checks.

## CSS quality rules

- Prefer readable CSS over compressed one-liners.
- Avoid unexplained magic numbers and conflicting duplicate declarations.
- Do not use !important to compensate for unclear cascade ownership.
- Do not rely on CSS visual reordering that conflicts with DOM reading order.
- Do not hide focus outlines without an equally visible replacement.
- Do not use color alone to communicate validation or status.
- Do not add browser-specific hacks without a documented support requirement.
- Do not assume the newest CSS feature is supported by every target browser; check compatibility against the project's support policy.

## Completion criteria

Styles have clear cascade ownership, reusable semantic tokens where justified, robust intrinsic layouts, accessible interaction states and verified browser behavior.


## Progressive enhancement and resilience

- Use feature queries such as @supports when a newer feature is an enhancement rather than a baseline requirement.
- Establish fallback layout behavior before introducing container queries, advanced selectors or newer color functions when the declared browser support requires it.
- Use cascade layers to establish intentional precedence between reset, vendor, base, components and utilities; layer order participates in the cascade and can outweigh selector specificity.
- Prefer logical properties for direction-aware spacing and sizing; test right-to-left and vertical writing modes when required.
- Test forced-colors/high-contrast modes and ensure borders, icons and focus indicators remain perceivable.
- Avoid using content-visibility, containment or will-change as blanket performance switches; measure behavior and verify focus, find-in-page and layout implications.

For each progressive enhancement, state the baseline behavior and the enhancement. Check actual browser support against the project's policy.
