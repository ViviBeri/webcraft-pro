---
name: forms-and-validation
description: Use when building or reviewing forms, input components, client and server validation, submission flows, error handling, autofill or sensitive user-data collection.
---

# Forms and Validation

## Objective

Make forms understandable, accessible and resilient while treating all client-submitted data as untrusted. Client validation improves usability; server validation protects data and operations.

## Workflow

1. **Define the data contract**
   - Identify each field's purpose, type, required status, allowed range and maximum length.
   - Collect only information necessary for the task.
   - Identify sensitive fields and retention requirements before implementation.
   - Define server-side validation and authorization rules independently of the UI.
2. **Use native semantics**
   - Use a real form, appropriate input types, visible labels and associated descriptions.
   - Group related controls with fieldset and legend where appropriate.
   - Set correct name, autocomplete, inputmode, required, minlength, maxlength, min, max and pattern attributes when applicable.
   - Use buttons with explicit types; do not nest forms.
   - Do not use placeholder text as the only label or instruction.
3. **Validate at the right boundaries**
   - Use native constraints for basic browser feedback.
   - Validate again on the server using trusted schemas or domain rules.
   - Enforce authorization, ownership, rate limits and business rules server-side.
   - Normalize values only when the domain contract defines the normalization.
   - Never trust hidden fields, disabled controls, client calculations or client-supplied role identifiers.
4. **Give useful feedback**
   - Explain what is wrong and how to correct it.
   - Associate field errors with controls using aria-describedby; set aria-invalid while invalid.
   - Provide an error summary for long or multi-step forms.
   - On failed submission, move focus to the summary or first invalid field when appropriate.
   - Avoid announcing errors on every keystroke; validate on submit or after meaningful interaction.
   - Preserve valid user input after recoverable failures.
5. **Handle submission states**
   - Show pending, success and failure states.
   - Prevent accidental duplicate submissions without blocking native validation.
   - Keep submit actions explicit; do not auto-submit merely because a select, checkbox or radio value changes.
   - Make network failures retryable where safe and use idempotency for operations that may be repeated.
   - Announce asynchronous results with an appropriate status region.
6. **Protect data**
   - Use appropriate CSRF defenses for cookie-authenticated state-changing requests.
   - Use HTTPS and secure session handling.
   - Apply output encoding or context-appropriate sanitization when displaying submitted content.
   - Avoid placing sensitive data in URLs, analytics events, client logs or error messages.
   - Do not log passwords, authentication tokens or full payment details.
   - Apply server-side rate limiting and abuse controls to public endpoints.
7. **Support real users**
   - Support keyboard-only completion and visible focus.
   - Use suitable mobile keyboards and autofill tokens.
   - Keep controls usable with zoom, screen readers and touch input.
   - Preserve values and validation state across responsive layouts.
   - Consider localization, date/number formats and right-to-left text where the product requires them.
8. **Test end to end**
   - Cover valid, invalid, missing, boundary, malformed and unauthorized submissions.
   - Test server rejection even when client validation is bypassed.
   - Test duplicate submission, timeout, offline/network error and retry behavior.
   - Verify keyboard and screen-reader announcements where test tools allow.
   - Confirm sensitive values are absent from URLs, logs and analytics.

## Common failure modes

- Treating client-side validation as a security boundary.
- Relying on placeholder text instead of visible labels.
- Showing red borders without explanatory text.
- Clearing the entire form after a server error.
- Using GET for sensitive data or state-changing operations.
- Trusting a client-supplied price, permission, account ID or ownership claim.
- Disabling submit in a way that prevents users from discovering validation errors.
- Failing to protect state-changing cookie-authenticated requests from CSRF.

## Completion criteria

The form has a clear data contract, semantic controls, accessible and actionable feedback, server-enforced validation and authorization, safe submission handling, and tests for both expected and adversarial input.
