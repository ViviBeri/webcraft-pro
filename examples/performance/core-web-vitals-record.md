# Core Web Vitals Record

Use one record per release, reporting window and defined population. Core Web Vitals are field metrics; lab tools may provide diagnostics or proxies but must not be presented as field measurements.

## Assessment identity

| Field | Value |
|---|---|
| Product / origin / route group | `[name]` |
| Release / deployment | `[identifier]` |
| Data source | `[CrUX / RUM provider / other]` |
| Measurement window | `[dates]` |
| Population / device class | `[details]` |
| Geography / sample size | `[details if available]` |
| Percentile | `[p75 required for good-needs-improvement-poor classification]` |
| Segmentation | `[mobile / desktop / route / other]` |

## Metric record

| Metric | p75 value | Good | Needs improvement | Poor | Classification |
|---|---:|---:|---:|---:|---|
| Largest Contentful Paint (LCP) | `[value]` | ≤ 2.5 s | > 2.5 s to 4.0 s | > 4.0 s | `[status]` |
| Interaction to Next Paint (INP) | `[value]` | ≤ 200 ms | > 200 ms to 500 ms | > 500 ms | `[status]` |
| Cumulative Layout Shift (CLS) | `[value]` | ≤ 0.1 | > 0.1 to 0.25 | > 0.25 | `[status]` |

A page or origin meets the Core Web Vitals assessment when all three metrics are Good at the 75th percentile for the relevant eligible population. State whether the data is URL-level or origin-level and avoid comparing unlike populations or windows.

## Supporting diagnostics

| Diagnostic | Value | Source / conditions |
|---|---|---|
| Time to First Byte (TTFB) | `[value]` | `[source]` |
| LCP element / resource | `[element and URL]` | `[trace]` |
| INP interaction / phase breakdown | `[input, processing, presentation]` | `[trace]` |
| CLS contributors | `[elements and shifts]` | `[trace]` |

## Trend history

| Window / release | Device / population | LCP p75 | INP p75 | CLS p75 | Notes |
|---|---|---:|---:|---:|---|
| `[window]` | `[segment]` | `[value]` | `[value]` | `[value]` | `[change]` |

## Interpretation and actions

**Largest regression / improvement:** `[details]`

**Likely cause and supporting evidence:** `[details]`

**Action owner and target date:** `[details]`

**Known sampling or instrumentation limitations:** `[details]`

Reference: [Web Vitals](https://web.dev/articles/vitals). Recheck current metric definitions and thresholds when updating this template.
