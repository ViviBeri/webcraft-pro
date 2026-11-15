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

## Common symptoms to investigate

These are warning signs, not automatic violations:

- Every section uses the same centered heading and three-card grid.
- Decorative gradients, glows, blobs or glass panels have no functional role.
- Typography relies on one oversized heading style everywhere.
- Generic placeholder copy could describe any company.
- Repeated rounded containers create excessive visual nesting.
- Icons are used where clear labels or real content would be better.
- Large empty areas conceal a weak information hierarchy.
- Animations distract from reading or delay interaction.
- Mobile layouts merely stack desktop cards without rethinking priority.

Do not remove a pattern simply because it is common. Retain it when it is the clearest solution for the task.

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

## Completion checklist

- [ ] The interface communicates this product, not any product.
- [ ] Every major section has a clear purpose.
- [ ] Repeated patterns are intentional.
- [ ] Decorative effects have a reason to exist.
- [ ] Copy is specific and truthful.
- [ ] Mobile composition is deliberate.
- [ ] Accessibility and interactions remain intact.
