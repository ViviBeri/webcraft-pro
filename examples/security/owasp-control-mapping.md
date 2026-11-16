# OWASP Control Mapping — ASVS 5.0.0 and API Security Top 10

> **Illustrative crosswalk, not an OWASP-issued mapping or a complete compliance checklist.** Select exact ASVS requirements from the versioned official requirements catalogue for the application's architecture and verification level. Record exact identifiers, applicability and evidence in the project-specific matrix.

## References and version discipline

- [OWASP ASVS 5.0.0](https://asvs.owasp.org/) — stable release published 30 May 2025.
- [OWASP ASVS source and versioned downloads](https://github.com/OWASP/ASVS).
- [OWASP API Security Top 10 — 2023](https://owasp.org/API-Security/).
- [OWASP API Security Project](https://owasp.org/projects/api-security-project).

ASVS identifiers are version-sensitive. The ASVS project recommends version-qualified references such as `v5.0.0-1.2.5`; verify the exact requirement text and chapter against the official 5.0.0 catalogue before recording it. Do not copy identifiers from ASVS 4.x or from an unpinned development branch.

## A. API Security Top 10 (2023) illustrative crosswalk

| API risk | Control intent to verify | Illustrative ASVS coverage area | Example evidence |
|---|---|---|---|
| API1:2023 Broken Object Level Authorization | Enforce object-level authorization for every operation using a client-controlled identifier; test cross-user and cross-tenant access | Authorization and API / web-service security requirements | Negative tests for read, update, delete, export and nested resources |
| API2:2023 Broken Authentication | Verify identity proofing appropriate to risk, credential handling, token validation, expiry, revocation and session controls | Authentication, session management, token and cryptographic requirements | Authentication test cases; token validation and revocation evidence |
| API3:2023 Broken Object Property Level Authorization | Allowlist writable properties; filter response fields by authorization; prevent mass assignment and excessive data exposure | Authorization, input validation, data protection and API requirements | Schema tests; property-level allow/deny tests; response data review |
| API4:2023 Unrestricted Resource Consumption | Bound payload size, pagination, concurrency, execution time, expensive operations and third-party spend | API, business logic, resource and configuration requirements | Rate/limit tests; load tests; quotas and timeout configuration |
| API5:2023 Broken Function Level Authorization | Enforce role and function authorization server-side for every endpoint and method | Authorization and API requirements | Role/permission matrix; denied privileged-function tests |
| API6:2023 Unrestricted Access to Sensitive Business Flows | Identify abuse-prone workflows and apply controls proportionate to business impact | Business logic, authorization, anti-automation and API requirements | Abuse cases; workflow limits; fraud/velocity monitoring |
| API7:2023 Server Side Request Forgery | Restrict outbound destinations and protocols; validate resolved addresses and redirects; isolate network egress | Input validation, communication, configuration and API requirements | SSRF test cases; egress policy; redirect and DNS-rebinding tests |
| API8:2023 Security Misconfiguration | Harden gateways, CORS, headers, TLS, errors, debug settings, defaults and deployment configuration | Configuration, communication, error handling and API requirements | Configuration review; header/TLS scans; deployment baseline |
| API9:2023 Improper Inventory Management | Maintain an accurate inventory of hosts, versions, endpoints and data flows; retire unsupported interfaces | Architecture, API, configuration and operational requirements | API inventory; OpenAPI comparison; deprecation and retirement records |
| API10:2023 Unsafe Consumption of APIs | Treat upstream responses as untrusted; validate schemas, redirects, content types, signatures and failure behavior | Input validation, communication, API and secure coding requirements | Dependency/provider inventory; contract tests; malformed-response tests |

## B. Mapping workflow

1. Identify the API's trust boundaries, actors, data classifications, endpoints and business-critical flows.
2. Select the applicable ASVS verification level and requirements from the official **5.0.0** catalogue.
3. For each API Top 10 risk, record the relevant exact ASVS requirement IDs and explain why they apply. One risk can map to several requirements; one requirement can support several risks.
4. Define a verifiable control statement and at least one positive and negative test where appropriate.
5. Link evidence: code review, automated test, configuration, architecture decision, runtime observation or manual assessment.
6. Record applicability, exclusions, compensating controls, owner, status and residual risk.
7. Re-check mappings when the ASVS version, API contract, architecture or threat model changes.

## C. Project-specific mapping register

| API risk / control | Exact ASVS 5.0.0 requirement ID(s) | Applicability and rationale | Verification procedure | Evidence link | Status / owner |
|---|---|---|---|---|---|
| `[APIx:2023]` | `[v5.0.0-x.y.z; verify exact text]` | `[reason]` | `[test / review]` | `[link]` | `[status / owner]` |

## Interpretation cautions

- The API Top 10 is a risk-awareness list, not a complete security standard.
- ASVS is a requirements and verification standard; the crosswalk above is a starting point for selecting controls, not proof that all requirements are satisfied.
- Do not infer a one-to-one mapping or claim OWASP endorsement of this table.
- A scanner result alone cannot establish authorization correctness, business-flow abuse resistance or secure upstream API consumption.
