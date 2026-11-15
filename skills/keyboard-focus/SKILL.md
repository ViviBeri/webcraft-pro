---
name: keyboard-focus
description: Use when implementing or reviewing keyboard navigation, focus visibility, dialogs, menus, composite widgets, focus order, and keyboard interaction patterns.
---

# Keyboard and Focus Engineering

## Objective

Make every interactive workflow operable with a keyboard, with predictable focus movement and visible focus that is not hidden by sticky or fixed content.

## Baseline rules

- All functionality must be keyboard operable without timing-dependent key sequences.
- Preserve a logical focus order that follows the meaning and operation of the interface.
- Provide a clearly visible focus indicator; do not remove outlines without an equally visible replacement.
- Avoid positive tabindex values. Prefer natural DOM order; use tabindex="0" only when a custom non-native control genuinely needs sequential focus.
- Never create a keyboard trap. If a modal intentionally contains focus, provide a keyboard-accessible close path and predictable return.
- Ensure focused content is not obscured by sticky headers, cookie banners, overlays or scroll containers.
- Provide a skip link for repeated navigation where it improves efficient access.

## Workflow

1. Tab through the page from a fresh load. Record focus order and any unreachable controls.
2. Use Shift+Tab to verify reverse navigation.
3. Activate links and buttons with Enter and Space according to native semantics.
4. Test Escape, arrow keys, Home and End only where the chosen widget pattern defines them.
5. Verify visible focus at all breakpoints, zoom levels and color themes.
6. Open each dialog or popover, verify initial focus, contained navigation where appropriate, Escape behavior and focus restoration.
7. Test sticky and fixed elements to ensure they do not cover focused controls.
8. Repeat after validation errors, route changes, dynamic updates and conditional rendering.

## Composite widgets

Use the WAI-ARIA Authoring Practices Guide pattern for the exact widget before implementing custom keyboard behavior. Tabs, listboxes, menus, tree views and comboboxes do not share one universal keyboard model.

Prefer native controls. For custom widgets:
- Implement only the documented interaction model.
- Keep focus and selected state distinct where the pattern requires it.
- Keep ARIA state synchronized with actual behavior.
- Support expected keyboard commands and announce changes.
- Avoid making every child a separate Tab stop when the pattern calls for managed focus.

## Dialog focus lifecycle

For a modal dialog:
1. Move focus into the dialog when it opens, usually to the most appropriate first control or a static heading for complex content.
2. Keep keyboard focus within the modal while it is active.
3. Make background content inert or otherwise unavailable to interaction.
4. Support Escape when dismissal is permitted.
5. On close, return focus to the invoking control or a logical fallback if it no longer exists.

Do not apply modal focus trapping to non-modal dialogs or ordinary popovers.

## Verification

Test with keyboard only, browser zoom, visible focus inspection and at least one representative assistive technology. Verify focus after every state transition, not only initial page load.

## Completion criteria

All controls are reachable and operable, focus is visible and unobscured, custom widgets follow a documented pattern, and focus is restored predictably after transient UI closes.
