---
name: component-engineering
description: Use when creating, refactoring or reviewing reusable UI components, component APIs, composition patterns, interaction states or component tests.
---

# Component Engineering

## Objective

Build components with clear contracts, predictable state, accessible semantics and focused tests. Reuse should reduce inconsistency without creating a generic component framework.

## Workflow

1. **Confirm the use case**
   - Identify the repeated behavior or visual pattern and the consumers that need it.
   - Inspect existing components, design tokens, naming conventions and test utilities.
   - Keep one-off page composition local unless reuse is demonstrated.
2. **Define the contract**
   - Choose a small, typed public API with meaningful names and safe defaults.
   - Prefer composition and slots/children for variable content over a growing list of boolean flags.
   - Model mutually exclusive states as discriminated unions when supported by the language.
   - Document controlled versus uncontrolled behavior and callback semantics.
   - Avoid exposing internal implementation details as public props.
3. **Implement behavior**
   - Use semantic HTML elements before custom roles or keyboard emulation.
   - Keep state as close as practical to the component that owns it.
   - Support disabled, pending, error, empty and success states when relevant.
   - Prevent duplicate submissions and stale asynchronous updates where applicable.
   - Clean up subscriptions, listeners and asynchronous work according to the framework lifecycle.
4. **Build accessibility in**
   - Preserve native keyboard behavior and logical focus order.
   - Provide visible labels and accessible names for interactive controls.
   - Ensure focus indicators, contrast and non-color state cues.
   - Use ARIA only when native semantics do not express the interaction.
   - For dialogs, menus, tabs and other composite widgets, implement the expected keyboard and focus model rather than adding ARIA attributes alone.
5. **Style predictably**
   - Use project tokens for color, type, spacing, radii and motion.
   - Avoid leaking styles into unrelated components.
   - Support content growth, long labels, localization and zoom.
   - Respect reduced-motion preferences.
6. **Test the contract**
   - Test observable behavior, not private implementation details.
   - Cover default, variant, disabled, loading, error and keyboard paths that apply.
   - Assert accessible names and roles where the test environment supports them.
   - Test callbacks, controlled values and composition boundaries.
   - Avoid snapshots as the only evidence for interactive behavior.

## API review checklist

- Is the component solving a real repeated need?
- Are prop names explicit and types restrictive enough?
- Can consumers compose content without adding more flags?
- Are state ownership and event timing predictable?
- Does the component preserve native semantics?
- Are invalid prop combinations impossible or clearly handled?
- Are defaults safe and visually consistent?
- Is the component testable without mocking its entire implementation?

## Anti-patterns

- A universal component with dozens of unrelated props.
- Boolean prop combinations that create undocumented states.
- Reimplementing native buttons, inputs or links without a compelling requirement.
- Styling based only on DOM position or fragile selectors.
- Hidden side effects during render.
- Exporting internal state setters as a broad public API.
- Treating a passing snapshot as proof of accessibility.

## Completion criteria

A component has a documented, minimal contract; predictable behavior; semantic and keyboard-accessible interactions; responsive styling; and tests that cover its meaningful states.


## State and contract matrix

For complex reusable components, list supported variants and states. Include trigger, visible output, accessible name/role/state, keyboard behavior, emitted event and recovery behavior. Exclude impossible combinations from the public API rather than relying on undocumented conventions.

For asynchronous components, define request ownership, cancellation or stale-result handling, retry behavior and whether the component or parent owns pending state. Define which element receives public attributes, forwarded refs, accessible names and form participation.

Preserve native browser behavior, avoid nested interactive elements, and ensure empty, long and localized content do not break the contract. Verify the component in a real consuming context; isolated tests do not prove integration behavior.
