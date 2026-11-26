---
name: javascript-performance
description: Reduce JavaScript cost when bundles, hydration, main-thread work or third-party scripts delay loading and interaction.
---

# JavaScript Performance

Use this skill when JavaScript increases transfer size, delays rendering, blocks input or creates avoidable runtime work.

## Workflow

1. Establish bundle and runtime baselines for representative routes.
2. Inspect dependency and bundle composition. Identify duplicated packages, large dependencies, unused exports and expensive entry points.
3. Split code along meaningful route and interaction boundaries. Defer non-critical features until needed.
4. Verify tree shaking against actual production output; do not assume source-level imports guarantee removal.
5. Reduce main-thread work:
   - Break up long tasks and schedule non-urgent work.
   - Avoid repeated synchronous layout reads and writes.
   - Debounce or throttle high-frequency handlers where semantics permit.
   - Move suitable CPU-heavy work to Web Workers when transfer and coordination costs are justified.
6. Review hydration and client rendering. Avoid shipping interactive JavaScript for static content without a clear need.
7. Audit third-party scripts for business value, loading strategy, consent requirements and measurable cost.
8. Re-measure transfer size, parse/compile/evaluation time, long tasks and interaction responsiveness.

## Engineering rules

- Prefer removing unnecessary work over micro-optimizing syntax.
- Lazy-load optional code, but keep critical navigation and primary actions reliable.
- Avoid loading every route's code in the initial entry chunk.
- Do not split into excessive tiny chunks that create request overhead or waterfall dependencies.
- Preserve error handling, analytics requirements, security controls and accessibility behavior.
- Use production builds for bundle analysis and realistic runtime profiling.
- Document any trade-off between initial load, interaction latency and cache reuse.

## Deliverables

Provide bundle evidence, dependency findings, route-level loading plan, runtime bottlenecks, measurable budgets and before/after verification.

## Common AI failure mode

**Failure:** An agent memoizes broadly, splits bundles mechanically, or moves work to workers without measuring the user-visible bottleneck and new architectural costs.

**Why it matters:** Changes can increase memory, duplicate work, delay interaction, or add serialization overhead while leaving the actual latency unchanged.

**Symptoms:**
- Caches lack evidence of repeated expensive work
- splitting creates request waterfalls
- workers serialize large objects
- bundle size falls but interaction latency and long tasks do not improve.

**Prevention:** Capture a baseline for the affected journey and identify parsing, execution, scheduling, network, or rendering costs. Profile the cause, compare equivalent routes/interactions, include memory, requests, long tasks, and user-visible latency, and remove changes without repeatable benefit.

