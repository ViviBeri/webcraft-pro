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

## Common AI failure mode

**Failure:** An agent optimizes animation by promoting every moving element to its own layer with permanent `will-change`, assuming transforms are always free.

**Why it matters:** Excessive layer creation consumes GPU memory and increases rasterization and compositing work. On constrained devices, the attempted optimization can cause more dropped frames, memory pressure, and jank than the original animation.

**Symptoms:**
- Frame rate degrades as more elements animate or become promoted.
- Paint, rasterization, memory, or compositing cost rises despite fewer layout operations.
- The implementation keeps layers or continuous animation work after elements leave the viewport or unmount.

**Prevention:** Profile the same interaction on representative devices before changing properties. Promote only elements where traces demonstrate a benefit, scope `will-change` to the active interaction, and remove it afterward. Pause offscreen work where appropriate, clean up timelines and observers, and compare frame stability, memory, paint, and compositing before and after. Preserve reduced-motion and non-animated behavior.

## Completion criteria

The bottleneck is measured, the change addresses its cause, lifecycle resources are released, visual and interaction behavior is preserved, and the same scenario is re-tested on representative devices.


## Rendering diagnosis details

Separate scripting, style recalculation, layout, paint, compositing and asset decode costs before choosing an optimization. Transform and opacity are often good candidates for frequent animation, but large layers, filters, blending, rasterization and device memory can still make them expensive.

- Inspect paint flashing, layer composition and frame timelines where browser tooling is available.
- Avoid promoting many elements to layers; layer memory and compositing overhead can outweigh the benefit.
- Batch layout reads before writes when custom measurement is unavoidable.
- Pause or remove continuous work when the owning view is hidden, inactive or unmounted, where the interaction permits it.
- Record the same route, device class, viewport and interaction for before/after comparisons.
