# Security Review Report

> This report records a bounded review, not a guarantee that the application is free of vulnerabilities. Include only tests authorized for the named scope.

## 1. Assessment details

| Field | Value |
|---|---|
| System / service | `[name]` |
| Build / commit | `[identifier]` |
| Review dates | `[dates]` |
| Reviewers | `[names / roles]` |
| Scope and environment | `[details]` |
| Exclusions | `[details and rationale]` |
| ASVS version / level | `[version / level]` |
| API Top 10 edition | `[edition]` |
| Threat model | `[link or not available]` |

## 2. Executive summary

**Overall assessment:** `[evidence-based summary]`

**Critical / high findings:** `[count and IDs]`

**Release recommendation:** `[go / conditional / no-go]`

**Important limitations:** `[untested areas, tool constraints, access limitations]`

## 3. System and threat context

**Assets and data:** `[sensitive data, credentials, business-critical operations]`

**Trust boundaries and actors:** `[summary]`

**Entry points / APIs / integrations:** `[summary]`

**Threat assumptions:** `[summary]`

## 4. Methods and coverage

| Method | Tool / version or procedure | Scope | Result artifact | Limitation |
|---|---|---|---|---|
| Architecture / threat review | `[details]` | `[scope]` | `[link]` | `[details]` |
| Static analysis / manual code review | `[details]` | `[scope]` | `[link]` | `[details]` |
| Dependency / secret review | `[details]` | `[scope]` | `[link]` | `[details]` |
| Dynamic / API testing | `[details]` | `[scope]` | `[link]` | `[details]` |
| Configuration / deployment review | `[details]` | `[scope]` | `[link]` | `[details]` |

## 5. Findings summary

| Severity | Open | Fixed and retested | Accepted / deferred |
|---|---:|---:|---:|
| Critical | `[n]` | `[n]` | `[n]` |
| High | `[n]` | `[n]` | `[n]` |
| Medium | `[n]` | `[n]` | `[n]` |
| Low / Informational | `[n]` | `[n]` | `[n]` |

| Finding ID | Title | Affected asset | CWE / ASVS / API risk | Severity | Status |
|---|---|---|---|---|---|
| `SEC-001` | `[title]` | `[asset]` | `[reference]` | `[severity]` | `[status]` |

## 6. Control coverage

Link the completed [security verification matrix](security-verification-matrix.md) or its populated project copy.

**ASVS requirements verified:** `[IDs and coverage]`

**API Top 10 risks assessed:** `[items and rationale]`

**Not applicable / not verified:** `[items and rationale]`

A mapping is not evidence of implementation. Cite the actual test, review, configuration or runtime evidence for each control.

## 7. Remediation and retest

| Finding | Owner | Due date | Fix reference | Retest build / date | Result |
|---|---|---|---|---|---|
| `[ID]` | `[name]` | `[date]` | `[PR / commit]` | `[identifier / date]` | `[pass / fail / not run]` |

## 8. Residual risk and decision

**Accepted risks:** `[finding, impact, rationale, approver, expiry and mitigation]`

**Required release conditions:** `[items]`

**Monitoring / incident response follow-up:** `[items]`

## 9. Evidence and approvals

**Evidence location:** `[links]`

**Security reviewer:** `[name / date]`

**Service owner:** `[name / date]`

**Risk approver:** `[name / date]`
