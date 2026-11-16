# Stage 4 — Motion and GSAP

## Purpose

Use motion to communicate state, guide attention and support narrative without compromising input, accessibility, performance or browser behavior.

## Canonical assets

- [GSAP fundamentals](../../skills/gsap-fundamentals/SKILL.md)
- [ScrollTrigger experiences](../../skills/scrolltrigger-experiences/SKILL.md)
- [Motion design systems](../../skills/motion-design-systems/SKILL.md)
- [Accessible motion](../../skills/accessible-motion/SKILL.md)
- [Animation performance](../../skills/animation-performance/SKILL.md)
- [Interactive storytelling](../../skills/interactive-storytelling/SKILL.md)
- [Motion engineering standard](../../standards/motion-engineering.md)
- [Motion examples](../../examples/motion/README.md)

## Authoritative documentation

- [GSAP documentation](https://gsap.com/docs/v3/)
- [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia/)
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

## Cross-stage boundaries

- Stage 3 owns component architecture and responsive layout. Motion must respect those boundaries and cannot hide content or break reflow.
- Stage 5 owns detailed WCAG and assistive-technology evaluation. This stage implements reduced-motion alternatives and applicable controls for automatic movement.
- Stage 7 owns performance budgets and Core Web Vitals. This stage supplies measured animation traces and lifecycle evidence.
- Stage 8 owns repeatable browser automation. This stage defines motion states and scroll paths that must be tested.

## Acceptance record

- [x] Guidance distinguishes CSS motion from GSAP orchestration.
- [x] Timelines, contexts and ScrollTriggers have explicit ownership and cleanup.
- [x] GSAP matchMedia lifecycle behavior is described without redundant context nesting.
- [x] Responsive and reduced-motion alternatives preserve the complete content.
- [x] Scroll behavior preserves native scrolling, browser history and focus access.
- [x] Performance guidance requires measurement and avoids compositor/GPU assumptions.
- [x] Examples use current GSAP APIs and identify lifecycle teardown requirements.

## Verification boundary

Repository metadata and stage structure are checked by CI. Examples are reviewed against current official GSAP documentation. This repository has no consumer web application, so no live animation, device performance or browser interaction test is claimed here.
