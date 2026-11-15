---
name: accessibility-review
description: Use when reviewing a web interface before release, prioritizing accessibility defects, checking responsive and input modes, and producing an actionable remediation report.
---

# Accessibility Release Review

## Objective

Review the actual rendered product across user journeys and input modes. Prioritize barriers by task impact rather than by the number of automated warnings.

## Review sequence

1. Confirm supported routes, roles, locales, browsers, viewport sizes and critical tasks.
2. Inspect semantic structure, page title, landmarks, headings, names and relationships.
3. Check text and non-text contrast, zoom, reflow, text spacing and content clipping.
4. Operate the complete interface with keyboard only, including menus, dialogs, forms and error recovery.
5. Test touch target size and alternatives to dragging or complex gestures.
6. Verify forms, instructions, error summaries, inline errors and status announcements.
7. Check reduced motion, animation controls and time limits where relevant.
8. Test representative journeys with screen readers and accessibility tree inspection.
9. Run automated scans on initial and interactive states.
10. Report evidence, severity, scope and retest requirements.

## Prioritization

Prioritize issues that:
- Block a critical task or prevent access to core content.
- Affect many users or repeated shared components.
- Remove keyboard or assistive-technology access.
- Cause data loss, inaccessible errors or irreversible actions.
- Have a practical, low-risk remediation path.

Do not equate automated severity labels directly with user impact. Explain the reasoning.

## Release report

Include:
- Build, date, scope and WCAG target.
- Browsers, devices and assistive technologies tested.
- Critical journeys and states covered.
- Findings with evidence, criterion, impact, owner and remediation.
- Passed checks and untested areas.
- Known exceptions and residual risk.
- Retest status and release recommendation.

## Completion criteria

The review is reproducible, covers critical tasks and input modes, distinguishes automated from manual evidence, and gives owners clear remediation and retest steps.
