# Motion Examples

These examples describe implementation patterns rather than prescribing a framework or bundler. Confirm the installed GSAP version and plugin availability before using GSAP code.

## 1. Scoped timeline with cleanup

Use a component or page scope so repeated instances do not animate each other's elements.

```js
const context = gsap.context(() => {
  const intro = gsap.timeline({
    defaults: { duration: 0.45, ease: "power2.out" }
  });

  intro
    .from("[data-intro-title]", { y: 18, autoAlpha: 0 })
    .from("[data-intro-copy]", { y: 12, autoAlpha: 0 }, "-=0.2");
}, rootElement);

// Run when the owning component or page is removed.
context.revert();
```

In component frameworks, create the context after the root element is mounted and call revert() from the framework's teardown lifecycle. Do not run setup during render.

## 2. Reduced-motion-aware setup

Use a static presentation when the visitor requests reduced motion. Keep content visible in the initial HTML/CSS state.

```js
const motion = gsap.matchMedia();

motion.add(
  "(prefers-reduced-motion: no-preference)",
  () => {
    gsap.from("[data-reveal]", {
      y: 16,
      autoAlpha: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: "power2.out"
    });
  },
  rootElement
);

// Run during component or page teardown.
motion.revert();
```

The reduced-motion branch intentionally creates no reveal animation; the content remains available in its normal state.

## 3. Responsive ScrollTrigger

Use a simpler non-pinned presentation on small screens and enable the scroll-linked sequence only where it improves the story.

```js
gsap.registerPlugin(ScrollTrigger);

const responsive = gsap.matchMedia();

responsive.add(
  {
    wide: "(min-width: 900px)",
    motionAllowed: "(prefers-reduced-motion: no-preference)"
  },
  (context) => {
    const { wide, motionAllowed } = context.conditions;

    if (!wide || !motionAllowed) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "[data-story-scene]",
        start: "top top",
        end: "+=700",
        scrub: 0.6,
        pin: true,
        invalidateOnRefresh: true
      }
    });

    timeline
      .from("[data-story-visual]", { scale: 0.92, autoAlpha: 0 })
      .from("[data-story-caption]", { y: 20, autoAlpha: 0 }, "<0.15");
  },
  rootElement
);

// Reverts GSAP work created by matching conditions.
responsive.revert();
```

The example assumes the content is already present and readable in normal flow. Test pin duration, focus order, mobile behavior and resize transitions before shipping.

## 4. CSS state transition with reduced motion

For simple feedback, CSS is usually sufficient.

```css
.action {
  transition: background-color 160ms ease, transform 160ms ease;
}

.action:active {
  transform: translateY(1px);
}

@media (prefers-reduced-motion: reduce) {
  .action {
    transition: none;
  }

  .action:active {
    transform: none;
  }
}
```

## Review before production

- Confirm selectors are scoped to the owning component.
- Confirm the initial state is visible if JavaScript does not run.
- Confirm GSAP and ScrollTrigger are installed and registered once according to the app's conventions.
- Confirm revert() runs during teardown.
- Test reduced motion, narrow viewports, keyboard navigation and reverse scrolling.
- Remove development markers and temporary diagnostics.


## 5. Lifecycle selection

Choose one owner for each setup:

- Use `gsap.context(callback, rootElement)` for a component/page group whose conditions do not need to change. Call `context.revert()` from that owner's teardown.
- Use `gsap.matchMedia()` when the setup changes with viewport or user preference conditions. Its matching-condition handlers are context-managed; call `matchMedia.revert()` from teardown. Do not wrap the same handler in another context without a separate reason.
- If a callback creates listeners, observers or timers outside GSAP, remove those explicitly during teardown.

`rootElement` is a reference to the actual component or page root, not a global selector. Create the setup after that element exists.

## 6. Timeline labels and controllable playback

When a sequence needs named navigation or user controls, prefer labels and a stored timeline over unrelated delays.

```js
const sequence = gsap.timeline({ paused: true });

sequence
  .addLabel("intro")
  .from(titleElement, { y: 16, autoAlpha: 0, duration: 0.4 })
  .addLabel("details", ">")
  .from(copyElement, { y: 10, autoAlpha: 0, duration: 0.3 }, "details");

playButton.addEventListener("click", () => sequence.play());
reverseButton.addEventListener("click", () => sequence.reverse());

// Remove listeners and revert the owning context during teardown.
```

The buttons must remain usable if motion is reduced or unavailable. Do not make completion of this sequence a prerequisite for navigation or task completion.

## 7. Reference alignment

The patterns in this directory are independently authored and reviewed against the official GSAP documentation for core tweens, timelines, ScrollTrigger, framework lifecycle and performance. Follow the installed GSAP version and official documentation when APIs change.

## 8. CSS disclosure panel transition

Use this pattern only when the component already has a correct disclosure state and keyboard contract. The trigger must be a real button with `aria-expanded` and an `aria-controls` reference. The component owner must keep `aria-expanded`, `aria-hidden` and `inert` synchronized with the actual open state; do not rely on CSS alone to manage semantics or focus.

The closed panel uses `visibility: hidden` so its descendants are not keyboard-focusable after the exit transition. On close, move focus back to the trigger first if focus is inside the panel. Do not apply menu roles to ordinary site navigation.

```html
<button type="button" aria-expanded="false" aria-controls="account-panel">
  Account options
</button>
<div id="account-panel" class="disclosure-panel" aria-hidden="true" inert>
  <!-- Disclosure content -->
</div>
```

```css
.disclosure-panel {
  visibility: hidden;
  opacity: 0;
  transform: translateY(-0.375rem);
  transition:
    opacity 160ms ease,
    transform 160ms ease,
    visibility 0s linear 160ms;
}

.disclosure-panel.is-open {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 160ms ease,
    transform 160ms ease,
    visibility 0s;
}

@media (prefers-reduced-motion: reduce) {
  .disclosure-panel,
  .disclosure-panel.is-open {
    transition: none;
    transform: none;
  }
}
```

When opening, remove `inert`, set `aria-hidden="false"` and update the trigger's `aria-expanded` before or with the visual state change. When closing, restore focus if necessary, set `inert`, update the ARIA state, then apply the closing class. The component must also define Escape behavior if its interaction pattern requires it. Verify that the panel cannot receive focus while closed.

## 9. CSS icon state transition

Use CSS for a decorative icon swap when the control's accessible name and actual state are managed independently by the component. Both SVGs are decorative because the button supplies the action name.

```html
<button type="button" class="toggle-button" aria-label="Enable notifications">
  <span class="icon-swap" aria-hidden="true">
    <svg class="icon-swap__icon icon-swap__icon--off" viewBox="0 0 24 24">
      <path d="..." />
    </svg>
    <svg class="icon-swap__icon icon-swap__icon--on" viewBox="0 0 24 24">
      <path d="..." />
    </svg>
  </span>
</button>
```

```css
.icon-swap {
  display: inline-grid;
  inline-size: 1.25em;
  block-size: 1.25em;
}

.icon-swap__icon {
  grid-area: 1 / 1;
  inline-size: 100%;
  block-size: 100%;
  fill: none;
  stroke: currentColor;
  transition: opacity 160ms ease, transform 160ms ease;
}

.icon-swap__icon--on {
  opacity: 0;
  transform: scale(0.85);
}

.toggle-button[aria-pressed="true"] .icon-swap__icon--off {
  opacity: 0;
  transform: scale(0.85);
}

.toggle-button[aria-pressed="true"] .icon-swap__icon--on {
  opacity: 1;
  transform: scale(1);
}

@media (prefers-reduced-motion: reduce) {
  .icon-swap__icon {
    transition: none;
    transform: none;
  }
}
```

For a toggle button, use `aria-pressed` and a stable accessible label that describes the toggle itself (for example, "Notifications"), or use a changing action label when the control performs an explicit enable/disable action. Do not mix the two naming models. Update the state and label/pressed value in the component logic; CSS only presents the state. Ensure the initial HTML state matches the actual control state.

## Review additions before production

- Verify disclosure semantics and focus behavior independently from the transition.
- Confirm hidden disclosure content cannot receive focus or be exposed as visible content to assistive technology.
- Confirm icon-only controls have a correct accessible name and state even with CSS disabled.
- Test both patterns with reduced motion enabled and with keyboard-only input.

