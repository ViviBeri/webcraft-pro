# Performance Test Matrix

Define repeatable scenarios and record enough environmental detail to compare results. Separate synthetic lab tests, controlled load tests and real-user field data.

## Environment baseline

| Field | Value |
|---|---|
| Application build / commit | `[identifier]` |
| Environment / region | `[staging / production, region]` |
| Browser / version | `[version]` |
| Device / viewport | `[profile]` |
| CPU / network throttling | `[profile]` |
| Cache / storage state | `[cold / warm / clean]` |
| Test tool / version | `[tool]` |
| Run count / aggregation | `[count and method]` |
| Test data / account | `[non-sensitive identifier]` |

## Scenario matrix

| ID | Scenario / route | Device | Network / CPU | Cache state | Runs | Metrics / assertions | Evidence |
|---|---|---|---|---|---:|---|---|
| PERF-T01 | First visit to landing page | Mobile | `[profile]` | Cold | `[n]` | LCP, CLS, TTFB, transfer | `[link]` |
| PERF-T02 | Repeat visit | Mobile | `[profile]` | Warm | `[n]` | LCP, transfer, cache hit | `[link]` |
| PERF-T03 | Critical task interaction | Mobile / desktop | `[profile]` | Warm | `[n]` | INP diagnostics, long tasks | `[link]` |
| PERF-T04 | Content-heavy route | Desktop | `[profile]` | Cold | `[n]` | LCP, image bytes, CLS | `[link]` |
| PERF-T05 | Concurrent API / user load | Server profile | `[load profile]` | N/A | `[n]` | p95 latency, errors, saturation | `[link]` |
| PERF-T06 | Regression smoke after change | Mobile / desktop | `[profile]` | `[state]` | `[n]` | Budget assertions and task success | `[link]` |

Replace example rows with representative journeys and workloads. Never run load or stress tests against third-party or production systems without explicit authorization and an agreed limit.

## Results

| Scenario ID | Run | LCP | INP / interaction | CLS | TTFB | Transfer / JS | Errors / notes |
|---|---:|---:|---:|---:|---:|---:|---|
| `[ID]` | `[n]` | `[value]` | `[value]` | `[value]` | `[value]` | `[bytes]` | `[notes]` |

## Acceptance and regression policy

- Define budgets from a measured baseline and user/business priorities.
- State whether a threshold is a hard gate, warning or investigation trigger.
- Account for variance with repeated runs and a documented aggregation method.
- Use field p75 Core Web Vitals for real-user experience conclusions.
- Treat Lighthouse scores as diagnostic summaries, not substitutes for metric-level evidence.
- Revalidate accessibility, correctness and task completion after performance changes.

**Baseline reference:** `[artifact / commit]`

**Budget owner:** `[name]`

**Exception / waiver:** `[reason, approver, expiry]`
