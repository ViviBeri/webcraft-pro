# Web and API Security Examples

These examples are safe implementation patterns to adapt to an application's actual framework, identity provider and deployment. They are not a substitute for a threat model or security review.

## 1. Server-side authorization boundary

The application should authorize the requested action and resource before reading or mutating protected data. This framework-neutral pseudocode illustrates the control flow:

```ts
type Principal = {
  userId: string;
  tenantId: string;
  permissions: ReadonlySet<string>;
};

async function updateInvoice(
  principal: Principal,
  invoiceId: string,
  input: UpdateInvoiceInput,
): Promise<Invoice> {
  const invoice = await invoices.findByIdAndTenant(
    invoiceId,
    principal.tenantId,
  );

  if (!invoice) {
    throw new NotFoundError();
  }

  if (!principal.permissions.has('invoice:update')) {
    throw new ForbiddenError();
  }

  if (invoice.ownerId !== principal.userId && !principal.permissions.has('invoice:update:any')) {
    throw new ForbiddenError();
  }

  const update = validateUpdateInvoiceInput(input);
  return invoices.update(invoice.id, update);
}
```

Adapt the policy model to the product. Avoid disclosing whether a protected object exists when that would create an information leak. Enforce authorization in trusted server-side code and cover both allow and deny cases with tests.

## 2. Explicit input model

```ts
type UpdateProfileInput = {
  displayName: string;
};

function validateUpdateProfileInput(value: unknown): UpdateProfileInput {
  if (
    typeof value !== 'object' ||
    value === null ||
    !('displayName' in value) ||
    typeof value.displayName !== 'string'
  ) {
    throw new ValidationError('Invalid profile update');
  }

  const displayName = value.displayName.trim();

  if (displayName.length < 1 || displayName.length > 80) {
    throw new ValidationError('Display name must be 1 to 80 characters');
  }

  return { displayName };
}
```

Use strict schemas and explicit writable fields. This example is illustrative; use the project's validated schema library and localization/error conventions.

## 3. Parameterized database access

```ts
const result = await db.query(
  'SELECT id, status FROM invoices WHERE id = $1 AND tenant_id = $2',
  [invoiceId, principal.tenantId],
);
```

Never concatenate untrusted values into SQL. Parameter placeholders and syntax vary by database driver.

## 4. GitHub Actions least privilege

```yaml
name: Security checks

on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  dependency-review:
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: read
    steps:
      - uses: actions/checkout@<REVIEWED_FULL_COMMIT_SHA>
      - uses: actions/dependency-review-action@<REVIEWED_FULL_COMMIT_SHA>
```

Replace placeholders with reviewed immutable action commit SHAs and verify the action's required permissions. Do not paste placeholder SHAs into a production workflow. Fork pull requests must not receive deployment credentials or write-capable tokens.

## 5. Security test checklist

- [ ] A user cannot access another user's resource by changing an object ID.
- [ ] A user cannot cross tenant boundaries through list, search, export or background jobs.
- [ ] Read-only roles cannot modify protected properties.
- [ ] Expired, revoked and incorrectly scoped credentials are rejected.
- [ ] State-changing cookie-authenticated requests have CSRF protection.
- [ ] Request sizes, pagination and expensive operations are bounded.
- [ ] Uploads are validated, stored safely and authorized on download.
- [ ] Webhook signatures, timestamps and replay handling are verified.
- [ ] Logs and error responses contain no credentials or sensitive data.
- [ ] Dependencies, secrets and CI permissions are reviewed.

## Review and verification templates

- [OWASP control mapping](owasp-control-mapping.md) — illustrative ASVS 5.0.0 and API Security Top 10 (2023) crosswalk, with a project mapping register.
- [Security verification matrix](security-verification-matrix.md) — requirements, API risks, test procedures, evidence and status.
- [Security review report](security-review-report-template.md) — assessment scope, methods, findings, residual risk and sign-off.

## Important limitation

A passing static scan or dependency check does not prove an application is secure. Combine architecture review, negative authorization tests, safe dynamic testing, configuration review and ongoing monitoring. Test only systems for which you have authorization.
