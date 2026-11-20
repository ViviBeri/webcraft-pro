# WebCraft Pro — Capability Audit

This document evaluates potential enhancements informed by Eva Icons, Lucide Animated, Middleman, and Transitions.dev.

No new dependencies or third-party code will be added until the capability review and license checks are complete.

## 1. Existing Capabilities

The initial comparison snapshot identified 43 canonical skill directories, an eight-stage architecture, a shared motion standard and a motion examples directory. The current canonical inventory is 44 skills; the historical count in this audit is not the current project count.

### Motion and interaction

- [x] Review `skills/motion-design-systems/SKILL.md`.
- [x] Review `skills/accessible-motion/SKILL.md`.
- [x] Review `skills/animation-performance/SKILL.md`.
- [x] Review `skills/gsap-fundamentals/SKILL.md`.
- [x] Review `skills/scrolltrigger-experiences/SKILL.md`.
- [x] Review `standards/motion-engineering.md` and `examples/motion/README.md`.
- [x] Compare existing motion guidance against Transitions.dev patterns.

### Icons and assets

- [x] Review icon and favicon guidance in `skills/document-head-seo/SKILL.md`.
- [x] Review `skills/image-asset-optimization/SKILL.md`.
- [x] Review accessible naming and component guidance in `skills/semantic-accessibility/SKILL.md` and `skills/accessible-components/SKILL.md`.
- [x] Inspect repository paths for standalone SVG/icon examples and dedicated icon skills.
- [x] Evaluate whether a dedicated icon engineering skill is justified.
- [x] Evaluate animated icon patterns without introducing a mandatory React dependency.

### Build architecture

- [x] Review `stages/01-foundation/README.md`.
- [x] Review the existing Node.js installer and validation workflow.
- [x] Confirm that portable skills remain framework-agnostic.
- [x] Review existing build, preview, asset-pipeline and release guidance for this comparison.

## 2. Evidence-Based Gap Analysis

| Proposed Idea | Current State | Finding / Action |
|---|---|---|
| Motion tokens | `motion-design-systems`, `modern-css` and `standards/motion-engineering.md` already define semantic motion tokens and governance. | Covered. Do not create another motion-token or motion-design skill. |
| Reusable CSS transitions | `examples/motion/README.md` has one basic CSS state-transition example; the motion skill describes patterns but does not provide a broader CSS recipe set. | Partial gap. Add a small number of original, framework-neutral examples for disclosure/dropdown and state transitions to the existing motion examples file if needed. |
| Dropdown/menu motion | `accessible-components` and `keyboard-focus` define semantics, keyboard behavior and focus lifecycle. Motion guidance covers interruption and focus safety, but there is no focused CSS example combining these concerns. | Partial gap. Any example must preserve the correct widget pattern; do not apply ARIA menu roles to ordinary site navigation. Keep state and keyboard behavior independent of animation. |
| Icon swap / animated icons | No dedicated icon-animation skill or icon transition example was found. Existing motion and accessibility skills cover the general principles. | No new dependency or React-specific skill justified. A small CSS example can be added to the existing motion examples only if it includes semantic state, non-animated fallback and reduced-motion behavior. |
| Static SVG/icon engineering | No dedicated icon/SVG skill or standalone SVG example was found in the repository tree. Existing coverage is limited to favicon/application-icon metadata, asset delivery and accessible names for icon-only controls. | Demonstrated gap. Consider a focused, framework-neutral icon-engineering skill covering SVG semantics, accessible naming, decorative hiding, sizing, `currentColor`, viewBox, asset choice and verification. Do not add an icon package by default. |
| Reduced-motion behavior | `accessible-motion`, `motion-design-systems` and the motion standard provide substantial coverage. | Covered. Preserve and reuse existing guidance. |
| Animation performance and lifecycle | `animation-performance`, `gsap-fundamentals`, `scrolltrigger-experiences` and the motion standard cover profiling, cleanup, interruption and responsive behavior. | Covered. No additional performance skill required. |
| Build architecture (Middleman) | The project has a Node.js installer, validation workflow and eight-stage documentation structure. Middleman is a Ruby static-site generator and does not match the repository's toolchain. | No build-system migration or Ruby dependency justified. Revisit only if a concrete static-site build requirement appears. |

## 3. Transitions.dev Comparison

Reviewed the upstream README, license, dropdown example and icon-swap example:

- Its useful transferable ideas are small semantic CSS custom properties, namespaced component classes, explicit open/close states, and reduced-motion guards.
- The dropdown example demonstrates origin-aware transform behavior and distinct enter/exit timing. WebCraft Pro already covers the accessibility and interaction contract in separate skills; the missing piece is a concise integrated CSS example.
- The icon-swap example demonstrates a CSS-only visual transition between two icon states. WebCraft Pro has no equivalent example, but the existing component and semantic-accessibility skills should own the state and accessible name.
- The upstream dropdown sample uses `role="menu"` and menuitem buttons. Do not copy this markup into ordinary site navigation; use the WAI-ARIA menu pattern only for a genuine application menu with its required keyboard behavior.
- The upstream examples include reduced-motion guards, but their presence alone does not establish full accessibility or correct focus/state behavior. WebCraft Pro's existing standards remain the acceptance baseline.

**License boundary:** Transitions.dev's repository license distinguishes the transition/skill collection from its MIT-licensed tooling. It permits use and modification in personal and commercial projects but prohibits redistributing the collection or a substantial part as a competing transition library or kit. Do not import its transition library, copy its snippets wholesale, or package a competing collection. Write original examples and retain this reference for design research only. Review the upstream terms again before any future reuse.

Reference: [Transitions.dev](https://github.com/Jakubantalik/transitions.dev).

## 4. Icon and Asset Decision

- Eva Icons and Lucide Animated remain optional research references, not runtime requirements.
- No evidence justifies adding an icon font, icon component package, React dependency or animation library.
- A dedicated icon-engineering skill is justified by the absence of SVG-specific authoring and review guidance across the current skill set.
- Keep the skill framework-neutral and focused on selecting, authoring, exposing and validating icons; do not duplicate general accessibility or asset-performance standards.
- Verify the applicable license and asset terms before distributing any third-party icon artwork. A source repository's code license must not be assumed to cover separately licensed assets.

## 5. Build Architecture Decision

- Retain the current Node.js-based installer and validation architecture.
- Do not introduce Middleman, Ruby, a new static-site generator or a build dependency based only on architectural comparison.
- Add build/preview guidance only when a concrete gap in the current repository workflow is demonstrated.

## 6. Implementation Rules

- [x] Preserve WebCraft Pro's framework-agnostic identity.
- [x] Keep canonical skills under `skills/<name>/SKILL.md`.
- [x] Do not duplicate existing motion-token, reduced-motion or animation-performance capabilities.
- [x] Do not copy third-party repositories or substantial code wholesale.
- [x] Review license boundaries before reuse.
- [x] Avoid unnecessary runtime and development dependencies.
- [x] Keep icon state and accessible semantics independent of decorative animation.
- [x] Preserve keyboard operation, focus stability and non-animated fallbacks.
- [ ] If the icon-engineering skill is implemented, update the canonical skill index and relevant stage documentation.
- [ ] If motion examples are extended, update only `examples/motion/README.md`.
- [ ] Run repository validation after any implementation changes.

## 7. Final Audit Decision

1. **Do not create `skills/motion-design.md` or another motion-token skill.** Existing motion architecture is sufficiently established.
2. **Do not add dependencies.** The comparison identifies documentation/example gaps, not a package requirement.
3. **Prioritize a dedicated `icon-engineering` skill** as the only new skill justified by the current evidence.
4. **Improve the existing motion examples** with original CSS-only state-transition examples rather than importing Transitions.dev's library or creating a duplicate skill.
5. **Keep Eva Icons, Lucide Animated and Middleman as optional references only.**

## 8. Audit Status

**Status:** Capability comparison complete. Evidence-based gaps and implementation decisions recorded.

**Dependencies:** None approved or added.

**Files changed in this audit update:** `docs/capability-audit.md` only.

**Validation:** Repository content was inspected through GitHub. No code, skill metadata, installer or workflow behavior changed in this documentation-only audit update; the repository validation workflow has not been run as part of this review.

**Next acceptance gate:** Implement the focused icon-engineering skill and add the selected motion examples, then update indexes and run the repository validation workflow.
