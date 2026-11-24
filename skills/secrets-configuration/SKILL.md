---
name: secrets-configuration
description: Use when managing API keys, credentials, signing keys, environment configuration, secret rotation, CI/CD variables, or preventing sensitive data exposure.
---

# Secrets and Secure Configuration

## Objective

Keep credentials out of source, client bundles, logs and build artifacts. Make secret access narrow, auditable and revocable.

## Workflow

1. Inventory secrets, owners, consumers, environments, scopes, expiry and rotation procedures.
2. Use a managed secret store or platform-provided encrypted secret facility appropriate to the deployment.
3. Give each service and workflow only the credentials it requires.
4. Separate development, test, staging and production credentials.
5. Never commit secrets, paste them into issue comments, expose them in frontend variables or include them in screenshots and logs.
6. Use short-lived credentials and workload identity federation where supported instead of long-lived static keys.
7. Rotate credentials after suspected exposure, personnel changes or scope changes; verify old credentials are revoked.
8. Redact credentials and sensitive values from application logs, traces, analytics and error reports.
9. Review configuration defaults for debug mode, permissive CORS, verbose errors, default passwords and exposed administrative endpoints.

## GitHub Actions guidance

- Set workflow permissions to the minimum required, preferably read-only by default.
- Use GITHUB_TOKEN with explicit job-level permissions for repository operations where possible.
- Store required credentials in GitHub Actions secrets or environments; never hardcode them in workflow YAML.
- Pin third-party actions to reviewed full commit SHAs.
- Avoid printing secrets or enabling shell tracing around sensitive steps.
- Restrict deployment secrets with environment protection rules when available.
- Treat pull-request code from forks as untrusted; do not expose write-capable secrets to untrusted workflows.
- Prefer OIDC federation for cloud deployments when supported.

## Incident response

If a secret is exposed:
1. Revoke or rotate it immediately; deleting the visible text is not sufficient.
2. Identify scope, permissions, usage and potential access during the exposure window.
3. Review provider audit logs and affected systems.
4. Remove the secret from active code and configuration, then assess repository history and artifacts.
5. Document the incident, remediation and follow-up controls.

## Completion criteria

Secrets have named owners and least-privilege scopes, production values are not present in client or repository content, rotation is tested, and CI workflows do not expose credentials to untrusted code.

## Common AI failure mode

**Failure:** An agent moves a credential from source code into an environment variable and calls the system secret-safe without checking how the value is injected, exposed to build steps, logged, bundled, or made available to untrusted CI jobs.

**Why it matters:** Environment variables are a delivery mechanism, not a security boundary. A secret can still leak through frontend build-time substitution, debug output, process dumps, artifacts, overly broad workflow permissions, fork pull requests, or long-lived credentials. Once exposed, deleting the visible line does not revoke the credential or remove copies from history and artifacts.

**Prevention:** Classify each value as public configuration or secret; never inject secrets into browser bundles or client-visible build variables. Do not place bearer, access or refresh tokens in script-accessible browser storage such as localStorage or sessionStorage. For browser sessions, use Secure, HttpOnly, appropriately SameSite cookies when supported. Never expose tokens through URLs, logs, analytics, error reports or telemetry. Use a managed secret store or protected CI secret with least-privilege scope, short lifetime where supported, and environment/job restrictions. Do not expose secrets to untrusted fork code or print them in logs; review artifact and cache contents. On suspected exposure, revoke/rotate first, then inspect repository history, workflow logs, artifacts, deployments, and provider audit logs. Verify the deployed output contains no secret and test rotation and access boundaries.
