---
name: performance-auditing
description: Audit website loading and runtime performance when establishing a baseline, investigating regressions or preparing a performance-focused release review.
---

# Performance Auditing

Use this skill to create a repeatable, evidence-based view of website performance.

## Workflow

1. Define representative routes, templates, critical journeys and supported devices.
2. Record the build identifier, browser version, test location, viewport, CPU/network throttling, cache state and test date.
3. Capture field evidence where available using CrUX, PageSpeed Insights or production RUM. Record the data window and sample limitations.
4. Run controlled lab measurements with Lighthouse or Chrome DevTools. Repeat runs and compare medians or distributions rather than selecting the best result.
5. Inspect the trace, network waterfall, main-thread activity, layout shifts, image discovery and long tasks. Identify the largest user-impacting bottleneck.
6. Compare results against agreed budgets and a known baseline. Separate a real regression from noisy infrastructure or test variance.
7. Create findings with severity, evidence, likely cause, owner, recommended fix and a measurable acceptance criterion.
8. Re-run the same test protocol after changes and retain reports as CI artifacts where appropriate.

## Audit rules

- Never use a Lighthouse score as the sole release criterion.
- Keep lab conditions stable and document any deviation.
- Do not compare measurements from materially different devices, browsers or throttling profiles as if equivalent.
- Use field metrics to understand real users and lab tools to isolate causes.
- Include mobile testing; desktop-only results hide constrained-device issues.
- Treat third-party scripts, consent tools and embedded media as part of the user experience.
- Report unavailable field data explicitly instead of inventing it.

## Deliverables

Return scope, environment, baseline, evidence, ranked findings, proposed budgets, retest protocol and known limitations.
