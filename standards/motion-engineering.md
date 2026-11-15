# Motion Engineering Standard

This standard defines the shared baseline for animation and interaction work in WebCraft Pro.

## 1. Purpose before effect

- Every animation must communicate feedback, state, hierarchy, orientation or narrative progression.
- Prefer native CSS transitions and browser behavior for simple interactions.
- Use GSAP when orchestration, sequencing or scroll-linked control justifies the dependency.
- Do not add motion solely to make a page look busy or expensive.

## 2. Progressive enhancement

- Render essential content and controls before animation setup.
- Keep the experience usable when JavaScript or an animation plugin fails.
- Never make essential content depend on animation completion.
- Preserve native scrolling, browser history and keyboard navigation.

## 3. GSAP lifecycle

- Use gsap.context() to scope grouped animations and revert them during teardown.
- Use gsap.matchMedia() for responsive and preference-based animation setups.
- Do not use the deprecated ScrollTrigger.matchMedia() API in new work.
- Remove event listeners, observers and timers created outside GSAP's managed context.
- Prevent duplicate timelines and triggers across mounts and route transitions.

## 4. Scroll-linked interactions

- Use ScrollTrigger for meaningful scroll-linked progress, not as a replacement for normal page flow.
- Avoid scroll-jacking and long pinned sequences.
- Use responsive alternatives for touch-first and narrow layouts when pinning reduces usability.
- Recalculate measurements after meaningful layout changes.
- Keep markers disabled in production.

## 5. Accessibility and preferences

- Honor prefers-reduced-motion.
- Remove large spatial movement, parallax and continuous decorative motion for reduced-motion users.
- Keep essential feedback and status available without animation.
- Preserve focus position and avoid obscuring focused controls.
- Provide pause, stop or hide controls for applicable automatically moving or updating content.
- Never communicate a state through motion or color alone.

## 6. Performance

- Measure before optimizing.
- Prefer transform and opacity when appropriate, but verify actual rendering behavior.
- Avoid unnecessary layout and paint work.
- Use will-change sparingly and only when profiling supports it.
- Limit continuous loops, simultaneous animations and excessive pinning.
- Clean up all animation resources when their owning component or route is removed.

## 7. Verification

- Test replay, interruption, reverse scroll, resize and route changes.
- Test keyboard, pointer and touch interaction.
- Test with reduced motion enabled and disabled.
- Inspect representative mobile and desktop devices.
- Confirm content remains available without animation.
- Record performance evidence and any untested conditions.

## 8. Definition of done

Motion work is complete when it has a clear purpose, works as progressive enhancement, respects user preferences, preserves accessibility, cleans up its resources and has been tested in the relevant contexts.
