# Stage 3 — Frontend Engineering

## Purpose

Translate requirements into maintainable frontend architecture, reusable components, responsive layouts, modern CSS and safe form behavior.

## Canonical skills

- [Frontend architecture](../../skills/frontend-architecture/SKILL.md) — state ownership, routing, rendering boundaries and incremental decisions.
- [Component engineering](../../skills/component-engineering/SKILL.md) — typed contracts, composition, state matrices and behavior tests.
- [Responsive engineering](../../skills/responsive-engineering/SKILL.md) — content-driven layouts, zoom, reflow, touch and stress testing.
- [Modern CSS](../../skills/modern-css/SKILL.md) — cascade strategy, semantic tokens, progressive enhancement and user preferences.
- [Forms and validation](../../skills/forms-and-validation/SKILL.md) — native semantics, accessible feedback and server-authoritative validation.
- [Document head and SEO](../../skills/document-head-seo/SKILL.md) — valid head structure, essential metadata, social previews, canonical URLs, icons and resource hints.\n- [Icon engineering](../../skills/icon-engineering/SKILL.md) — SVG authoring, accessible icon treatment, CSS states, asset provenance and verification.
- [Frontend engineering standard](../../standards/frontend-engineering.md)

## Recommended reference

- [HEAD](https://github.com/joshbuchea/HEAD) — comprehensive `<head>` element catalog and recommended ordering. Use with the WHATWG HTML standard for normative validity.
- [30 seconds of code](https://github.com/Chalarangelo/30-seconds-of-code) — supplementary frontend snippet research; verify current APIs and follow CC-BY-4.0 attribution requirements when reusing code.

## Practical examples

- [Example index](../../examples/frontend/README.md)
- [Architecture decision record](../../examples/frontend/architecture-decision-record.md)
- [Component contract matrix](../../examples/frontend/component-contract-matrix.md)
- [Responsive verification matrix](../../examples/frontend/responsive-verification-matrix.md)
- [Accessible form pattern](../../examples/frontend/accessible-form-pattern.md)

## Cross-stage boundaries

- Stage 5 owns detailed WCAG evaluation, assistive-technology testing and complex widget patterns. This stage requires semantic foundations and keyboard behavior in every component.
- Stage 6 owns threat modeling and security verification. This stage treats client input as untrusted and requires server-side authorization and validation.
- Stage 7 owns measurement, Core Web Vitals and performance budgets. This stage avoids architectural and CSS decisions that create unnecessary rendering or bundle costs.
- Stage 8 owns browser automation and release evidence. This stage defines the user-visible behaviors and responsive conditions that automation should verify.

## Acceptance record

- [x] Guidance begins with repository inspection and preserves the existing stack.
- [x] Architecture decisions include state ownership, boundaries, trade-offs and incremental migration.
- [x] Component guidance covers typed contracts, state matrices, semantics and behavior tests.
- [x] Responsive guidance covers narrow reflow, zoom, touch, overlays and content stress.
- [x] CSS guidance covers cascade layers, logical properties, feature fallbacks and user preferences.
- [x] Forms use native semantics, accessible error recovery and server-authoritative validation.
- [x] Examples are explicitly illustrative and include reusable decision and verification templates.

## Verification boundary

Repository structure and Markdown content are checked by the repository validator. This skills repository has no consumer frontend application, so no real browser rendering, responsive device run or assistive-technology test is claimed here. Apply the example matrix to each consuming project.
