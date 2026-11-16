# Screen Reader Test Matrix

Use this matrix to record actual combinations tested. Availability and behavior vary by operating system, browser, assistive technology version and user configuration. Do not mark a combination passed based on another platform.

## Test environment

| Field | Value |
|---|---|
| Product build / commit | `[identifier]` |
| Test date | `[date]` |
| Tester | `[name]` |
| OS and version | `[version]` |
| Browser and version | `[version]` |
| Screen reader and version | `[version]` |
| Browser zoom / display scale | `[value]` |
| Locale / input method | `[value]` |

## Combination coverage

Add rows for the combinations supported by the product's user and platform commitments. Examples below are candidates, not a mandatory or exhaustive support matrix.

| OS / device | Browser | Assistive technology | Version | Status (Not run / Pass / Fail / Blocked) | Evidence / notes |
|---|---|---|---|---|---|
| Windows | Chrome | NVDA | `[version]` | Not run | `[link]` |
| Windows | Firefox | NVDA | `[version]` | Not run | `[link]` |
| Windows | Edge | Narrator | `[version]` | Not run | `[link]` |
| macOS | Safari | VoiceOver | `[version]` | Not run | `[link]` |
| iOS / iPadOS | Safari | VoiceOver | `[version]` | Not run | `[link]` |
| Android | Chrome | TalkBack | `[version]` | Not run | `[link]` |

## Journey and behavior matrix

| Journey / component | Expected announcement and behavior | Combination | Result | Finding / evidence |
|---|---|---|---|---|
| Initial page load | Title, language, landmarks and heading are understandable | `[combination]` | Not run | `[link]` |
| Primary navigation | Name, expanded state and destinations are clear | `[combination]` | Not run | `[link]` |
| Form labels and instructions | Field name, role, required state and help are announced | `[combination]` | Not run | `[link]` |
| Form validation | Error is announced and associated with the field; recovery is possible | `[combination]` | Not run | `[link]` |
| Dialog open / close | Dialog name and modal context are conveyed; focus enters and returns correctly | `[combination]` | Not run | `[link]` |
| Dynamic status | Important update is announced once without disrupting current work | `[combination]` | Not run | `[link]` |
| Tables / complex content | Headers, relationships and meaningful reading order are available | `[combination]` | Not run | `[link]` |
| Critical end-to-end task | Task can be completed and outcome understood without visual cues | `[combination]` | Not run | `[link]` |

## Result definitions

- **Pass:** Expected information and interaction were verified in this exact combination.
- **Fail:** A reproducible barrier or material difference was observed; create a finding.
- **Blocked:** Testing could not be completed; state why and identify the owner or dependency.
- **Not run:** No test has been performed. Do not count as passed.

## Notes and follow-up

**Known configuration differences:** `[details]`

**Uncovered combinations and rationale:** `[details]`

**Retest date / owner:** `[details]`
