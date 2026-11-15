---
name: authorization-access-control
description: Use when designing or reviewing roles, permissions, tenant isolation, object ownership, administrative actions, or server-side authorization checks in web applications and APIs.
---

# Authorization and Access Control

## Objective

Ensure every sensitive operation is authorized for the current principal, requested action and specific resource. Authentication proves identity; it does not grant blanket access.

## Workflow

1. Inventory actors, roles, permissions, resources, tenants and sensitive operations.
2. Define policy centrally and enforce it at the server-side service or data-access boundary.
3. Deny by default. Grant only the minimum permissions required for the task.
4. Check object-level access on every operation that uses a client-supplied identifier.
5. Check function-level access for privileged endpoints and administrative workflows.
6. Restrict writable properties with explicit allowlists or command-specific input models. Never bind arbitrary request fields directly to persistence models.
7. Enforce tenant boundaries in reads, writes, exports, background jobs, caches and object storage.
8. Re-check authorization for asynchronous jobs and long-running operations at execution time where permissions may change.
9. Record security-relevant denials and privileged changes without logging secrets or unnecessary personal data.

## Required negative tests

- User A cannot read, update, delete or export User B's resources by changing an identifier.
- A user cannot access another tenant's records, including through search, bulk operations or indirect relationships.
- A regular user cannot call administrative functions directly.
- Read-only users cannot modify protected fields.
- A user cannot elevate privileges by adding role, owner, tenant or approval fields to a request.
- Revoked permissions take effect within the documented consistency window.
- Background tasks do not execute with broader authority than intended.

## Implementation guidance

- Avoid relying on frontend route guards, hidden buttons or client-side role flags.
- Use policy functions that receive the principal, action and resource explicitly.
- Apply authorization before returning sensitive data or performing side effects.
- Make resource queries tenant-aware rather than fetching globally and filtering after exposure.
- Avoid ambiguous fallback behavior when policy evaluation fails.

## Completion criteria

Sensitive routes and data operations have explicit server-side authorization, tenant isolation is tested, and negative tests cover object, function and property-level access.
