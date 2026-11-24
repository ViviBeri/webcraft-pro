---
name: screen-reader-testing
description: Use when validating accessible names, roles, reading order, live announcements, form errors, and user journeys with screen readers and browser accessibility trees.
---

# Screen Reader Testing

## Objective

Verify that the information and interaction model exposed to assistive technology matches the visible product and supports complete user tasks.

## Workflow

1. Choose representative browser and assistive-technology combinations based on the audience and supported platforms. Record exact versions and settings.
2. Inspect the browser accessibility tree for names, roles, values, states, relationships and hidden content.
3. Navigate by landmarks, headings, links, form controls and reading commands.
4. Complete important workflows without relying on visual layout: navigation, search, form submission, error recovery, dialogs and dynamic updates.
5. Check that visible labels and accessible names are consistent and that repeated controls are distinguishable in context.
6. Trigger validation errors and verify the user can identify the invalid field, understand the correction and reach the error.
7. Trigger asynchronous updates and verify important status changes are announced without excessive or repetitive speech.
8. Compare visual, DOM and spoken order at desktop and mobile sizes.

## Live regions and dynamic content

- Prefer native semantics and established patterns before adding live regions.
- Use status messages for non-urgent updates and alert semantics only for urgent, actionable information.
- Keep announcements concise; avoid announcing entire regions after small changes.
- Ensure the live region exists before the update where required by assistive technology behavior.
- Do not move focus to a status message merely to force an announcement.
- Test actual announcements; an ARIA attribute in the DOM is not proof that a message is spoken.

## Screen reader test matrix

Select combinations relevant to supported platforms. Typical coverage may include:
- NVDA with Firefox or Chrome on Windows.
- JAWS with a supported browser on Windows where required by the audience.
- VoiceOver with Safari on macOS and iOS.
- TalkBack with Chrome on Android.

This is a selection guide, not a requirement to test every combination for every change. Document the chosen coverage and rationale.

## Common issues

- Unlabeled or ambiguously named controls.
- Repeated links with no useful distinguishing context.
- Incorrect heading and landmark structure.
- Focus changes that are not announced or are disorienting.
- Dynamic results that update visually but are not announced.
- Error summaries that are not connected to invalid controls.
- Hidden or duplicated content exposed unexpectedly.
- Custom widgets that announce a role but do not support the expected interaction.

## Reporting

Record the environment, task, exact navigation steps, expected announcement, actual announcement and impact. Include the DOM/accessibility-tree evidence when useful, but do not substitute it for the observed assistive-technology behavior.

## Completion criteria

Critical user journeys can be completed with the selected assistive technology, important state changes are perceivable, and remaining coverage limitations are documented.

## Common AI failure mode

**Failure:** An agent reports a screen-reader workflow as verified because the page has no axe violations, the DOM contains expected ARIA attributes, or the browser accessibility tree looks plausible—without running the selected assistive technology and observing its output.

**Why it matters:** A control can have a technically plausible name and role yet still be unusable in the actual interaction sequence. Speech output, reading order, focus announcements, live-region timing, and browser/AT interoperability can fail in ways a static scan or accessibility-tree snapshot cannot establish. Users may miss errors, status changes, or the next action while the report incorrectly claims assistive-technology coverage.

**Prevention:** Separate automated, accessibility-tree, and observed assistive-technology evidence in the test report. For each selected browser/AT pair, record versions, settings, task steps, expected output, actual spoken/braille output, and result. Exercise complete journeys—including validation recovery, dialogs, and asynchronous updates—using the AT. Mark unrun combinations and unobserved announcements as untested; never convert a clean axe scan or ARIA inspection into an “AT tested” claim.
