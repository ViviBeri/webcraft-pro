---
name: design-direction
description: Develop a distinctive, coherent visual direction for a website or web application. Use when planning a new interface, defining a design system, selecting typography and color, translating a brand brief into UI, or correcting an inconsistent visual language.
---

# Design Direction

## Objective

Translate the product, audience, brand, content and constraints into a deliberate visual system before implementation. Produce a design direction that is distinctive, usable, accessible and feasible for the chosen technology.

## Workflow

### 1. Understand the brief

Identify:

- Product purpose and primary user groups.
- The most important user task or conversion.
- Brand personality and existing brand assets.
- Content volume, information hierarchy and required pages.
- Technical constraints, existing components and target browsers.
- Accessibility requirements and supported viewport range.

Separate confirmed requirements from assumptions. Ask only for missing information that materially changes the direction. Otherwise state reasonable assumptions and proceed.

### 2. Research the context

Inspect existing product pages, brand assets, content and design references supplied by the user. If external research is permitted, use relevant primary sources and record the useful observations.

Do not copy another site's layout, wording, illustrations or identity. Extract high-level principles such as density, contrast, rhythm, tone and interaction patterns, then create an original solution.

### 3. Establish the art direction

Write a concise direction statement covering:

- Visual concept and intended emotional response.
- Typography character and hierarchy.
- Color roles and contrast strategy.
- Layout grid, spacing rhythm and content density.
- Image, illustration, icon and texture treatment.
- Motion principles and reduced-motion behavior.

Explain why each major choice supports the product and audience. Avoid arbitrary decoration.

### 4. Define reusable design tokens

Specify semantic tokens for:

- Color roles: page, surface, elevated surface, text, muted text, border, focus, primary action, success, warning and danger.
- Typography: font families, scale, weights, line heights and measure.
- Spacing: a consistent scale rather than isolated values.
- Layout: content widths, grid, gutters and breakpoints.
- Shape and depth: radii, borders and restrained elevation.
- Motion: duration, easing and distance by interaction type.

Use CSS custom properties or the target framework's token system. Prefer semantic names over names tied to a single component.

### 5. Design the page system

Map page regions and components before styling:

- Global navigation and page shell.
- Primary content hierarchy.
- Reusable sections and components.
- Primary and secondary actions.
- Forms, empty states, loading states and errors.
- Footer and supporting navigation.

Design for real content, including long headings, missing images, validation messages and translated text.

### 6. Validate the direction

Check the design at narrow mobile, wide mobile, tablet, laptop and large desktop widths. Verify keyboard focus, text contrast, zoom, content order and reduced motion.

Review the complete page, not just the hero or first viewport. Ensure all pages feel related without becoming repetitive.

## Quality rules

- Make hierarchy obvious before adding visual effects.
- Use whitespace to organize content, not to hide missing information.
- Use a limited, purposeful type and color system.
- Prefer meaningful imagery over generic stock decoration.
- Make interactive elements visually identifiable.
- Preserve readable contrast and visible focus indicators.
- Respect existing product conventions unless there is a reason to change them.
- Do not invent brand assets, testimonials, metrics or product claims.

## Deliverables

Return:

1. A short art-direction statement.
2. Audience and user-task assumptions.
3. Token specification.
4. Page and component hierarchy.
5. Responsive and interaction notes.
6. Accessibility and validation checklist.

When implementation is requested, implement the direction in the existing project rather than stopping at a concept document.

## Design calibration and decision record

When comparing directions, record three qualitative dials: composition variance (conservative to experimental), visual density (spacious to information-rich), and motion intensity (static to expressive). These are discussion aids, not universal numeric standards. Explain each choice in product context; never let novelty or motion override clarity and accessibility.

Before implementation, record the product, audience and primary task; confirmed brand constraints and assumptions; one-sentence art direction; composition, density and motion choices with rationale; typography, color and spacing principles; distinctive product-specific visual moments where appropriate; responsive and accessibility constraints; and risks requiring verification.

A good direction should be explainable in plain language and traceable to product needs.

## Design calibration and decision record

When comparing directions, record three qualitative dials: composition variance (conservative to experimental), visual density (spacious to information-rich), and motion intensity (static to expressive). These are discussion aids, not universal numeric standards. Explain each choice in product context; never let novelty or motion override clarity and accessibility.

Before implementation, record the product, audience and primary task; confirmed brand constraints and assumptions; one-sentence art direction; composition, density and motion choices with rationale; typography, color and spacing principles; distinctive product-specific visual moments where appropriate; responsive and accessibility constraints; and risks requiring verification.

## Completion checklist

- [ ] Direction is tied to the product and audience.
- [ ] Visual choices have clear roles and rationale.
- [ ] Tokens are reusable and semantic.
- [ ] Content hierarchy is clear.
- [ ] Mobile and desktop layouts are considered.
- [ ] Focus, contrast and reduced motion are addressed.
- [ ] No unsupported brand or product claims are introduced.
