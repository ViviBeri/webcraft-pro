# Security Verification Matrix

Use this matrix to plan and record security verification for a defined application build. Tailor coverage to the threat model, data sensitivity, architecture and selected ASVS verification level.

## Assessment context

| Field | Value |
|---|---|
| Application / service | `[name]` |
| Build / commit / release | `[identifier]` |
| Assessment owner | `[name]` |
| Scope / environments | `[details]` |
| ASVS version and level | `[e.g. 5.0.0 / Level 2]` |
| API Top 10 edition | `[e.g. 2023]` |
| Threat model reference | `[link]` |
| Authorization to test | `[owner / scope / dates]` |

## Verification register

| ID | Asset / endpoint | Threat / control | ASVS 5.0.0 requirement | API Top 10 | Verification method | Expected result | Evidence | Status / owner |
|---|---|---|---|---|---|---|---|---|
| SEC-001 | `[route/resource]` | Object ownership enforced | `[v5.0.0-ID]` | API1 | Negative authorization tests | Cross-user access denied | `[link]` | Not run |
| SEC-002 | `[endpoint]` | Function-level permission enforced | `[v5.0.0-ID]` | API5 | Role matrix tests | Unauthorized role denied | `[link]` | Not run |
| SEC-003 | `[input]` | Input validated and safely encoded | `[v5.0.0-ID]` | API8 | Fuzz / boundary / code review | Invalid input safely rejected | `[link]` | Not run |
| SEC-004 | `[token/session]` | Authentication, expiry and revocation | `[v5.0.0-ID]` | API2 | Token/session tests | Invalid or expired credential rejected | `[link]` | Not run |
| SEC-005 | `[upload/resource]` | File and resource limits enforced | `[v5.0.0-ID]` | API4 | Boundary and abuse tests | Limits enforced without service instability | `[link]` | Not run |
| SEC-006 | `[outbound integration]` | SSRF and unsafe upstream response controls | `[v5.0.0-ID]` | API7 / API10 | Egress and contract tests | Untrusted destinations/data rejected | `[link]` | Not run |

Replace example rows with application-specific controls. Add rows for every applicable requirement and attack path; the sample is not complete coverage.

## Coverage by verification method

| Method | Scope / tool and version | Date / operator | Result artifact | Limitations |
|---|---|---|---|---|
| Threat model / architecture review | `[scope]` | `[details]` | `[link]` | `[details]` |
| Static analysis / code review | `[tool and rules]` | `[details]` | `[link]` | `[details]` |
| Dependency and secret scanning | `[tool]` | `[details]` | `[link]` | `[details]` |
| API Testing | HTTPie CLI and Hoppscotch for manual requests within an authorized scope | `[date / operator]` | `[request/response evidence]` | Verify API authorization, rate limiting and input/output boundaries; tools do not replace server-side controls or automated coverage |
| Configuration / infrastructure review | `[scope]` | `[details]` | `[link]` | `[details]` |
| Manual abuse and authorization tests | `[scenarios]` | `[details]` | `[link]` | `[details]` |

## Status definitions

- **Pass:** The stated verification procedure was executed and its expected result observed.
- **Fail:** A control did not meet its expected result; create a finding and track remediation.
- **Not applicable:** Provide a reason and reviewer approval; do not use to hide missing coverage.
- **Not run / Blocked:** No successful verification evidence exists.

## Review and sign-off

**Unverified high-risk items:** `[IDs]`

**Accepted risks and approver:** `[details]`

**Retest required by:** `[date / owner]`

**Final review decision:** `[decision and rationale]`
