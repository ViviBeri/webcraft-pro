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

## Common AI failure mode

**Failure:** An agent checks that a user is signed in but fails to authorize access to the specific resource identified by a client-supplied ID.

**Why it matters:** An authenticated user can change an identifier and read, modify, delete, or export another user's object. Frontend route guards and hidden controls do not protect server-side data operations.

**Symptoms:**
- Changing an object ID in a request returns another user's resource.
- List, search, export, or background-job paths omit the same ownership or tenant check used by the detail route.
- Authorization is checked only in the UI or before a later resource lookup changes the target object.

**Prevention:** At the server-side data boundary, authorize the current principal against the requested action and resolved resource on every operation. Scope resource queries by owner or tenant, deny by default, and re-check authorization in asynchronous work where permissions can change. Add negative tests that substitute another user's IDs across reads, writes, deletes, exports, and indirect access paths.
