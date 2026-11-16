# Performance Engineering Standard

This standard defines a repeatable, user-centered approach to web performance. It applies across frameworks, hosting providers and rendering architectures.

## Required Reading

- [Front-End Performance Checklist](https://github.com/thedaviddias/Front-End-Performance-Checklist) — use as a required community reference when planning reviews and selecting optimization checks. Its checklist spans HTML, CSS, fonts, images and JavaScript. WebCraft Pro audits must explicitly organize and report evidence across **Network, Rendering, JavaScript, CSS and Images**; map font checks to Network and Rendering where relevant. Treat checklist items as prompts for investigation, not automatic requirements: validate current browser behavior, project constraints and measured impact before applying them.

## 1. Measure the experience

Use field data to understand real users and lab data to diagnose causes.

| Metric | Good target | What it represents |
|---|---:|---|
| Largest Contentful Paint (LCP) | 2.5 s or less | Loading performance |
| Interaction to Next Paint (INP) | 200 ms or less | Interaction responsiveness |
| Cumulative Layout Shift (CLS) | 0.1 or less | Visual stability |

Evaluate the 75th percentile (p75) and segment mobile and desktop when data allows. Record sample size, date range and data source. These thresholds are guidance for field performance, not a guarantee that every page or user will meet them.

## 2. Establish a reproducible baseline

Record:
- Routes, templates and user journeys in scope.
- Build identifier, browser version, viewport and device class.
- CPU and network conditions, cache state and test location.
- Lab tool and version, number of runs and aggregation method.
- Field data source, reporting window and sample limitations.

Repeat tests under consistent conditions. Do not select the best run or compare results from materially different environments.

## 3. Prioritize user impact

Investigate the actual bottleneck:
- LCP: server response, render-blocking CSS/JavaScript, resource discovery and image priority.
- INP: input delay, long tasks, event handlers, style/layout work and rendering.
- CLS: missing dimensions, late content, font swaps, embeds and unstable UI.
- Supporting evidence: TTFB, FCP, network waterfalls, bundle composition, long tasks and memory.

Prioritize by user impact, affected routes, frequency, confidence and risk. Optimize the critical path before low-impact details.

## 4. Asset and code delivery

- Serve correctly sized responsive images and modern formats where supported.
- Reserve media dimensions and prioritize the actual LCP resource.
- Lazy-load non-critical below-the-fold media, not the LCP image.
- Remove unused JavaScript and dependencies; split code at meaningful boundaries.
- Limit main-thread work and defer optional third-party scripts.
- Use efficient font files, robust fallbacks and selective preloading.
- Compress responses and apply explicit cache policies by resource class.

## 5. Browser rendering

- Keep critical CSS focused and avoid unnecessary blocking scripts.
- Prevent forced synchronous layout and repeated read/write cycles.
- Reduce DOM complexity only when profiling demonstrates a cost.
- Choose SSR, static rendering, streaming or client rendering based on product needs.
- Avoid excessive hydration and indiscriminate GPU layer promotion.
- Preserve progressive enhancement and accessible interaction.

## 6. Budgets and regression checks

Define budgets from observed baselines and product requirements. They may include:
- Field Core Web Vitals targets.
- Route-level JavaScript and image transfer budgets.
- Request count, long-task and interaction budgets.
- Repeatable Lighthouse or browser test thresholds.

Keep lab budgets distinct from field targets. Pin tool versions, document test conditions, retain reports and account for infrastructure noise. Begin with warnings if the baseline is unstable; enforce gates only when the signal is reliable.

## 7. Release review

A performance review should include:
- Scope and user journeys.
- Field and lab evidence with dates and conditions.
- Baseline and post-change comparison.
- Ranked bottlenecks and implemented fixes.
- Accessibility, correctness and security trade-offs.
- Remaining limitations and follow-up measurements.

A Lighthouse score alone is not proof of real-user performance. Do not claim Core Web Vitals success without adequate field evidence.
