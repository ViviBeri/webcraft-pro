---
name: performance-testing
description: Add repeatable performance checks when a web project needs measurable budgets, CI regression detection or release performance evidence.
---

# Performance Testing

Use this skill when teams need performance budgets and repeatable checks in pull requests or release pipelines.

## Workflow

1. Select representative routes and user journeys based on traffic and product importance.
2. Establish a baseline from repeatable tests and field evidence where available.
3. Define budgets for user-centric metrics and supporting resources such as JavaScript bytes, image bytes, request counts and long tasks.
4. Choose tools that fit the stack, such as Lighthouse CI, browser automation and bundle analyzers.
5. Pin tool versions and document browser, runner, viewport, throttling and cache settings.
6. Run multiple samples where practical. Compare stable aggregates and tolerate known environmental noise without hiding regressions.
7. Upload reports and traces as CI artifacts. Make findings accessible to reviewers.
8. Start with warning thresholds if the baseline is noisy; tighten gates after reliability is demonstrated.
9. Revisit budgets when product scope or user journeys materially change.

## CI rules

- Use least-privilege workflow permissions and pin third-party actions to reviewed commit SHAs.
- Do not expose secrets to untrusted pull-request code.
- Keep performance checks bounded in runtime and avoid unnecessary duplicate builds.
- Do not fail a build on a single unstable score without a repeatable policy.
- Distinguish lab budgets from field Core Web Vitals targets.
- Report skipped tests, unavailable routes and infrastructure failures clearly.
- Treat automated results as regression signals; retain manual profiling for complex issues.

## Deliverables

Provide the route matrix, budget definitions, tool versions, CI integration plan, artifact retention, noise policy and failure triage instructions.
