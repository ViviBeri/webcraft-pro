---
name: scrolltrigger-experiences
description: Use when building scroll-linked storytelling, pinned sections, scrubbed timelines, reveal sequences or other GSAP ScrollTrigger interactions.
---

# ScrollTrigger Experiences

## Objective

Use scroll position to support narrative, orientation or meaningful feedback without taking control away from the visitor or making content difficult to access.

## Workflow

1. **Confirm scroll is the right interaction**
   - Identify what information or relationship is clarified by scroll-linked motion.
   - Prefer normal document flow for ordinary content and CSS scroll-driven features when they satisfy the requirement and browser support allows.
   - Avoid scroll hijacking, forced pacing and interactions that make reading dependent on precise scroll speed.
2. **Plan the document first**
   - Ensure all content is present and understandable without animation.
   - Establish section heights, reading order, pin duration and fallback layout before pinning.
   - Keep the page usable when JavaScript or the animation library fails.
   - Avoid pinning large content regions on small screens without a tested reason.
3. **Create triggers deliberately**
   - Register ScrollTrigger according to the installed GSAP version and project conventions.
   - Choose trigger, start and end values from the intended visual relationship.
   - Use scrub only when animation should track scroll progress; use toggle actions for discrete entrance or exit states.
   - Use function-based start/end values when layout dimensions change.
   - Use invalidateOnRefresh when animated values must be recalculated on refresh.
   - Enable markers during development to inspect trigger positions; remove or disable them in production.
4. **Handle responsive conditions**
   - Use gsap.matchMedia() for viewport and preference conditions.
   - Prefer simpler, unpinned behavior on narrow screens or touch-first layouts when pinning harms usability.
   - Do not use the deprecated ScrollTrigger.matchMedia() API in new work.
   - Revert and rebuild responsive setups when media conditions change.
5. **Protect page behavior**
   - Preserve native scrolling and browser history behavior.
   - Keep pinned content from covering navigation, focus targets or important page controls.
   - Account for sticky headers, dynamic content, font loading and images when calculating trigger positions.
   - Refresh measurements after meaningful layout changes rather than on every frame.
   - Avoid unnecessary global refresh calls and avoid creating duplicate triggers.
6. **Verify real scrolling**
   - Test slow, fast, reverse and partial scroll movement.
   - Test browser resize, orientation change, direct URL navigation and back/forward navigation.
   - Test keyboard access to content inside pinned sections.
   - Confirm content remains reachable when motion is reduced or JavaScript is unavailable.

## Interaction patterns

- Use subtle reveal effects to reinforce hierarchy, not to delay access to content.
- Use scrubbed sequences only when the progress relationship is understandable.
- Keep pinned sequences short and provide a clear exit into normal document flow.
- For horizontal storytelling, preserve a meaningful reading order and provide a usable narrow-screen alternative.
- Do not require users to scroll a fixed distance to reveal essential instructions or controls.

## Common failure modes

- Pinning long sections that trap visitors in an artificial sequence.
- Creating horizontal scroll without discoverable cues or touch support.
- Using fixed pixel offsets that break when text wraps or localization changes.
- Measuring before fonts, images or dynamic content settle.
- Hiding all content until ScrollTrigger initializes.
- Using scrub for an interaction that should respond immediately to user input.

## Completion criteria

The story works as ordinary content first, scroll-linked motion improves comprehension, triggers respond correctly across viewports, and visitors can navigate and read without being forced through an animation.


## Trigger lifecycle and refresh discipline

- Create triggers only after their target elements exist and within the owning page/component lifecycle.
- Revert the owning GSAP context or matchMedia instance on teardown; do not manually kill a shared global trigger collection unless the component owns it.
- Use function-based `start` and `end` values when positions depend on current layout. Use `invalidateOnRefresh` when tween values must be recalculated during refresh.
- Refresh after meaningful layout changes such as asynchronously loaded content, image dimensions becoming known or an expanded section changing document flow. Coordinate refresh after the layout settles; never refresh on every scroll or animation frame.
- Avoid pinning nested containers or applying multiple competing pin spacers without a tested requirement.
- If a trigger depends on another pinned scene, account for creation order and refresh ordering so downstream start positions remain correct.
- Treat markers as development diagnostics only; remove them from production configuration.

## Scroll behavior acceptance

The document remains normally scrollable, browser history and anchor navigation work, focused content is not covered by pins, and the narrative is understandable when triggers are absent. Test direct load at a mid-page URL and reverse scrolling, not only a top-to-bottom demo.
