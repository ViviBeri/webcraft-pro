# Performance Budget Template

Budgets should be based on a representative baseline, target users, product priorities and measurement noise. This template is a planning record, not a universal set of recommended limits.

## 1. Budget context

| Field | Value |
|---|---|
| Product / route group | `[name]` |
| Baseline build / date | `[identifier / date]` |
| Target build / review date | `[identifier / date]` |
| Primary device / network profiles | `[details]` |
| Field data source / window | `[details]` |
| Budget owner | `[name]` |
| Review cadence | `[release / monthly]` |

## 2. User experience budgets

| Metric | Baseline | Target / budget | Warning threshold | Measurement method | Scope |
|---|---:|---:|---:|---|---|
| LCP p75 | `[value]` | `[target]` | `[threshold]` | Field p75; lab diagnostics separately | `[population]` |
| INP p75 | `[value]` | `[target]` | `[threshold]` | Field p75; interaction traces | `[population]` |
| CLS p75 | `[value]` | `[target]` | `[threshold]` | Field p75; layout-shift trace | `[population]` |
| TTFB | `[value]` | `[target]` | `[threshold]` | `[field / lab]` | `[scope]` |

Core Web Vitals good thresholds are LCP ≤ 2.5 s, INP ≤ 200 ms and CLS ≤ 0.1 at the 75th percentile. Project budgets may be stricter; they should not relax the distinction between field data and lab diagnostics.

## 3. Delivery and implementation budgets

| Resource / measure | Baseline | Budget | Enforcement point | Notes |
|---|---:|---:|---|---|
| Initial HTML transfer | `[bytes]` | `[bytes]` | `[CI / monitoring]` | `[compression]` |
| Initial JS transfer | `[bytes]` | `[bytes]` | `[bundle analyzer]` | `[route split]` |
| CSS transfer | `[bytes]` | `[bytes]` | `[CI]` | `[critical CSS]` |
| LCP image transfer | `[bytes]` | `[bytes]` | `[asset check]` | `[format / priority]` |
| Total initial transfer | `[bytes]` | `[bytes]` | `[CI / lab]` | `[profile]` |
| Long task / main-thread work | `[duration]` | `[target]` | `[trace / RUM]` | `[journey]` |
| Third-party scripts | `[count / bytes]` | `[limit]` | `[review]` | `[owner]` |

## 4. Enforcement and variance

**Hard-fail gates:** `[thresholds and CI jobs]`

**Warning-only budgets:** `[thresholds]`

**Repeated-run policy:** `[run count, aggregation and acceptable variance]`

**Field-data regression trigger:** `[window, population, minimum sample]`

**Waiver process:** `[approver, rationale, expiry and mitigation]`

Do not fail a build on noisy measurements without a stable test environment and calibrated tolerance. Do not use a single Lighthouse score as the only budget.

## 5. Budget change log

| Date | Metric / budget | Previous | New | Evidence / rationale | Approved by |
|---|---|---:|---:|---|---|
| `[date]` | `[metric]` | `[value]` | `[value]` | `[baseline / decision]` | `[name]` |

## 6. Review checklist

- [ ] Baseline is tied to a build, route set and reproducible conditions.
- [ ] Field and lab measurements are not mixed.
- [ ] Budgets reflect actual user journeys and device/network segments.
- [ ] Thresholds account for sampling and run-to-run variance.
- [ ] Enforcement has a named owner and an exception process.
- [ ] Accessibility, correctness and reliability remain release gates.
