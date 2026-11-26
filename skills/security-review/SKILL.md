---
name: security-review
description: Use when performing a pre-release security review, assessing an existing web application, prioritizing vulnerabilities, or producing a remediation and residual-risk report.
---

# Application Security Review

## Objective

Assess the implemented application against its threat model and security requirements. Report confirmed evidence, realistic impact and untested areas without overstating assurance.

## Review sequence

1. Define scope, build, environment, roles, routes, APIs, integrations and excluded systems.
2. Review architecture, data flows, trust boundaries and threat model.
3. Check authentication, session lifecycle, recovery and MFA.
4. Test object, function, property and tenant-level authorization.
5. Review validation, output encoding, query construction, file handling, redirects and SSRF boundaries.
6. Inspect API inventory, schemas, rate limits, business-flow controls and webhook verification.
7. Review secrets, configuration, transport security, cookies, CORS, security headers and error handling.
8. Review dependencies, build workflows, third-party actions, artifact handling and deployment permissions.
9. Check logging, alerting, backup, recovery and incident response readiness.
10. Run safe automated and manual tests in authorized environments; do not perform destructive tests against production without explicit authorization.

## Prioritization

Prioritize exploitable issues affecting confidentiality, integrity, availability, tenant isolation, privileged actions or sensitive business operations. Consider exploit preconditions, exposure, data sensitivity, blast radius and compensating controls.

Do not rely on a scanner's severity alone. Separate confirmed vulnerabilities from hypotheses and hardening recommendations.

## Report format

Include:
- Scope, build, date and authorization boundaries.
- Architecture and threat-model summary.
- Test methods and tools.
- Findings with evidence, impact, preconditions, severity rationale and remediation.
- Positive controls verified.
- Untested areas and limitations.
- Residual risks, owners and target dates.
- Retest results and release recommendation.

## Safety and authorization

Only test systems for which the requester has authority. Use non-production data and environments when possible. Avoid persistence, destructive payloads, credential harvesting, denial-of-service behavior or accessing real users' data.

## Completion criteria

The review has explicit scope and authorization, findings are reproducible and prioritized, remediation owners are assigned, and residual risk is documented for release decision-makers.

## Common AI failure mode

**Failure:** An agent writes a security review from a checklist or scanner summary without tracing findings through actual code paths, trust boundaries, and attacker-controlled input.

**Why it matters:** The report misses exploitable paths or overstates speculative issues as confirmed, wasting remediation effort while serious defects remain.

**Symptoms:**
- Findings lack locations, entry points, affected assets, or reproduction
- scanner output is copied without reachability checks
- alternate APIs/jobs/exports are omitted
- severity lacks exploit preconditions and impact.

**Prevention:** Trace each candidate from source to sink and verify authorization, validation, encoding, and failure behavior. Reproduce material findings safely, distinguish confirmed defects from risks, and record scope, assets, preconditions, impact, evidence, and remediation.

