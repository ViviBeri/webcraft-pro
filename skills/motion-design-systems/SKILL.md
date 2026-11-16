---
name: motion-design-systems
description: Use when defining reusable motion principles, duration and easing tokens, transition patterns, animation choreography or interaction feedback across a product.
---

# Motion Design Systems

## Objective

Create a consistent motion language that communicates hierarchy, cause and effect, continuity and system feedback. Motion should clarify interface behavior rather than decorate every element.

## Workflow

1. **Define motion intent**
   - Identify the user action or state change the motion explains.
   - Classify the motion as feedback, transition, orientation, emphasis or storytelling.
   - State what the visitor should understand before choosing an effect.
2. **Create a small motion vocabulary**
   - Define a restrained set of durations, easing curves and distance scales.
   - Use shorter timing for direct control feedback and longer timing only for larger context changes.
   - Define entrance, exit, shared-element and state-change patterns consistently.
   - Use semantic token names such as motion-fast, motion-standard and motion-emphasis.
   - Avoid exposing arbitrary per-component timing values as the default.
3. **Map motion to interaction**
   - Provide immediate feedback for buttons, toggles, menus and form states.
   - Use continuity when an object changes location or context.
   - Use stagger only when sequential emphasis helps comprehension.
   - Keep transitions interruptible and responsive to repeated user input.
   - Do not animate controls in ways that delay activation.
4. **Choose implementation**
   - Use CSS for simple state transitions and decorative effects.
   - Use GSAP for coordinated timelines, complex sequencing or scroll-linked choreography.
   - Keep shared tokens independent of the animation engine.
   - Avoid duplicating the same motion rule in CSS and JavaScript.
5. **Account for preferences**
   - Define a reduced-motion alternative for every non-essential motion pattern.
   - Remove large spatial movement, parallax, continuous motion and scroll-linked effects when reduced motion is requested.
   - Preserve essential status and cause/effect information without animation.
   - Do not make motion the only indicator of state.
6. **Document and validate**
   - Document each pattern's intent, trigger, duration range, easing and reduced-motion behavior.
   - Test keyboard, pointer and touch activation.
   - Check for overlapping transitions, layout shifts and focus disruption.
   - Review the complete product rather than judging each animation in isolation.

## Motion review checklist

- Does the motion communicate a meaningful change?
- Does it begin promptly after the user's action?
- Is the duration appropriate to the size and importance of the change?
- Can the interaction be interrupted or repeated safely?
- Does it avoid unnecessary layout movement?
- Is the same interaction consistent across the product?
- Is essential information still available without animation?
- Is reduced-motion behavior implemented and tested?

## Anti-patterns

- Animating every element on page load.
- Repeated bounce, elastic or overshoot effects without a semantic reason.
- Long delays before a control becomes usable.
- Parallax that reduces readability or orientation.
- Multiple easing and duration values for the same interaction type.
- Motion that hides validation, loading or success information.

## Completion criteria

The product has a small documented motion vocabulary, purposeful interaction patterns, consistent timing, accessible alternatives and verified behavior across relevant input methods.


## Token governance

Define motion tokens as semantic roles, not universal prescriptions. Document the intended use, approximate duration range, easing character, distance/scale guidance and reduced-motion behavior for each token. Keep tokens independent of GSAP so CSS transitions, native browser behavior and other approved engines can use the same vocabulary.

For each shared pattern, document its trigger, start/end state, interruption behavior, reduced-motion alternative and whether it runs automatically. Avoid a token that encodes an implementation detail such as a specific GSAP ease name unless that dependency is intentional.

## Interaction safety

- State changes and controls must remain usable if an animation is interrupted, reversed or never initialized.
- Do not delay activation, validation feedback, navigation or form submission until a decorative timeline completes.
- Avoid focus movement and pointer-blocking overlays during transitions.
- For automatically moving or updating content, assess applicable pause/stop/hide requirements instead of assuming reduced motion alone is sufficient.
