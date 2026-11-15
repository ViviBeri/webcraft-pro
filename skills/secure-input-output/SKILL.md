---
name: secure-input-output
description: Use when handling untrusted input, database queries, HTML rendering, file uploads, URL fetching, serialization, output encoding, or validation in web applications and APIs.
---

# Secure Input and Output Handling

## Objective

Treat all data crossing a trust boundary as untrusted. Validate it for the operation, use safe APIs and encode output for its destination context.

## Input workflow

1. Identify every source: browser fields, headers, cookies, path/query parameters, uploaded files, webhooks, queues, imported data and third-party API responses.
2. Define strict schemas for type, length, format, allowed values and cross-field business rules.
3. Validate on the server at the point of use. Client validation improves usability but is not a security boundary.
4. Use allowlists for structured values and reject unexpected fields for sensitive operations.
5. Normalize carefully and avoid validation on one representation followed by use of another.
6. Apply request size, collection size, pagination and processing limits.

## Output and query safety

- Use parameterized queries or safe ORM APIs; never concatenate untrusted values into SQL or command strings.
- Encode output for its exact context: HTML text, HTML attributes, JavaScript, CSS, URL or JSON.
- Prefer safe DOM APIs such as textContent over unsafe HTML insertion.
- Use framework-supported template escaping and avoid bypass/safe-HTML escape hatches for untrusted content.
- Validate redirect destinations against an explicit allowlist or same-origin policy.
- Protect state-changing cookie-authenticated requests against CSRF.
- Use explicit serialization models to prevent accidental exposure of internal fields.

## File handling

- Allowlist business-required extensions and verify file signatures; do not trust filename or Content-Type alone.
- Enforce size and decompression limits.
- Generate server-side storage names and store uploads outside executable web roots.
- Prevent path traversal and unsafe archive extraction.
- Scan or quarantine files when the threat model requires it.
- Serve files with safe content-disposition and content-type behavior.
- Authorize both upload and download operations.

## URL fetching and SSRF

- Avoid server-side fetching of arbitrary user-provided URLs.
- Prefer strict host allowlists and controlled egress.
- Reject loopback, private, link-local and metadata-service destinations where not explicitly required.
- Revalidate resolved addresses and redirect targets; DNS resolution and redirects can change the destination.
- Apply timeouts, response-size limits and protocol restrictions.

## Verification

Test malformed encodings, oversized values, injection payloads, unexpected object properties, path traversal, unsafe redirects, content-type confusion, archive bombs and SSRF boundary cases using a safe test environment.

## Completion criteria

All trust-boundary inputs have server-side schemas, queries and rendering use context-safe APIs, file and URL handling are constrained, and negative tests cover malformed and adversarial inputs.
