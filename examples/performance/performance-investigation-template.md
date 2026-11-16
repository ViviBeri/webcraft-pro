# Performance Investigation

## Incident / investigation details

| Field | Value |
|---|---|
| Investigation ID | `PERF-[number]` |
| Symptom first observed | `[date / time / timezone]` |
| Affected release | `[build / commit]` |
| Affected routes / users | `[scope]` |
| Reporter / owner | `[names]` |
| Severity / business impact | `[details]` |
| Status | `[Open / Investigating / Mitigated / Resolved]` |

## 1. Symptom and impact

**Observed symptom:** `[slow load, interaction delay, layout shift, error, etc.]`

**User-visible impact:** `[task, frequency, affected segment]`

**Expected versus observed behavior:** `[details]`

**Start time, duration and recurrence:** `[details]`

## 2. Reproduction conditions

- Route / user journey: `[details]`
- Browser / version: `[details]`
- Device / viewport: `[details]`
- CPU / network profile: `[details]`
- Cache and session state: `[details]`
- Test data and steps: `[details]`

## 3. Evidence

| Artifact | Source / timestamp | Key observation |
|---|---|---|
| Performance trace | `[link]` | `[finding]` |
| Network waterfall | `[link]` | `[finding]` |
| RUM / Core Web Vitals | `[window / segment]` | `[finding]` |
| Server / API telemetry | `[link]` | `[finding]` |
| Build / deployment diff | `[link]` | `[finding]` |

## 4. Hypotheses and root cause

| Hypothesis | Evidence for / against | Experiment | Result |
|---|---|---|---|
| `[cause]` | `[evidence]` | `[controlled change]` | `[result]` |

Check relevant layers: DNS/TLS and TTFB, backend and database, CDN/cache, resource discovery and prioritization, image/font delivery, JavaScript execution, long tasks, layout/rendering, third-party scripts and client device constraints.

**Confirmed root cause:** `[explain evidence and confidence]`

## 5. Remediation and validation

| Change | Owner | Before | After | Functional / accessibility regression check |
|---|---|---|---|---|
| `[change]` | `[name]` | `[baseline]` | `[result]` | `[evidence]` |

## 6. Outcome

**Mitigation / resolution date:** `[date]`

**Remaining risk:** `[details]`

**Monitoring / alert update:** `[details]`

**Follow-up actions:** `[owner and due date]`

**Lessons learned:** `[details]`
