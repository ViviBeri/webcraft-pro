# Design Review Scorecard

Use this after inspecting the rendered interface. Record exact route, viewport and evidence. If only source code or an incomplete screenshot is available, mark unverified dimensions as not assessed.

## Scoring scale

| Score | Definition |
|---|---|
| 0 | Missing, broken or harmful |
| 1 | Major weakness likely to block or confuse users |
| 2 | Partially effective; material gaps remain |
| 3 | Effective; limited issues remain |
| 4 | Strong, consistent and supported by evidence |
| N/A | Not assessed because evidence is unavailable |

## Review record

- Project and route:
- Date:
- Reviewer:
- Evidence type: live browser / local browser / screenshot / source only
- Browser and version:
- Viewport dimensions:
- Theme and motion preference:

## Dimensions

| Dimension | Score | Evidence and observed issues | Next action |
|---|---:|---|---|
| Product specificity and content truth | | | |
| Information hierarchy and composition | | | |
| Typography, spacing and visual consistency | | | |
| Responsive behavior and reflow | | | |
| Accessibility and interaction clarity | | | |

Any score below 3 requires an evidence note and an action. A critical or high-severity defect remains a release blocker regardless of the total score. Do not average scores into a claim of accessibility, usability or design certification.

## Findings

| Severity | Route / viewport | Observed behavior | Expected behavior | Recommended fix | Retest evidence |
|---|---|---|---|---|---|
| Critical / High / Medium / Low | | | | | |

## Verification checklist

- [ ] Full page inspected, not only the hero.
- [ ] Narrow mobile, tablet, laptop and wide desktop checked where available.
- [ ] Primary navigation and calls to action tested.
- [ ] Forms and feedback states tested.
- [ ] Keyboard operation and visible focus checked.
- [ ] Contrast and image alternatives checked.
- [ ] Reduced-motion behavior checked.
- [ ] Findings retested after fixes.
- [ ] Unverified items recorded explicitly.

## Outcome

- Decision: ready / ready with follow-up / not ready / insufficient evidence
- Release blockers:
- Follow-up owner:
- Remaining limitations:
