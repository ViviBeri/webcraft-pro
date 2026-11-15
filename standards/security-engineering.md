# Web and API Security Engineering Standard

This standard defines the baseline security engineering practices for WebCraft Pro projects. It is implementation guidance, not a certification or guarantee of security.

## 1. Verification baseline

- Use OWASP ASVS 5.0.0 as the default reference for selecting web application security requirements.
- Use the OWASP API Security Top 10 (2023) as a threat checklist for API-specific risks.
- Select requirements according to data sensitivity, exposure, business impact, threat model and applicable obligations.
- Record the version of each standard used; do not silently mix requirement IDs across versions.

## 2. Architecture and threat modeling

- Inventory assets, actors, data flows, trust boundaries and external dependencies.
- Identify threats including spoofing, tampering, repudiation, information disclosure, denial of service and privilege escalation.
- Minimize exposed functionality, privileges, data retention and network reachability.
- Enforce security decisions on trusted server-side components.
- Document mitigations, owners, verification methods and residual risks.

## 3. Identity and sessions

- Use established authentication libraries and identity protocols.
- Validate issuer, audience, signature, expiry, nonce, state, PKCE and redirect URI as applicable to the selected protocol.
- Protect privileged accounts with MFA or stronger authentication where supported.
- Use secure session cookies, HTTPS, bounded lifetimes, session rotation and revocation.
- Protect cookie-authenticated state changes against CSRF.
- Never expose long-lived credentials in browser bundles or logs.

## 4. Authorization

- Deny by default and apply least privilege.
- Authenticate and authorize each sensitive operation at the server-side boundary.
- Check object-level, function-level, property-level and tenant-level access.
- Use explicit writable-field allowlists.
- Do not rely on client-side controls, obscured UI elements or unguessable identifiers as authorization.

## 5. Input, output and data handling

- Validate type, syntax, length, allowed values and business semantics on the server.
- Use parameterized queries and context-aware output encoding.
- Avoid unsafe HTML insertion and command construction.
- Constrain file uploads, archive extraction, redirects and server-side URL fetching.
- Apply request, pagination, concurrency and processing limits.
- Minimize sensitive data collection, retention and exposure.

## 6. API controls

- Maintain a current API inventory and supported-version policy.
- Enforce schemas, authentication, authorization, rate limits and resource quotas.
- Protect sensitive business flows from automation and abuse.
- Validate webhooks with signatures, timestamps and replay protection.
- Restrict outbound integration requests and validate third-party responses.
- Return safe errors and avoid exposing internal implementation details.

## 7. Secrets and configuration

- Keep secrets in managed secret stores or encrypted platform facilities.
- Use least privilege, environment separation, short-lived credentials and tested rotation.
- Do not commit secrets or expose them in client bundles, logs, traces or build artifacts.
- Use minimal GitHub Actions permissions, pinned third-party actions and protected deployment environments.
- Treat untrusted pull-request code as hostile; do not expose privileged secrets to it.

## 8. Security verification

Use layered controls:
1. Threat modeling and security-focused code review.
2. Static analysis and secure coding checks.
3. Dependency and secret scanning.
4. Dynamic application and API testing in authorized environments.
5. Configuration and infrastructure review.
6. Regression tests for every confirmed vulnerability.
7. Release review and residual-risk acceptance.

Record findings with evidence, impact, exploit preconditions, severity rationale, remediation owner and retest result.

## 9. Release gate

Before release:
- No unresolved critical or high-impact security blocker remains without an explicit risk decision.
- Sensitive operations have authorization tests.
- Secrets and dependencies have been reviewed.
- Security controls and monitoring are configured for the deployment.
- Fixes have been retested and rollback or incident procedures are understood.

## 10. References

- OWASP ASVS 5.0.0: https://asvs.owasp.org/
- OWASP API Security Top 10: https://owasp.org/www-project-api-security/
- OWASP Cheat Sheet Series: https://cheatsheetseries.owasp.org/
- OWASP Authorization Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
- OWASP Authentication Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html
- OWASP Input Validation Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html
