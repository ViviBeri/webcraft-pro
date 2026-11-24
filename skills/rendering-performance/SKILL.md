---
name: rendering-performance
description: Improve browser rendering when blocking resources, excessive DOM work, layout thrashing or hydration overhead delay visible and interactive content.
---

# Rendering Performance

Use this skill when browser rendering, style calculation, layout, paint or hydration creates visible delays or jank.

## Workflow

1. Profile representative navigation and interaction flows in Chrome DevTools Performance.
2. Identify the critical rendering path: HTML response, CSS discovery, blocking scripts, font and image dependencies.
3. Remove unnecessary render-blocking work and keep critical CSS focused without duplicating large style systems.
4. Reduce DOM complexity where profiling shows style, layout or memory costs.
5. Prevent layout thrashing by batching DOM reads before writes and avoiding forced synchronous layout.
6. Reserve dimensions for images, embeds, banners and asynchronous content to prevent shifts.
7. Choose SSR, static rendering, streaming or client rendering based on content, personalization and interaction requirements.
8. Reduce hydration scope and client-side work when server-rendered content does not need immediate interactivity.
9. Prefer transform and opacity for animations when appropriate; profile compositing and memory rather than applying will-change globally.
10. Re-test visual stability, input responsiveness and rendering cost on realistic devices.

## Engineering rules

- Do not assume SSR automatically improves every performance metric.
- Avoid hiding meaningful content until client JavaScript executes.
- Do not force GPU layers or add will-change without profiling.
- Keep CSS selectors and DOM structure maintainable; optimize demonstrated bottlenecks.
- Avoid synchronous script execution in the critical path unless necessary.
- Preserve progressive enhancement and functionality when scripts fail.
- Re-check accessibility and reduced-motion behavior after rendering changes.

## Deliverables

Provide trace evidence, rendering bottlenecks, architectural trade-offs, selected fixes and repeatable before/after measurements.

## Common AI failure mode

**Failure:** An agent alternates DOM layout reads and style writes inside a loop or animation callback, forcing repeated synchronous layout calculations.

**Why it matters:** The browser repeatedly recalculates layout on the main thread, delaying frames and input handling. The page can stutter even when the amount of DOM work appears small.

**Symptoms:**
- Performance traces show repeated forced reflow or layout between script operations.
- The same geometry is read again after a style write in the same update cycle.
- Jank increases with the number of elements processed or during scroll and resize.

**Prevention:** Batch all required layout reads before writes, cache measurements for the current frame, and use observers or scheduled updates where appropriate. Avoid geometry reads after style mutations in the same loop. Re-profile the identical interaction and confirm fewer forced layouts without introducing stale measurements or visual regressions.
