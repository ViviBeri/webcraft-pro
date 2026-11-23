---
name: design-direction
description: Develop a distinctive, coherent visual direction for a website or web application. Use when planning a new interface, defining a design system, selecting typography and color, translating a brand brief into UI, or correcting an inconsistent visual language.
---

# Design Direction

## Objective

Translate the product, audience, brand, content and constraints into a deliberate visual system before implementation. Produce a design direction that is distinctive, usable, accessible and feasible for the chosen technology.

## Step 0: Verify Facts

Before designing for a specific brand, SDK, or event, use search to verify current facts. Do not hallucinate product specs. If you catch yourself saying "I think X is...", stop and search.

- Prefer authoritative, current sources such as official product documentation, release notes, brand guidance and event pages.
- Verify names, capabilities, version-specific behavior, dates, pricing, availability and brand claims before using them.
- Distinguish verified facts from user-provided claims, assumptions and creative recommendations.
- Record source links and the date checked for facts that materially shape the design.
- If a fact cannot be verified, omit it or label it clearly as unverified; ask the user when it affects a consequential design decision.

## Design asset research

Before finalizing the design direction, consult [Design Asset Directory](../../examples/design/design-assets-directory.md).

- Select actual, project-appropriate font families, color values, illustrations/icons and imagery, or identify concrete references to guide their creation.
- Record exact asset names, source URLs, intended use, font weights, color values and the proposed loading/self-hosting approach.
- Check current license, attribution and commercial-use terms for each selected asset; do not infer usage rights from a directory listing.
- Avoid generic placeholder copy and default system fonts. Use verified project content, or clearly labeled contextual draft copy pending user confirmation.
- Add an **Asset selections** subsection to the design-direction deliverables. Explicitly mark unknown or unselected assets rather than inventing filenames, URLs or availability.

### Workflow

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

## Two-Pass Design Workflow

### Pass 1: Design Plan and critique

Before writing code, create a concise **Design Plan** grounded in the user's brief. Include:

- **Typography:** selected typefaces or appropriate font categories, roles, hierarchy, weights and readable line lengths.
- **Palette:** named color roles and concrete values, including a contrast strategy.
- **Layout:** page composition, grid, spacing rhythm, content hierarchy and responsive behavior.
- **Distinctive decisions:** the product-specific visual idea and why it fits the audience and primary task.
- **Motion and accessibility:** intended interaction motion, keyboard focus, reduced-motion behavior and other relevant constraints.

Critique the plan against the actual brief before implementation:

- Check whether every major choice is justified by the product, audience, content and user task.
- Challenge predictable defaults and choices that could be reused unchanged for an unrelated product.
- If the plan feels generic, revise the typography, palette, composition or focal idea and explain what changed.
- Remove decorative choices that do not improve comprehension, identity, hierarchy or interaction.
- Present the revised plan for the user's review and follow the human confirmation gate below. Do not begin implementation before explicit approval.

### Pass 2: Implement and self-critique

After the user approves the Design Plan, implement it within the existing project architecture and constraints. Then perform a **Self-Critique** before presenting the result:

- Compare the implementation with the approved plan and the original brief; identify and correct meaningful drift.
- Remove unnecessary decoration, redundant effects and visual elements without a clear purpose.
- Check that typography, palette, spacing and hierarchy remain coherent across the complete experience.
- Verify responsive behavior, semantic structure, readable contrast, visible keyboard focus and reduced-motion support.
- Test key interactions and ensure controls communicate and perform their intended actions.
- Report any checks that could not be performed; never claim unverified results.

The self-critique is a required implementation pass, not a substitute for the separate visual-design-review skill or user approval of material design changes.

### 7. Human confirmation gate

Present the design direction, design tokens, page/component hierarchy, responsive behavior and accessibility constraints for user review. Ask for explicit confirmation before implementation.

- Do not write component code, scaffold UI components or begin implementation until the user clearly approves the proposed direction.
- If the user requests revisions, update the direction and present the revised decisions for confirmation.
- Silence, an ambiguous response, or a request for feedback is not approval.
- After confirmation, preserve the approved direction as the implementation baseline. Escalate material changes to the user rather than silently changing the approved design.

This gate applies even when the initial request mentions implementation: planning and presenting the direction may proceed, but component implementation waits for confirmation.

## Common AI failure mode

### Anti-pattern

The agent produces a polished but interchangeable visual direction — familiar gradients, centered hero, repeated card grids, fashionable type — with no product-specific rationale behind those choices.

### Symptoms

- The direction could be reused unchanged for an unrelated product.
- Visual references are copied as layouts rather than translated into product-specific principles.
- Type, color, and composition follow trend appeal rather than content hierarchy and user tasks.
- The Design Plan describes aesthetics but cannot justify them against audience, brand, or primary action.

### Why it matters

An interchangeable direction survives review but fails in market: users cannot distinguish the product from its competitors, the design does not reinforce the primary action, and the rework lands late — after implementation has begun — when changing direction is most expensive.

### Correction

Return to the verified product facts, audience, content, and primary task. State the visual concept in product-specific terms, then justify typography, palette, composition, imagery, and motion against that context. Challenge any decision that would transfer unchanged to an unrelated product. Mark unsupported assumptions explicitly or replace them with questions. Apply the existing [human confirmation gate](#7-human-confirmation-gate) before implementation.

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
7. **Asset selections** — exact fonts and weights, color palette values, illustration/icon/image sources, intended placements, loading approach and license/attribution checks.

When implementation is requested, first complete the design-direction deliverables and obtain explicit user confirmation. Only then implement the approved direction in the existing project.

## Design calibration and decision record

When comparing directions, record three qualitative dials: composition variance (conservative to experimental), visual density (spacious to information-rich), and motion intensity (static to expressive). These are discussion aids, not universal numeric standards. Explain each choice in product context; never let novelty or motion override clarity and accessibility.

Before implementation, record the product, audience and primary task; confirmed brand constraints and assumptions; one-sentence art direction; composition, density and motion choices with rationale; typography, color and spacing principles; distinctive product-specific visual moments where appropriate; responsive and accessibility constraints; and risks requiring verification.

A good direction should be explainable in plain language and traceable to product needs.

## Completion checklist

- [ ] Direction is tied to the product and audience.
- [ ] Visual choices have clear roles and rationale.
- [ ] Tokens are reusable and semantic.
- [ ] Content hierarchy is clear.
- [ ] Mobile and desktop layouts are considered.
- [ ] Focus, contrast and reduced motion are addressed.
- [ ] No unsupported brand or product claims are introduced.
- [ ] Material brand, SDK and event facts have current supporting sources.
- [ ] The user explicitly confirmed the design direction before component implementation.
