---
name: accessible-components
description: Use when designing or implementing reusable accessible dialogs, menus, tabs, accordions, disclosures, comboboxes, and other interactive UI components.
---

# Accessible Component Engineering

## Objective

Build reusable components whose semantics, keyboard behavior, focus lifecycle and state remain correct across every supported state.

## Before implementation

1. Prefer a native HTML element when it provides the required behavior.
2. Identify the exact interaction pattern in the WAI-ARIA Authoring Practices Guide.
3. Define states, transitions, keyboard commands, focus rules, accessible names and disabled behavior before writing code.
4. Confirm whether the component is modal, non-modal, single-select, multi-select or navigation.
5. Keep component APIs explicit; do not let consumers create contradictory ARIA state.

## Pattern requirements

### Disclosure and accordion

- Use a button to toggle the controlled content.
- Expose expanded/collapsed state with aria-expanded.
- Connect the control to its panel with aria-controls when useful.
- Keep the button in the normal Tab sequence.
- Ensure the panel content is hidden from interaction when collapsed.

### Tabs

- Use tablist, tab and tabpanel semantics only when implementing the tabs interaction pattern.
- Keep aria-selected, tabindex and panel relationships synchronized.
- Choose and document manual or automatic activation.
- Implement the pattern's arrow-key behavior and Home/End where applicable.
- Do not use tabs semantics for ordinary navigation links.

### Menu and navigation

- Use ordinary navigation links for site navigation; do not apply application-menu keyboard behavior to a standard nav list.
- Use menu roles only for a true menu widget with the expected keyboard model.
- Ensure submenus have predictable open, close and focus behavior.

### Dialog

- Give the dialog an accessible name, preferably through a visible heading.
- Set modal semantics only when the background is actually modal and unavailable.
- Move focus into the dialog, manage contained focus, support permitted dismissal and restore focus on close.
- Use native dialog where appropriate, while still testing browser and assistive-technology behavior.

### Combobox and listbox

- Follow the exact APG pattern for editable or select-only behavior.
- Keep active option, selected value, popup visibility and expanded state distinct and synchronized.
- Support the expected arrow, Escape, Enter and text-editing behavior.
- Do not build a custom combobox when a native select meets the product requirement.

## Component API design

Document:
- Accessible name source and required labeling.
- Controlled/uncontrolled state contract.
- Keyboard interaction contract.
- Focus entry, exit and restoration.
- Disabled and read-only behavior.
- Async loading, empty, error and success states.
- Portal, nested overlay and stacking behavior.
- Supported browser and assistive-technology coverage.

## Verification

Test every state with keyboard-only interaction, browser accessibility inspection and representative screen readers. Add component tests for state and keyboard transitions, plus end-to-end tests for complete user tasks.

## Completion criteria

The component follows a documented interaction pattern, exposes accurate semantics and state, supports expected keyboard behavior, and has tests for lifecycle and edge states.

## Common AI failure mode

**Failure:** An agent implements a custom widget's visual appearance and ARIA roles but omits the keyboard and focus model required by the chosen pattern.

**Why it matters:** Users encounter controls announced as tabs, menus, comboboxes, or dialogs that cannot be operated predictably; incorrect semantics promise behavior the implementation does not provide.

**Symptoms:**
- Tabs lack arrow-key navigation or synchronized panels
- dialogs fail to move focus into the dialog or restore focus on close; modal dialogs fail to contain focus, while non-modal dialogs incorrectly prevent users from reaching the page
- menu roles conflict with ordinary navigation
- selected and expanded states disagree.

**Prevention:** Choose the exact native or WAI-ARIA APG pattern first. Define its state machine, keyboard contract, focus lifecycle, and relationships. Prefer native controls. Test every state and transition, including dismissal, focus restoration, disabled options, async results, and repeated open/close cycles.

