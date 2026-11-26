---
name: gsap-fundamentals
description: Use when authoring or refactoring GSAP tweens, timelines, staggered sequences, reusable animation functions or component-scoped animation lifecycles.
---

# GSAP Fundamentals

## Objective

Create intentional, deterministic animation sequences with clear ownership, predictable timing and reliable cleanup. Use GSAP only when it adds value beyond CSS transitions or keyframes.

## Workflow

1. **Inspect the project**
   - Confirm the installed GSAP version, package manager, bundler and framework integration.
   - Check whether required plugins are installed and registered.
   - Follow the project's existing import and plugin-registration conventions.
   - Do not assume a plugin is available merely because it appears in an example.
2. **Choose the simplest primitive**
   - Use CSS transitions or keyframes for simple state changes that do not need orchestration.
   - Use gsap.to(), gsap.from() or gsap.fromTo() for focused tween behavior.
   - Use a timeline when multiple animations need sequencing, overlap, labels, shared controls or coordinated playback.
   - Use stagger only when the elements form a meaningful group; avoid animating every child by default.
3. **Design the timeline**
   - Establish a clear visual start and end state.
   - Use labels and position parameters to communicate sequence relationships.
   - Prefer timeline defaults for repeated duration/ease values.
   - Keep durations, delays and stagger values consistent with the motion system.
   - Avoid arbitrary delays that hide sequencing bugs.
4. **Scope and clean up**
   - Scope selector text to the component or page instance.
   - In component frameworks, create animations after the relevant elements exist and clean them up on unmount.
   - Use gsap.context() for grouped animations and call revert() during teardown.
   - Use gsap.matchMedia() when responsive or preference-based conditions change the animation setup; its recorded GSAP work is reverted when conditions stop matching.
   - Remove event listeners, observers and timers created outside GSAP's context.
5. **Make behavior robust**
   - Avoid animating layout-affecting properties continuously when transform or opacity can achieve the same result.
   - Do not assume an element's initial inline style is the correct reset state.
   - Handle repeated triggers and interrupted timelines deliberately.
   - Avoid global selectors that can animate another instance of the same component.
6. **Verify**
   - Test first render, replay, interruption, route changes and component teardown.
   - Resize across relevant breakpoints and change the reduced-motion preference.
   - Check that animation does not block interaction or leave elements invisible.
   - Confirm no duplicate timelines or ScrollTriggers accumulate after remounts.

## Implementation guidance

- Keep animation code near the component or interaction it owns.
- Separate animation setup from business logic.
- Prefer explicit refs or scoped selectors over broad document-wide selectors.
- Use gsap.set() for deliberate setup states, not as a substitute for understanding the underlying CSS.
- Keep timelines controllable and avoid deeply nested callbacks when labels and timeline composition are clearer.
- Do not create an animation merely to make an interface appear more sophisticated.

## Common AI failure mode

**Failure:** An agent creates GSAP animations outside a clearly owned component or page lifecycle and fails to revert the animation context during teardown.

**Why it matters:** Route changes, rerenders, and remounts leave duplicate timelines, listeners, and triggers attached to stale elements; first-load visuals can conceal memory and interaction defects.

**Symptoms:**
- Timelines accumulate after navigation
- global selectors animate another component instance
- listeners survive unmount
- interrupted from/fromTo animations leave elements hidden or transformed
- zero-duration animation is treated as sufficient accessibility support for a complex interaction
- a timeline is used for a simple CSS hover/state change.

**Prevention:** Assign setup to the component/page that owns its targets. Use scoped selectors and gsap.context with revert, or gsap.matchMedia with its returned revert. Register plugins outside render paths, clean up non-GSAP resources, and test remount, route change, interruption, replay, and teardown.
## Completion criteria

The animation has a clear purpose, correct timing, scoped targets, lifecycle cleanup, responsive behavior and a verified non-animated or reduced-motion experience.


## Lifecycle and API precision

- Use `gsap.context(callback, scope)` to collect animations created for one component or page region, then call `revert()` when that owner is removed.
- Use `gsap.matchMedia()` when setup changes with media conditions. It creates and manages its own context for each matching condition; call the returned object's `revert()` during teardown rather than redundantly wrapping the same setup in another context.
- Keep plugin registration at module or application initialization, not in render or mount callbacks that repeat.
- Prefer timelines with labels and position parameters over chains of independent delays. Store the timeline when controls need to pause, reverse, seek or kill it.
- When multiple `from()`/`fromTo()` tweens target the same property, review `immediateRender` behavior so a later tween does not overwrite an earlier start state.
- Use `overwrite` deliberately for competing interactions; do not use it to conceal unclear animation ownership.
- Do not assume transform or opacity is automatically compositor-only or free. Profile the rendered result on representative devices.
