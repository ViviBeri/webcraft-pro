---
name: api-security
description: Use when designing, implementing, reviewing or testing REST, GraphQL, webhook and service APIs for authentication, authorization, abuse resistance and safe data exposure.
---

# API Security Engineering

## Objective

Protect API data and business operations against unauthorized access, abuse, unsafe integration behavior and operational exhaustion.

## Threat baseline

Use the OWASP API Security Top 10 (2023) as a threat checklist:
- Broken Object Level Authorization.
- Broken Authentication.
- Broken Object Property Level Authorization.
- Unrestricted Resource Consumption.
- Broken Function Level Authorization.
- Unrestricted Access to Sensitive Business Flows.
- Server Side Request Forgery.
- Security Misconfiguration.
- Improper Inventory Management.
- Unsafe Consumption of APIs.

Use the current official project material when updating the threat baseline.

## Design workflow

1. Inventory API versions, routes, methods, schemas, data classifications, consumers and external dependencies.
2. Define authentication and authorization for each operation. Verify object, function and property-level access.
3. Validate request and response schemas, content types, lengths and allowed fields.
4. Apply rate limits and quotas by principal, client, route and business action. Add concurrency and payload limits.
5. Protect sensitive business flows with server-side state transitions, anti-automation controls and risk-based limits.
6. Restrict CORS to required origins and methods. CORS is not authentication or authorization.
7. Enforce TLS, secure headers and safe error responses. Do not expose stack traces, internal IDs or secrets.
8. Validate webhook signatures, timestamps and replay protection. Make handlers idempotent where retries are possible.
9. Constrain outbound requests to third-party APIs and apply timeouts, response-size limits and schema validation.
10. Maintain an API inventory, deprecation policy and monitoring for unexpected usage.

## GraphQL-specific checks

Limit query depth, complexity, aliases, batch size and execution time. Authorize fields and resolvers at the data boundary. Prevent introspection exposure where policy requires it, but do not treat disabling introspection as a substitute for access control.

## API test cases

- Substitute object IDs across users and tenants.
- Request privileged methods and routes with low-privilege identities.
- Submit unexpected writable fields and over-posted properties.
- Send expired, malformed, replayed and incorrectly scoped credentials.
- Exercise rate limits, pagination, large bodies, expensive queries and concurrent requests.
- Test webhook signature failure, stale timestamps and duplicate delivery.
- Verify errors and logs do not disclose credentials or sensitive records.

## Completion criteria

Every endpoint has documented access rules, resource limits and schemas; API inventory and versioning are current; and negative tests cover OWASP API risk categories relevant to the product.
