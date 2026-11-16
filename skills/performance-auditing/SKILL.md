---
name: performance-auditing
description: Audit website loading and runtime performance when establishing a baseline, investigating regressions or preparing a performance-focused release review.
---

# Performance Auditing

## Required Reading

- [Front-End Performance Checklist](https://github.com/thedaviddias/Front-End-Performance-Checklist) — required reference for audit planning. Use its HTML, CSS, fonts, images and JavaScript checks as source material, and report findings under the five WebCraft Pro audit categories below.

## Audit categories

Every audit must assess each category and state `reviewed`, `not applicable` with a reason, or `not assessed` with a reason:

1. **Network:** request waterfall, transfer size, compression, caching, CDN/origin latency, connection setup, resource priority and critical-resource discovery.
2. **Rendering:** critical path, render-blocking resources, style/layout/paint, layout stability, LCP discovery, main-thread rendering work and hydration where applicable.
3. **JavaScript:** bundle composition, unused code, parsing/execution, long tasks, interaction handlers, third-party scripts and code splitting.
4. **CSS:** stylesheet size, unused rules, selector/style recalculation costs, critical CSS, blocking behavior and responsive delivery.
5. **Images:** dimensions, responsive sources, modern formats, compression, lazy-loading boundaries, LCP image priority and reserved layout space.

Map font loading and font-display checks into Network and Rendering. Keep findings evidence-based; do not force a category to produce a finding when measurements show no material issue.

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
