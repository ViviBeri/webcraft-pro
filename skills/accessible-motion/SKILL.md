---
name: accessible-motion
description: Use when auditing or implementing reduced motion, animation accessibility, vestibular safety, focus behavior or motion-sensitive interaction alternatives.
---

# Accessible Motion

## Objective

Ensure motion does not prevent people from understanding, navigating or using the interface. Honor user preferences while preserving the information and functionality that motion was meant to communicate.

## Workflow

1. **Inventory motion**
   - Find autoplay, looping, parallax, zoom, large translations, scroll-linked movement, animated backgrounds and motion triggered by interaction.
   - Identify motion that is essential to understanding a task versus decorative or non-essential.
   - Check whether animation starts automatically, lasts more than a brief moment or repeats.
2. **Honor platform preferences**
   - Use the prefers-reduced-motion media feature as the default signal.
   - In CSS, provide a reduced-motion override for non-essential transitions and animations.
   - In GSAP, use gsap.matchMedia() with a reduced-motion condition and build a distinct low-motion or static experience.
   - Do not rely on JavaScript alone; keep a CSS fallback for CSS-driven motion.
3. **Reduce, do not merely accelerate**
   - Remove parallax, large spatial movement, zooming and continuous decorative motion where possible.
   - Replace spatial transitions with immediate state changes or restrained opacity changes only when they remain comfortable.
   - Do not assume a zero-duration version of a complex animation is understandable or safe.
   - Keep essential feedback, status and content available without animation.
4. **Respect control and focus**
   - Never move focus automatically as part of decorative motion.
   - Do not move, resize or obscure focused controls unexpectedly.
   - Provide pause, stop or hide controls for applicable automatically moving or updating content.
   - Avoid flashing content and rapid high-contrast changes.
   - Keep animated content readable by assistive technology; do not announce every animation frame.
5. **Preserve usable fallbacks**
   - Render meaningful content before animation initialization.
   - Ensure JavaScript failure does not leave content hidden.
   - Keep navigation, forms and controls fully functional when motion is disabled.
   - Avoid using motion to communicate the only indication of validation or system state.
6. **Test**
   - Enable reduced motion in operating-system/browser settings and reload the page.
   - Change the preference while the page is open and verify setup reverts correctly.
   - Test keyboard focus through animated and pinned regions.
   - Check automatic movement, looping and time-based content against applicable accessibility requirements.
   - Record any remaining motion and why it is necessary.

## Implementation notes

A CSS baseline may use the prefers-reduced-motion: reduce media query to disable non-essential animation and transition behavior. Do not blanket-disable all transitions without checking whether the result removes important state feedback.

For GSAP, use one gsap.matchMedia() instance per relevant component or page scope, add the reduced-motion condition, and revert it during teardown. Avoid the deprecated ScrollTrigger.matchMedia() method.

## Completion criteria

The reduced-motion preference is respected, essential content and feedback remain available, focus remains stable, automatic movement is controllable where required, and the experience is tested with motion both enabled and reduced.


## Automatic movement review

Identify whether motion starts automatically, lasts beyond five seconds, runs in parallel with other content, or updates automatically. Determine whether users need a pause, stop, hide or frequency control under the applicable accessibility requirements. A reduced-motion preference is not a substitute for required controls when content continues moving or updating.

Keep the non-animated state as the default content presentation where practical. Avoid hiding content until JavaScript initializes; when animation is unavailable, the page must not expose an empty region or leave focus on an invisible element. If a preference changes at runtime, revert the old setup before applying the new one.

## Common AI failure mode

**Failure:** An agent globally disables animation for reduced-motion users but leaves content hidden, controls displaced, or status feedback dependent on the removed timeline.

**Why it matters:** The preference can turn decorative enhancement into a broken interface: users lose content, miss state changes, or retain focus on invisible elements.

**Symptoms:**
- Elements remain transparent or off-screen
- reveal sequences never reach final state
- success/error feedback disappears
- runtime preference changes leave stale setup.

**Prevention:** Render content and final layout before motion setup. Design an explicit static or low-motion state, keep essential feedback immediate, preserve focus and interaction, and revert/rebuild preference-dependent setup. Test initial load, runtime changes, keyboard paths, and JavaScript failure.

