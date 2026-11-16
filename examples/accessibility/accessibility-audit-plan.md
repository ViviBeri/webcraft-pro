# Accessibility Audit Plan

Use this plan to define a repeatable, risk-based accessibility review. An audit is scoped evidence, not a blanket certification.

## Engagement details

| Field | Value |
|---|---|
| Product / application | `[name]` |
| Release, build or commit | `[identifier]` |
| Audit owner / reviewers | `[names and roles]` |
| Audit dates | `[start–end]` |
| Target standard and version | `[e.g. WCAG 2.2 Level AA]` |
| Applicable jurisdiction / policy | `[if applicable]` |
| Supported browsers and platforms | `[list]` |
| Assistive technology combinations | `[list]` |

## 1. Scope and sampling

**In scope:** `[routes, templates, components, user journeys, authenticated states]`

**Out of scope and rationale:** `[explicit exclusions]`

Select representative pages and states by user impact and interaction complexity. Include, where applicable:

- [ ] Entry point, navigation and global shell
- [ ] Authentication, account recovery and session expiry
- [ ] Search, filtering, pagination and empty states
- [ ] Forms: default, invalid, submitting, success and server-error states
- [ ] Dialogs, menus, tabs, disclosure widgets and other custom controls
- [ ] Data tables, charts, media and document viewers
- [ ] Responsive layouts, zoom/reflow and orientation
- [ ] Critical transactional or safety-related journeys

Record the sampling rationale; do not imply every route was tested if only representative samples were selected.

## 2. Review methods

| Method | Planned coverage | Evidence |
|---|---|---|
| Automated rule scan | `[tool, version, pages/states]` | `[report]` |
| Semantic and content review | `[routes/components]` | `[checklist]` |
| Keyboard-only review | `[journeys]` | `[recording/notes]` |
| Screen-reader review | `[AT/browser combinations]` | [screen-reader matrix](screen-reader-test-matrix.md) |
| Zoom, reflow and responsive review | `[viewport/zoom levels]` | `[screenshots]` |
| Manual WCAG review | `[criteria and sampling]` | `[findings]` |

Automated tools identify only a subset of barriers. Human review is required for meaning, task completion, focus order, announcements, error recovery and context.

## 3. Risk and acceptance

Prioritize barriers by user impact, affected population, task criticality, frequency and availability of an effective workaround. Define severity rules before testing.

**Release blockers:** `[criteria]`

**Accepted risks / exceptions:** `[owner, rationale, expiry and compensating measure]`

## 4. Execution record

| Date | Reviewer | Area / journey | Method | Result / evidence |
|---|---|---|---|---|
| `[date]` | `[name]` | `[area]` | `[method]` | `[link or artifact]` |

## 5. Completion criteria

- [ ] Scope, exclusions, standard and target conformance level are recorded.
- [ ] Critical journeys and meaningful component states are sampled.
- [ ] Keyboard, semantics, screen-reader and responsive checks are completed or explicitly marked untested.
- [ ] Findings have unique IDs, reproducible steps, impact, evidence and affected criteria.
- [ ] Fixes are retested against the original reproduction steps.
- [ ] Residual risks and untested combinations are disclosed in the report.

## 6. Handoff

**Summary of outcome:** `[text]`

**Open high-impact findings:** `[IDs]`

**Evidence location:** `[links]`

**Approvals / owners:** `[names and dates]`
