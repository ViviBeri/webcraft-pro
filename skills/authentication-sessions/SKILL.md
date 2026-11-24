---
name: authentication-sessions
description: Use when implementing or reviewing login, registration, password reset, MFA, OAuth or OIDC integration, session cookies, token lifecycle, and account recovery.
---

# Authentication and Session Security

## Objective

Verify identities safely and maintain sessions with bounded lifetime, protected transport and predictable invalidation. Prefer established identity providers and framework security libraries over custom cryptography or token protocols.

## Authentication workflow

1. Select an established identity protocol and provider appropriate to the application. Use OAuth 2.0 for delegated authorization and OpenID Connect when an identity layer is required.
2. Use authorization code flow with PKCE for browser-based public clients. Validate issuer, audience, signature, expiry, nonce and redirect URI according to the protocol and provider.
3. Never embed client secrets in browser bundles, mobile packages or public repositories.
4. Use MFA or phishing-resistant authentication for privileged and high-risk accounts where supported.
5. Rate-limit login, password reset, verification and recovery operations. Avoid account enumeration through distinguishable responses.
6. Use established password hashing implementations with current recommended parameters when passwords must be stored. Never store plaintext or reversibly encrypted passwords.
7. Design recovery flows with short-lived, single-use tokens and explicit user notification for sensitive changes.

## Session management

- Prefer secure, HttpOnly, appropriately SameSite cookies for browser sessions when the architecture supports them.
- Require HTTPS and set the Secure cookie attribute in production.
- Regenerate session identifiers after login, privilege changes and other trust transitions.
- Enforce idle and absolute expiration appropriate to risk.
- Invalidate sessions on logout, credential reset, account compromise and relevant privilege changes.
- Protect state-changing cookie-authenticated requests against CSRF.
- Do not store long-lived bearer tokens in localStorage as a default browser strategy.
- Never log raw passwords, session cookies, access tokens, refresh tokens or recovery secrets.

## OAuth and OIDC checks

Validate redirect URIs exactly, use state for request correlation, use nonce where required, validate PKCE, restrict requested scopes, and protect refresh-token rotation and reuse detection. Do not accept arbitrary return URLs or infer identity from unverified token claims.

## Verification

Test expired, revoked, replayed and malformed tokens; session fixation; logout invalidation; CSRF; brute-force controls; MFA recovery; account enumeration; and privilege changes. Include negative tests for invalid issuer, audience, signature and redirect URI.

## Completion criteria

Identity protocol validation is correct, sessions are protected and revocable, recovery and MFA flows resist abuse, and secrets are absent from client code and logs.

## Common AI failure mode

**Failure:** An agent implements login successfully but reuses the
pre-authentication session identifier after login, and at privilege or
trust transitions (elevation, account switch, MFA completion).

**Why it matters:** An attacker who can fix or pre-seed a session identifier
inherits the authenticated identity of the victim after login. The compromise
survives the login boundary and persists across privileged actions and
account data, even though the login flow itself appears to work.

**Prevention:** Regenerate the session identifier at authentication and at
every privilege or trust transition; invalidate the prior identifier
server-side after rotation. Set idle and absolute expiry, and revoke the
session on logout and on credential or security events. Test fixation by
establishing a pre-login session, completing login, and proving the pre-login
identifier cannot authenticate any privileged request after that point.
Verify the same for privilege-elevation and account-switch transitions.

> Token storage and exposure (localStorage, URLs, logs, analytics, error
> reports, telemetry) is a related but distinct failure mode — see
> `secrets-configuration`.
