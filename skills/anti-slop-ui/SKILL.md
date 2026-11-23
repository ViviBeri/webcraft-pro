---
name: anti-slop-ui
description: Audit and improve generic, repetitive or obviously template-generated web interfaces. Use when a page feels bland, interchangeable, over-decorated, visually inconsistent, or when an AI-generated UI needs a more intentional and product-specific design.
---

# Anti-Slop UI

## Objective

Replace generic interface decisions with purposeful design choices grounded in the product, audience, content and user task. Do not equate originality with visual noise.

## Audit before changing code

Inspect the actual page and relevant source files. Identify specific issues in:

- Brand and product specificity.
- Visual hierarchy and page composition.
- Typography, spacing and content density.
- Color roles and contrast.
- Repeated card and section patterns.
- Image and icon relevance.
- Copy quality and information value.
- Responsive behavior and interaction states.

Describe the problem with evidence from the page. Avoid vague feedback such as "make it modern" or "add wow factor."

## Common AI failure mode

**Anti-pattern:** The agent produces a visually polished interface with no product-specific rationale — familiar gradients, uniform card grids, stock typography, and copy that could describe any company in the category — without checking whether those choices serve this product, audience, or task.

**Symptoms:**
- Every section uses the same centered heading and three-card grid, regardless of content hierarchy.
- Decorative gradients, glows, blobs, or glass panels have no functional role.
- Typography relies on one oversized heading style everywhere.
- Placeholder copy could describe any company in the category.
- Repeated rounded containers create visual nesting without information gain.
- Icons replace labels or meaningful content.
- Large empty areas conceal a weak hierarchy.
- Animation delays reading or interaction instead of supporting it.
- Mobile layouts stack desktop cards without reprioritizing content.

**Why it matters:** Generic interfaces survive review but fail in market: users cannot distinguish the product from its competitors, the primary action competes with decoration for attention, and any design investment in the page produces no differentiation. The failure is not "the UI looks plain" — it is "the UI could be swapped for a competitor's without anyone noticing."

**Correction:** Establish the real offering, audience, differentiator, and primary action from supplied facts, then apply the existing *Improvement workflow* section rather than restating it here. As you differentiate, do not over-correct by stripping familiar patterns that serve clarity — keep what serves the task, change what does not, and verify the before/after at matching viewport sizes. Do not invent proof points, customer logos, awards, metrics, or testimonials.

## Improvement workflow

### 1. Establish the product truth

Identify the actual offering, user, problem, differentiator and desired action. Use supplied content and existing product behavior. Do not invent proof points, customer logos, awards, metrics or testimonials.

### 2. Choose a stronger composition

Create hierarchy using a deliberate combination of:

- Asymmetric or balanced grids where appropriate.
- Editorial typography and readable line lengths.
- Meaningful image placement and cropping.
- Section rhythm and controlled density.
- Clear primary and secondary actions.
- Product-specific content and interface examples.

A distinctive layout must remain usable and understandable.

### 3. Remove decoration without purpose

For every decorative element, ask whether it improves hierarchy, brand recognition, comprehension, feedback or orientation. Remove or simplify elements that do none of these.

Use gradients, shadows, borders, radii and motion as a coherent system rather than independent effects.

### 4. Improve content

Replace generic headings and filler text with precise language based on known product facts. Make headings communicate the section's value. Make actions describe the next step.

If information is missing, use clearly identified neutral placeholders or request the missing content. Never fabricate credibility.

### 5. Rework responsive behavior

At mobile widths, reconsider ordering, navigation, image crop, text scale, controls and content density. Do not simply shrink desktop typography or squeeze columns.

### 6. Verify the result

Compare before and after at the same viewport sizes. Test real interactions, keyboard navigation, focus visibility, contrast and reduced motion. Confirm that the design remains coherent across the full page.

## Guardrails

- Do not chase novelty at the expense of usability.
- Do not add animation to compensate for weak content.
- Do not use arbitrary visual trends as a substitute for product understanding.
- Do not remove accessible labels or visible focus states for aesthetics.
- Do not rewrite working architecture unnecessarily.
- Preserve existing functionality unless a change is explicitly required.

## Output

Provide a concise audit with:

1. Observed issue.
2. Why it weakens the experience.
3. Recommended change.
4. Files or components affected.
5. Verification performed.

Then implement the highest-impact improvements when implementation is requested.

## Ordered audit and refinement passes

Work across the whole interface in deliberate passes. Do not change every property at once.

1. **Product identity:** confirm that the page reflects the actual product and audience.
2. **Composition and hierarchy:** correct page structure, alignment, whitespace and reading order.
3. **Spacing and density:** normalize rhythm and remove accidental gaps or crowding.
4. **Color and contrast:** assign colors semantic roles and remove competing accents.
5. **Typography:** correct hierarchy, measure, line-height and font usage.
6. **Content and iconography:** replace generic copy and irrelevant symbols with meaningful labels and product-specific content.
7. **Imagery and detail:** improve crop, subject, surface, borders and depth where these add value.
8. **Motion:** refine transitions last, and only when they clarify state or orientation.

Preserve working content, routes and behavior unless the requested redesign requires a change. Reassess the full page after each major pass.

Choose one or two intentional focal moments when the page benefits from them. A focal moment may be a real product preview, data visualization, image, typography treatment or meaningful interaction. Do not force hero illustration onto dashboards and utility interfaces. Gradients, centered layouts, cards, badges and shadows are valid when their role is clear and the overall system is coherent.

## Completion checklist

- [ ] The interface communicates this product, not any product.
- [ ] Every major section has a clear purpose.
- [ ] Repeated patterns are intentional.
- [ ] Decorative effects have a reason to exist.
- [ ] Copy is specific and truthful.
- [ ] Mobile composition is deliberate.
- [ ] Accessibility and interactions remain intact.
