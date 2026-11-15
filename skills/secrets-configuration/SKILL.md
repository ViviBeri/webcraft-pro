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
