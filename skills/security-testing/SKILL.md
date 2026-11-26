---
name: security-testing
description: Use when planning application security tests, reviewing dependencies and build pipelines, adding static or dynamic analysis, or preparing a secure release checklist.
---

# Security Testing and Supply Chain

## Objective

Build layered security verification into development and CI. Findings must be reproducible, prioritized and tied to remediation rather than treated as scanner output alone.

## Testing layers

1. **Code review and threat modeling:** inspect trust boundaries, authorization, input handling, secrets and risky design decisions.
2. **Static analysis:** use language-aware SAST and security linters for supported stacks.
3. **Dependency analysis:** detect vulnerable direct and transitive packages; review advisories and upgrade paths.
4. **Secret scanning:** detect credentials in current files and history where supported; rotate exposed values.
5. **Dynamic testing:** test a deployed non-production environment for authentication, authorization, injection, misconfiguration and business-flow abuse.
6. **API testing:** cover object/function/property authorization, rate limits, schemas, replay and resource exhaustion.
7. **Configuration review:** check headers, TLS, CORS, cookies, storage, network exposure and production debug settings.
8. **Release verification:** retest fixes, record exceptions and confirm monitoring and rollback procedures.

## GitHub repository controls

Use available repository features proportionate to the project:
- Dependabot alerts and version updates.
- Dependency review for pull requests where supported.
- CodeQL for supported languages.
- Secret scanning and push protection where available on the repository plan and visibility.
- Minimal GitHub Actions permissions and pinned third-party actions.
- Protected deployment environments and required reviews for sensitive releases.

Do not claim a feature is enabled until the repository settings and workflow confirm it. Distinguish alerting from blocking enforcement.

## CI design

- Run security checks on pull requests and the default branch.
- Avoid executing untrusted fork code with privileged tokens or secrets.
- Use read-only GITHUB_TOKEN permissions unless a job requires a documented write scope.
- Pin actions to full commit SHAs and review updates.
- Fail on actionable high-confidence findings according to an explicit policy; triage noisy findings instead of blanket suppression.
- Keep scan artifacts free of credentials and personal data.

## Finding triage

Record affected component, vulnerable version or code path, exploit preconditions, impact, severity rationale, remediation, owner, due date and retest evidence. Verify reachability and actual exposure before downgrading a scanner finding.

## Completion criteria

Security checks run at defined lifecycle points, high-risk findings have owners and retest evidence, dependency and secret exposure are reviewed, and repository controls are described accurately.

## Common AI failure mode

**Failure:** An agent treats a clean dependency scan or passing happy-path test as proof that the application and supply chain are secure.

**Why it matters:** Configured tools cover only selected rules and inputs; authorization bypasses, business-logic abuse, runtime misconfiguration, malicious build steps, and release credential risks may remain.

**Symptoms:**
- Green jobs omit tested threat classes
- tests omit cross-user/tenant and unauthenticated cases
- CI actions or provenance are unchecked
- reports claim vulnerability-free status from scanner success.

**Prevention:** Define a threat-informed matrix across application behavior, dependencies, repository controls, build/release permissions, and provenance. Add negative authorization tests, pin/review CI actions, inspect dependency alerts, and verify least-privilege tokens. Report scope and exclusions; treat untested areas as unknown.

