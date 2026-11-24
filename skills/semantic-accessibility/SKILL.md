---
name: semantic-accessibility
description: Use when building or reviewing page structure, landmarks, headings, links, buttons, images, forms, tables, and accessible names in web interfaces.
---

# Semantic Accessibility

## Objective

Express meaning and interaction through native HTML first. Semantic markup gives browsers and assistive technologies reliable structure, keyboard behavior and accessible roles without unnecessary ARIA.

## Workflow

1. Inspect the rendered DOM and identify the page's main regions, heading hierarchy, navigation, content groups and interactive controls.
2. Use native elements for their intended purpose: links navigate, buttons perform actions, forms submit, labels name controls, and headings structure content.
3. Provide one clear main landmark and meaningful, distinguishable labels for repeated navigation landmarks.
4. Build a logical heading outline. Do not choose heading levels for visual size; style headings with CSS.
5. Give informative images concise purpose-based alternative text. Use empty alt text for decorative images; avoid repeating adjacent text.
6. Ensure icon-only controls have a programmatic accessible name. Prefer visible text where practical.
7. Associate every form control with a persistent label. Group related controls with fieldset and legend where appropriate.
8. Use table headers and scopes for genuinely tabular data. Do not use tables for layout.
9. Verify accessible name, role, value and state in browser accessibility tooling and a screen reader.

## Native HTML before ARIA

- Do not add roles or states already supplied by native elements.
- Do not use generic clickable divs or spans when a button or link is appropriate.
- Do not add redundant role="button" to a button.
- Do not use ARIA to repair invalid or contradictory HTML semantics.
- Keep accessible names concise, unique in context and aligned with visible labels.
- Ensure hidden content is truly removed from both visual and accessibility navigation when intended; do not hide focusable descendants accidentally.

## Common AI failure mode

**Failure:** An agent chooses semantic elements and adds ARIA attributes from source inspection, then declares the interface accessible without checking the computed accessibility tree.

**Why it matters:** Invalid ID references, overridden names, hidden focusable descendants, and conflicting native/ARIA semantics can leave controls unnamed or expose a misleading structure even when the markup looks plausible.

**Symptoms:**
- The agent declares the interface accessible without inspecting its rendered accessibility tree.
- No computed name, role, value, state, or relationship checks are recorded for representative controls.
- ARIA decisions are justified only from source markup, with no evidence from dynamic or hidden states.
- The report treats tag presence or source-level attributes as proof of the computed accessibility structure.

**Prevention:** Inspect computed name, role, value, state, and relationships in the rendered accessibility tree. Exercise representative controls by keyboard and screen reader, verify dynamic updates and responsive order, prefer native HTML, and remove redundant or contradictory ARIA. Record untested states instead of inferring accessibility from tag presence.

## Verification

Inspect the accessibility tree, navigate landmarks and headings with a screen reader, use controls without a pointer, and verify names and roles after dynamic state changes. Check responsive layouts for DOM/visual order mismatch. Also verify that form labels do not rely on placeholders, interactive elements retain keyboard support and accessible names, heading levels express structure, landmarks are distinguishable, images have meaningful alternatives, ARIA references resolve to current IDs and state, and visual order agrees with DOM and reading order.

## Completion criteria

The document has a meaningful semantic structure, interactive elements use native behavior, controls have clear accessible names, and the accessibility tree reflects the intended interface.
