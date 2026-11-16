# Performance Audit Template

Use this template to assess a defined release and representative user journeys. Keep lab diagnostics separate from field/user measurements.

## 1. Audit context

| Field | Value |
|---|---|
| Product / route set | `[name]` |
| Build / commit | `[identifier]` |
| Audit date / owner | `[details]` |
| Browser / version | `[details]` |
| Viewport / device profile | `[details]` |
| CPU / network profile | `[details]` |
| Cache state | `[cold / warm / both]` |
| Runs and aggregation | `[count, median / percentile]` |
| Field-data window / population | `[if available]` |

## 2. Scope and user journeys

| Route / journey | User importance | Device / viewport | State sampled | Rationale |
|---|---|---|---|---|
| `[route]` | `[critical / high / normal]` | `[profile]` | `[state]` | `[reason]` |

Include key entry points, conversion or task completion paths, authenticated states and representative content. Record exclusions.

## 3. Results

| Metric | Lab result | Field result (if available) | Target / threshold | Source and conditions |
|---|---|---|---|---|
| LCP | `[value]` | `[p75]` | Good ≤ 2.5 s | `[artifact / window]` |
| INP | `[interaction diagnostic]` | `[p75]` | Good ≤ 200 ms | `[artifact / window]` |
| CLS | `[value]` | `[p75]` | Good ≤ 0.1 | `[artifact / window]` |
| TTFB | `[value]` | `[value]` | `[project target]` | `[artifact]` |
| Total transfer | `[bytes]` | N/A | `[budget]` | `[network log]` |
| JS transferred / executed | `[bytes / duration]` | N/A | `[budget]` | `[trace]` |

For Core Web Vitals, report the 75th percentile and identify the population and date window when field data is available. Lab results are diagnostic and do not substitute for field data.

## 4. Bottleneck analysis

| Finding ID | Symptom / metric | Root-cause hypothesis | Supporting trace / evidence | Proposed change |
|---|---|---|---|---|
| PERF-001 | `[symptom]` | `[hypothesis]` | `[link]` | `[change]` |

Investigate the critical path: server response, render-blocking resources, LCP resource discovery, image/font delivery, JavaScript execution, long tasks, layout shifts, caching and third-party work.

## 5. Optimization and regression checks

| Change | Expected benefit | Functional / accessibility risk | Before | After | Retest |
|---|---|---|---|---|---|
| `[change]` | `[metric]` | `[risk and mitigation]` | `[baseline]` | `[result]` | `[link]` |

## 6. Conclusion

**Measured improvement:** `[evidence]`

**Regressions / trade-offs:** `[details]`

**Unresolved issues:** `[IDs]`

**Limitations and confidence:** `[details]`

**Next owner / review date:** `[details]`
