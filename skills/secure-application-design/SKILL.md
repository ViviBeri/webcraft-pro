---
name: secure-application-design
description: Use when designing a web application threat model, reviewing architecture boundaries, choosing security controls, or translating OWASP requirements into engineering tasks.
---

# Secure Application Design

## Objective

Build security into system boundaries and data flows before implementation. Use threat modeling to identify assets, trust boundaries, abuse cases and controls that can be verified.

## Workflow

1. **Understand the system.** Map browser clients, APIs, services, identity providers, databases, queues, object storage, external integrations and deployment boundaries.
2. **Identify assets.** Classify credentials, personal data, payment or business records, session identifiers, source code, audit events and privileged operations.
3. **Map trust boundaries.** Mark where identity, input, data ownership, network trust or execution privileges change.
4. **Model threats.** Use STRIDE or another documented method. Include spoofing, tampering, repudiation, information disclosure, denial of service and privilege escalation.
5. **Trace abuse cases.** Consider account takeover, cross-tenant access, mass assignment, injection, SSRF, unsafe file handling, business-flow abuse, resource exhaustion and compromised dependencies.
6. **Select controls.** Define authentication, authorization, validation, output encoding, cryptographic protection, rate limits, logging, monitoring and recovery controls.
7. **Map requirements.** Use OWASP ASVS 5.0.0 as a verification baseline and the API Security Top 10 for API-specific risks. Select requirements appropriate to the application's risk and deployment.
8. **Create actionable tasks.** Assign each risk an owner, mitigation, verification method and residual-risk decision.
9. **Revisit the model.** Update it when architecture, data sensitivity, integrations, roles or deployment change.

## Design principles

- Minimize exposed functionality, privileges, data and network reachability.
- Enforce security decisions on trusted server-side components.
- Treat browser state, client-supplied identifiers and hidden UI controls as untrusted.
- Use defense in depth without treating one control as a substitute for another.
- Fail closed for access-control and security-sensitive decisions.
- Separate administrative and user-facing capabilities.
- Avoid storing sensitive data unless the product requires it.

## Deliverables

Produce a system context diagram, data-flow diagram, trust-boundary inventory, threat register, selected ASVS requirements, security test plan and documented residual risks.

## Completion criteria

Critical assets and trust boundaries are identified, high-risk abuse cases have owners and mitigations, and each selected control has a verification method.
