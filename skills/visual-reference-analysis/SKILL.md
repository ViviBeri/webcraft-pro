---
name: visual-reference-analysis
description: Analyze supplied screenshots, design references, competitor pages or visual examples and translate useful observations into an original web interface direction. Use when a user provides reference images, asks to match a visual style, compares design options, or wants to extract layout, typography, color and interaction principles without copying another product.
---

# Visual Reference Analysis

## Objective

Turn visual references into explicit, reusable design decisions while preserving the user's product identity and avoiding direct imitation. Treat references as evidence of visual techniques, not as specifications to copy.

## 1. Confirm the reference and intended use

Identify each supplied reference and its role:

- Visual mood or art direction.
- Layout or information hierarchy.
- Typography or color.
- Component behavior.
- Image treatment.
- Interaction or motion.
- Responsive composition.

Record whether the reference is a screenshot, live page, design file or written description. Do not claim to have inspected a live interaction from a static image.

## 2. Observe before interpreting

Describe visible facts separately from assumptions.

Inspect:

- Page regions and content order.
- Alignment, grid, spacing and density.
- Type scale, weight, line length and hierarchy.
- Color roles and contrast relationships.
- Image subject, crop, scale and placement.
- Borders, surfaces, depth and decorative treatment.
- Navigation, actions and visible states.
- Viewport dimensions and any responsive evidence.

Do not infer hidden breakpoints, animation behavior or component implementation from a single screenshot.

## 3. Extract design principles

For each useful observation, state:

1. What is visible.
2. What experience it creates.
3. Why it may suit the target product.
4. What should be adapted rather than copied.
5. What risks or accessibility constraints apply.

Look for a small number of coherent principles. Avoid turning every visible detail into a requirement.

## 4. Build an original translation

Map the extracted principles to the target product's:

- Audience and primary task.
- Brand personality and existing assets.
- Content hierarchy and real information.
- Technology and maintenance constraints.
- Accessibility and responsive requirements.

Create a new composition, token system and component plan. Do not reproduce proprietary copy, logos, illustrations, photography or a distinctive page layout unless the user owns the assets or has permission.

## 5. Resolve conflicting references

When references disagree, prioritize in this order:

1. User's explicit requirements and brand constraints.
2. User task, content clarity and accessibility.
3. Product-specific identity.
4. Technical feasibility and maintainability.
5. Secondary aesthetic preferences.

Explain material trade-offs instead of blending incompatible styles into an incoherent compromise.

## 6. Verify the translation

Compare the implemented result with the extracted principles, not by pixel-copying the source. Check the complete page, real content, mobile composition, keyboard behavior, focus visibility, contrast and reduced motion.

If only screenshots are available, state which behaviors remain unverified.

## Output

Return a reference matrix with observation, inferred principle, proposed adaptation and risk. Follow it with a concise art direction and component/token plan.

## Completion checklist

- [ ] Reference types and evidence limits are recorded.
- [ ] Visible facts are separated from interpretation.
- [ ] Principles are tied to the target product and user task.
- [ ] Conflicting references are resolved explicitly.
- [ ] No unlicensed assets or distinctive content are copied.
- [ ] Responsive and accessibility constraints are included.
- [ ] Verification claims match the evidence actually available.

## Common AI failure mode

**Failure:** An agent treats a static screenshot or competitor page as a complete specification and copies distinctive layout/assets/behavior without separating observations from assumptions or checking ownership.

**Why it matters:** The result can reproduce wrong product decisions, claim unobserved interactions, or create IP and brand-confusion risks; one viewport cannot establish responsive rules or hidden states.

**Symptoms:**
- Analysis invents animation/breakpoints
- unlicensed copy/logos/artwork are copied
- every detail becomes a requirement regardless of user task
- adaptations lack traceability to observations.

**Prevention:** Identify reference type and intended role. Separate visible facts from interpretation and state evidence limits. Extract principles tied to audience, task, brand, and constraints; create an original composition with owned/licensed assets and mark unobserved behavior unverified.

