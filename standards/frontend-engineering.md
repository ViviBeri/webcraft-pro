# Frontend Engineering Standard

This standard is the shared baseline for WebCraft Pro frontend engineering skills. Apply it proportionately to the task and the repository's actual technology stack.

## 1. Understand before changing

- Inspect the existing framework, runtime, build system, dependencies, architecture and deployment target.
- Read the relevant implementation and tests before proposing a rewrite.
- Preserve established conventions unless there is evidence they are harmful.
- Identify user-visible behavior and compatibility constraints before refactoring.

## 2. Architecture

- Keep presentation, domain rules and external I/O understandable and appropriately separated.
- Give each piece of state a clear owner and avoid competing sources of truth.
- Keep secrets, authorization and privileged operations on trusted server boundaries.
- Prefer incremental and reversible migrations.
- Avoid new dependencies and abstractions without a demonstrated benefit.

## 3. Component quality

- Use semantic native elements whenever possible.
- Define small, typed, predictable component APIs.
- Prefer composition over combinatorial boolean props.
- Model loading, empty, error, disabled and success states where relevant.
- Test public behavior and meaningful state transitions.

## 4. Responsive behavior

- Design around content constraints rather than device names.
- Use intrinsic sizing, Grid, Flexbox and fluid values before fixed dimensions.
- Prevent unintended overflow and clipping.
- Preserve reading order and keyboard order.
- Support zoom, long content, touch and keyboard interaction.

## 5. CSS maintainability

- Keep cascade ownership clear and selector specificity controlled.
- Use semantic design tokens for shared decisions.
- Prefer logical properties and robust layout primitives.
- Provide visible focus and accessible state cues.
- Respect reduced-motion and relevant user display preferences.
- Check browser support against the project's stated support policy.

## 6. Forms and trust boundaries

- Use visible labels, native input semantics and actionable errors.
- Treat client validation as usability, never as a security control.
- Revalidate input, authorization and business rules on the server.
- Protect state-changing requests against CSRF where the authentication model requires it.
- Minimize collected and logged personal data.

## 7. Verification

Choose checks based on the changed behavior:

- Static analysis, formatting and type checking.
- Unit and integration tests for changed logic.
- Production build and deployment configuration checks.
- Browser tests at representative viewport sizes.
- Keyboard and accessibility checks.
- Performance checks for meaningful user journeys.
- Security tests for trust boundaries and input handling.

Report exact checks run, failures, skipped checks and remaining risks. Do not claim browser, accessibility, performance or security verification without evidence.

## 8. Definition of done

A frontend change is complete when it:
- Meets the stated user requirement.
- Fits the existing architecture and conventions.
- Handles expected states and failure paths.
- Remains usable across relevant viewport and input conditions.
- Preserves semantic and keyboard accessibility.
- Protects trust boundaries and sensitive data.
- Has relevant automated verification and a clear record of limitations.
