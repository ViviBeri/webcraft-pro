---
name: core-web-vitals
description: Diagnose and improve Core Web Vitals when evaluating real-user loading, responsiveness and visual stability across page templates and devices.
---

# Core Web Vitals

Use this skill when a page feels slow, interactions lag, content shifts during loading, or field performance needs an evidence-based review.

## Workflow

1. Identify the page templates, user journeys, device classes and geographic audiences in scope.
2. Separate field data from lab diagnostics. Use CrUX, PageSpeed Insights or available RUM data for real-user distributions; use Lighthouse and DevTools traces to reproduce and diagnose.
3. Evaluate the current Core Web Vitals at the 75th percentile, segmented by mobile and desktop where data permits:
   - LCP: good at 2.5 seconds or less.
   - INP: good at 200 milliseconds or less.
   - CLS: good at 0.1 or less.
4. Diagnose the underlying cause before changing code:
   - LCP: server response, render-blocking resources, resource discovery, priority, image or text rendering.
   - INP: input delay, event-handler work, long tasks, style/layout work and rendering delay.
   - CLS: missing dimensions, injected content, font swaps, late UI and unstable embeds.
5. Prioritize fixes by affected users, severity, frequency, confidence and implementation risk.
6. Re-measure the same journeys and conditions. Compare distributions and regression risk, not only a single score.

## Engineering rules

- Treat Core Web Vitals as field metrics; a lab run is a diagnostic sample, not a substitute for field evidence.
- Report the 75th percentile and device segmentation. Include sample size and date range when available.
- Do not claim a site passes when there is insufficient field data; state the evidence limitation.
- Do not optimize one metric by degrading another or removing essential functionality.
- Preserve accessibility, correctness and user-perceived quality while tuning performance.
- Track supporting metrics such as TTFB, FCP, TBT and long tasks as diagnostics, not replacements for the current Core Web Vitals.

## Deliverables

Provide the page or journey scope, field and lab evidence, metric values, likely causes, prioritized fixes, verification conditions and remaining uncertainty.

## Common AI failure mode

**Failure:** An agent treats one Lighthouse score or a single lab run as representative field performance, or reports a site as passing without sufficient real-user data.

**Why it matters:** Lab conditions are controlled samples and may not reflect the experience of users across devices, networks, locations, and page templates.

**Prevention:** Separate field data from lab diagnostics, report the 75th-percentile field metrics with device segmentation and sample context, use lab traces to investigate causes, and state when field evidence is insufficient.
