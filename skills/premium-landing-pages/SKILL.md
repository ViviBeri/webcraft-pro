---
name: premium-landing-pages
description: Plan, design, implement and refine high-quality marketing and product landing pages. Use when creating a SaaS, business, agency, portfolio, product launch or campaign page that needs clear positioning, strong content hierarchy, responsive UI and measurable calls to action.
---

# Premium Landing Pages

## Objective

Build a landing page that communicates a real offer clearly, earns trust through relevant evidence and helps visitors take an appropriate next step. Visual quality must support comprehension and conversion rather than compete with them.

## Step 0: Verify Facts

Before designing for a specific brand, SDK, or event, use search to verify current facts. Do not hallucinate product specs. If you catch yourself saying "I think X is...", stop and search.

- Prefer authoritative, current sources such as official product documentation, release notes, brand guidance and event pages.
- Verify names, capabilities, version-specific behavior, dates, pricing, availability and brand claims before using them in page copy or visuals.
- Distinguish verified facts from user-provided claims, assumptions and editorial positioning.
- Record source links and the date checked for material claims.
- If a fact cannot be verified, omit it or mark it for owner confirmation. Never turn uncertainty into a testimonial, metric, customer logo, certification, award, guarantee or product promise.

## 1. Inspect the project

Before implementation:

- Identify the framework, build system, styling approach and existing components.
- Review current routes, navigation, assets and design conventions.
- Check whether analytics, forms, consent handling or a CMS already exist.
- Preserve established architecture unless there is a concrete reason to change it.
- Identify build, test and deployment commands from project files.

Do not replace the stack or introduce dependencies without justification.

## 2. Define the page strategy

Establish:

- Target audience and visitor intent.
- The problem the offer solves.
- The product or service and its differentiator.
- Primary conversion action.
- Secondary action, if useful.
- Evidence available to support claims.
- Likely objections and the information needed to resolve them.

If the brief lacks key facts, make assumptions explicit. Never invent results, customer counts, certifications, reviews, pricing or guarantees.

## 3. Build the information architecture

Select only sections that serve the visitor's decision. A useful sequence may include:

1. Navigation with a clear route to the primary action.
2. Hero with a specific value proposition and relevant visual.
3. Proof or credibility using verified evidence.
4. Problem and solution explanation.
5. Product, service or process details.
6. Benefits tied to concrete outcomes.
7. Relevant examples, use cases or portfolio work.
8. Pricing or engagement details when supplied.
9. FAQs that resolve real objections.
10. Final call to action and complete footer.

Do not force every page into this exact sequence. Remove sections that add no decision value.

## 4. Write useful copy

- Lead with the visitor's problem or desired outcome.
- Explain what is offered and who it is for.
- Use concrete language instead of generic superlatives.
- Make headings meaningful when scanned independently.
- Keep calls to action specific and consistent.
- Explain form expectations and what happens after submission.
- Use real content lengths during layout work.

Do not use fake testimonials, logos, counters, awards, urgency or scarcity.

## 5. Implement the visual system

Use the design-direction skill when a visual system has not been established.

Build semantic, reusable components. Keep typography, spacing, colors, widths and interaction states consistent. Use real product imagery or supplied assets. Optimize image formats, dimensions and loading behavior.

Avoid generic repeated card grids and decorative effects without a clear purpose.

## 6. Implement conversion paths

For each action:

- Use a semantic link for navigation and a button for an in-page action.
- Ensure the destination or handler works.
- Validate forms on both client and server when applicable.
- Provide clear labels, instructions and error messages.
- Preserve entered values after recoverable errors.
- Show a clear success state.
- Avoid collecting unnecessary personal data.
- Do not expose API keys or secrets in browser code.

If analytics are requested, use the project's existing consent and privacy approach. Do not silently add tracking.

## 7. Responsive and accessible implementation

Test the actual page at narrow mobile, tablet, laptop and wide desktop sizes.

Check semantic landmarks, heading order, keyboard operation, focus visibility, form labels, image alternatives, contrast, zoom and reduced motion. Ensure sticky elements do not obscure content or focus targets.

## 8. Performance and search readiness

- Reserve image dimensions to prevent layout shifts.
- Use responsive images and modern formats where supported.
- Lazy-load below-the-fold media where appropriate.
- Avoid unnecessary client-side JavaScript.
- Load fonts efficiently and provide fallback stacks.
- Set a unique title and useful meta description.
- Use canonical URLs and social metadata only when the correct URL and assets are known.
- Add structured data only when accurate and applicable.
- Avoid keyword stuffing.

## 9. Verify before delivery

Run the project's existing lint, typecheck, tests and production build. If browser tooling is available, test links, forms, navigation and responsive layouts in a real browser.

Report what was actually tested and identify any remaining limitations. Do not claim Lighthouse, accessibility or browser test results without running them.

## Deliverables

When asked to create a page, deliver working implementation and summarize:

- Page strategy and section hierarchy.
- Main components and changed files.
- Responsive and accessibility decisions.
- Functional conversion paths.
- Commands and browser checks completed.
- Known gaps requiring real business content or credentials.

## Visitor decision journey

Before choosing sections, describe the visitor's decision in four to seven meaningful beats. For each beat, record what the visitor currently knows or believes, what uncertainty remains, what evidence resolves it, and what the next useful action becomes.

Use the journey to determine section order. Remove sections that add no useful information or decision support. A common pattern is problem recognition, solution explanation, proof, practical detail, objection resolution and commitment, but do not force every page into this sequence.

Identify one primary action and use consistent wording for it. Secondary actions must not compete with the primary task.

## Evidence and content integrity

Classify page content as verified product facts, independently verified public facts with source and date, editorial explanation, or placeholder content awaiting owner approval. Never convert an assumption into a testimonial, metric, customer logo, certification, award, guarantee, pricing statement or performance claim. Do not publish placeholder credibility elements.

## Completion checklist

- [ ] Offer and audience are immediately understandable.
- [ ] Primary action is clear and functional.
- [ ] Claims are supported by supplied facts or current sources.
- [ ] Page sections serve the visitor's decision.
- [ ] Layout works on mobile and desktop.
- [ ] Forms and navigation work.
- [ ] Accessibility basics are verified.
- [ ] Images, fonts and scripts are optimized.
- [ ] Metadata is accurate.
- [ ] Build and relevant tests pass.

## Common AI failure mode

**Failure:** An agent fills gaps in a landing-page brief with invented testimonials, customer logos, metrics, certifications, guarantees, pricing, or product capabilities.

**Why it matters:** Unsupported credibility claims mislead visitors and create legal/reputational exposure; visual polish does not make fabricated evidence acceptable.

**Symptoms:**
- Placeholder testimonials/logos appear real
- metrics and awards lack sources
- unsupported features/pricing are promised
- CTAs/forms imply unimplemented conversion paths.

**Prevention:** Separate confirmed facts, verified claims with source/date, editorial explanation, and placeholders awaiting approval. Use only supported proof, omit unsupported credibility elements, verify CTAs/forms/routes, and require owner approval for commercial claims.

