# Stage 7 — Performance Engineering

## Purpose

Measure user experience, identify bottlenecks, improve delivery and rendering, and prevent regressions using reproducible field and lab evidence.

## Canonical assets

- [Core Web Vitals](../../skills/core-web-vitals/SKILL.md)
- [Performance auditing](../../skills/performance-auditing/SKILL.md)
- [JavaScript performance](../../skills/javascript-performance/SKILL.md)
- [Image and asset optimization](../../skills/image-asset-optimization/SKILL.md)
- [Font performance](../../skills/font-performance/SKILL.md)
- [Network and caching](../../skills/network-caching/SKILL.md)
- [Rendering performance](../../skills/rendering-performance/SKILL.md)
- [Performance testing](../../skills/performance-testing/SKILL.md)
- [Performance engineering standard](../../standards/performance-engineering.md)
- [Performance examples and templates](../../examples/performance/README.md)
- [Performance audit template](../../examples/performance/performance-audit-template.md)
- [Core Web Vitals record](../../examples/performance/core-web-vitals-record.md)
- [Performance test matrix](../../examples/performance/performance-test-matrix.md)
- [Performance investigation template](../../examples/performance/performance-investigation-template.md)
- [Performance budget template](../../examples/performance/performance-budget-template.md)

## Reference set

- [Web Vitals](https://web.dev/articles/vitals)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/overview)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

## Acceptance gate

- [x] Field metrics and lab diagnostics are clearly distinguished.
- [x] Thresholds include percentile and sampling context.
- [x] Audits use repeatable routes, viewports and conditions.
- [x] Optimizations are tied to measured bottlenecks.
- [x] Budgets are calibrated against a baseline and noise.
- [x] Performance claims are not inferred from Lighthouse score alone.

These checkboxes indicate that the stage's documentation, templates and acceptance criteria are defined. They do not assert that a production application has been measured or meets the documented budgets.
