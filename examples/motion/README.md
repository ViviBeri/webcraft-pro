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
