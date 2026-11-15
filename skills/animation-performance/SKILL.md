---
name: animation-performance
description: Use when profiling, optimizing or debugging animation smoothness, rendering cost, layout shifts, scroll performance or animation lifecycle leaks.
---

# Animation Performance

## Objective

Keep animation responsive and stable on real devices by measuring bottlenecks, limiting unnecessary work and cleaning up resources.

## Workflow

1. **Reproduce and measure**
   - Capture the exact route, viewport, device class, browser and interaction that feels slow.
   - Establish whether the problem is scripting, style recalculation, layout, paint, compositing, asset loading or excessive simultaneous animation.
   - Use browser performance tooling and frame diagnostics when available.
   - Record a baseline before changing code.
2. **Choose efficient properties**
   - Prefer transform and opacity for frequent visual movement when they match the desired effect.
   - Avoid continuously animating layout properties such as width, height, top, left or margins unless the effect requires layout changes.
   - Do not add will-change broadly or permanently; use it only after profiling demonstrates a benefit and remove it when no longer needed.
   - Avoid large blur, filter, shadow and backdrop-filter animations without evidence they perform acceptably on target devices.
3. **Reduce work**
   - Animate only visible or relevant elements.
   - Limit simultaneous timelines, stagger groups and continuous loops.
   - Avoid per-frame DOM reads/writes and repeated layout measurements.
   - Do not create a new timeline or ScrollTrigger inside a high-frequency callback.
   - Use GSAP callbacks and ticker only when the interaction needs them.
4. **Manage lifecycle**
   - Revert animations and ScrollTriggers when their component or route is removed.
   - Disconnect observers and remove listeners.
   - Prevent duplicate initialization after route transitions, hot reload or repeated mounts.
   - Avoid retaining detached DOM nodes in long-lived closures.
5. **Optimize scroll interactions**
   - Prefer native scrolling and avoid scroll-jacking.
   - Use ScrollTrigger's measured trigger model instead of custom per-frame viewport polling.
   - Avoid excessive pinning, nested scrollers and many independent scrubbed effects.
   - Refresh measurements only after layout changes that affect trigger positions.
   - Verify touch scrolling and low-powered mobile devices.
6. **Verify improvements**
   - Compare the same interaction before and after the change.
   - Check frame stability, main-thread activity, layout shifts and memory/resource behavior.
   - Test reduced motion and non-animated fallbacks.
   - Confirm the visual result remains correct and no behavior was removed to hide a performance issue.

## Common failure modes

- Assuming every transform is free or always GPU accelerated.
- Adding will-change to every animated element.
- Optimizing by removing essential content or interaction.
- Using JavaScript scroll listeners for work better handled by CSS or ScrollTrigger.
- Running infinite animations when elements are offscreen or no longer relevant.
- Rebuilding triggers on every resize event without cleanup.
- Treating a smooth desktop recording as proof of mobile performance.

## Completion criteria

The bottleneck is measured, the change addresses its cause, lifecycle resources are released, visual and interaction behavior is preserved, and the same scenario is re-tested on representative devices.
