# Accessibility Finding: [A11Y-XXX] [Short title]

## Classification

| Field | Value |
|---|---|
| Finding ID | `A11Y-[number]` |
| Status | `[Open / In progress / Fixed / Retest failed / Accepted]` |
| Severity | `[Critical / High / Medium / Low]` |
| Affected route / component | `[location]` |
| Affected user task | `[task]` |
| Standard / criterion | `[version and success criterion, if applicable]` |
| Owner | `[name / team]` |
| Reported / updated | `[dates]` |

## User impact

Describe the barrier, who may be affected, what task is blocked or degraded, how often it occurs and whether a practical workaround exists. Avoid assumptions about individual users.

## Preconditions and reproduction

1. `[starting route, account state and viewport]`
2. `[action]`
3. `[action]`
4. `[observed result]`

**Expected result:** `[specific accessible behavior]`

**Actual result:** `[specific observed barrier]`

## Environment and evidence

- OS / device: `[version]`
- Browser: `[version]`
- Assistive technology: `[name and version, if used]`
- Input method: `[keyboard, touch, pointer, voice]`
- Evidence: `[screenshot, recording, DOM excerpt, test output]`

## Technical analysis

**Root cause:** `[semantic, focus, naming, contrast, content or interaction defect]`

**Affected states:** `[default, hover, focus, error, loading, expanded, etc.]`

**Related components / routes:** `[list]`

## Recommended remediation

Describe the desired behavior and a maintainable implementation direction. Prefer native HTML and established design-system components. Do not prescribe ARIA as a substitute for correct semantics or keyboard behavior.

## Retest

| Field | Result |
|---|---|
| Fix reference | `[PR / commit]` |
| Retest build and date | `[identifier / date]` |
| Original steps repeated | `[yes / no]` |
| Relevant AT / browser combinations | `[list]` |
| Result | `[Pass / Fail / Blocked / Not run]` |
| Remaining impact / evidence | `[details]` |
