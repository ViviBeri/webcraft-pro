---
name: quickstart-onboarding
description: Run a lightweight three-question onboarding for a new website or redesign, then create a standards-aligned design-direction.md before implementation. Use when a user wants to start a web project quickly or needs an initial design direction.
---

# Quickstart Onboarding

## Objective

Turn a small amount of user input into a useful, project-specific design direction without installing frameworks, UI libraries, animation packages or other dependencies. This skill is an onboarding and planning workflow; it does not implement the website.

## 1. Ask the three onboarding questions

Ask these questions together, clearly and without adding a long questionnaire:

1. **Audience and vibe:** Who is the target audience, and what should the experience feel like? Ask for a few descriptive words if the user is unsure.
2. **Preferred framework:** Which target should the project use: React, Vue, Astro or plain HTML?
3. **Motion preference:** Should motion be **minimal** or **animated**?

Accept concise or partial answers. If an answer is missing, ask only for that missing choice. Do not silently choose a framework or motion preference. If the user delegates a choice, state the assumption in the output.

## 2. Create `design-direction.md`

After collecting the answers, create `design-direction.md` in the project root. Use the repository's shared standards as the source of truth:

- `standards/design-quality.md` for product/audience fit, visual hierarchy, content quality, responsive behavior, accessibility, motion, performance and verification.
- `standards/motion-engineering.md` for motion purpose, progressive enhancement, reduced-motion behavior, performance and motion verification.
- `standards/frontend-engineering.md` when framework or implementation architecture decisions need to be recorded.

Use the existing `skills/design-direction/SKILL.md` workflow for the art direction, design tokens, page hierarchy and validation checklist. Do not invent brand assets, testimonials, metrics, product capabilities or other unsupported facts. Clearly separate confirmed input from assumptions and open questions.

The document should contain:

1. **Project snapshot** — audience, desired vibe, selected framework and motion preference.
2. **Design direction** — a concise art-direction statement and rationale tied to the audience and product purpose.
3. **Visual system** — typography, semantic color roles, spacing, layout, surfaces and imagery principles. Use proposed values only where useful; label assumptions.
4. **Page and component structure** — likely page regions, content hierarchy and primary user action, based on known requirements.
5. **Framework notes** — implementation considerations for the selected framework without imposing a new stack or package.
6. **Motion direction** — describe the intended behavior and boundaries for minimal or animated motion, including a usable non-animated/reduced-motion experience.
7. **Responsive and accessibility requirements** — semantic structure, keyboard operation, visible focus, contrast, touch usability and responsive reflow.
8. **Verification checklist** — concrete items to review during implementation, and any areas that remain unverified.

Do not fabricate project details to fill gaps. Use an explicit "Assumptions and open questions" subsection where the brief is incomplete.

## 3. Apply the motion choice

### Minimal

- Prefer static composition and native CSS for small state transitions.
- Avoid decorative scroll effects, autoplaying motion and unnecessary animation dependencies.
- Keep all essential content and controls available without animation.

### Animated

- Define the purpose of each proposed motion pattern: feedback, hierarchy, orientation or storytelling.
- Prefer CSS for simple transitions and use GSAP when orchestration or scroll-linked control justifies it.
- Honor `prefers-reduced-motion` and provide a meaningful reduced-motion alternative.
- Keep motion progressive enhancement; the page must remain usable if animation setup fails.

## 4. React + Animated guidance

When the user selects **React** and **animated**:

- Point them to `skills/gsap-fundamentals/SKILL.md` for scoped GSAP animation, component lifecycle cleanup, responsive behavior and verification.
- Mention that Framer Motion can optionally be used as a React-oriented motion layer/wrapper if the project benefits from it.
- Framer Motion is optional, not a requirement. Do not install it, add it to dependencies, scaffold with it or assume it is already present.
- Do not require Framer Motion to use GSAP. Choose the smallest tool that meets the interaction need and avoid overlapping animation systems without a clear reason.

For all other framework/motion combinations, keep the guidance aligned with the selected stack and shared standards. Do not recommend React-only libraries for Vue, Astro or plain HTML projects.

## 5. Human confirmation gate and handoff

After writing `design-direction.md`, stop before implementation:

- Summarize the proposed direction, key decisions, assumptions and unresolved questions.
- Link or point to the created file so the user can review it.
- Ask the user for explicit confirmation to proceed with the proposed design direction.
- Do not write component code, scaffold the interface, or add dependencies until the user confirms.
- If the user requests changes, update the direction document and ask for confirmation again.
- Treat silence, an ambiguous response, or a request to merely review the document as no approval.

This is a real workflow gate, not a status message. Continue only after an unambiguous user approval.

## Completion criteria

- [ ] The three onboarding questions have been answered or their assumptions are explicitly recorded.
- [ ] `design-direction.md` exists in the project root and follows the shared design standards.
- [ ] Framework and motion guidance match the user's selections.
- [ ] React + Animated users are pointed to GSAP Fundamentals and told Framer Motion is optional.
- [ ] No dependencies were installed and no application implementation was started before explicit user confirmation.
- [ ] The user was asked to confirm the design direction before any component code.
- [ ] Accessibility, reduced motion, responsive behavior and verification are addressed.
