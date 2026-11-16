---
name: independent-review
description: Review HTML prototypes, design systems and security-critical code from a fresh perspective before finalization. Use when a design or implementation needs an independent critique for template feel, accessibility regressions or missed security edge cases.
---

# Independent Review

## Objective

Provide a skeptical, evidence-based review that is meaningfully separate from the work being reviewed. Catch quality and risk issues that the implementing agent may overlook through familiarity, confirmation bias or attachment to its original approach.

This skill is a review role, not an implementation role. It does not replace specialist accessibility testing, security analysis, human approval or project-specific acceptance criteria.

## 1. Establish an independent reviewer

When the environment supports sub-agents, spawn a fresh sub-agent that did not participate in producing the artifact. Give it the review scope, relevant requirements and the minimum evidence needed to inspect the result.

When sub-agent execution is unavailable:

- Simulate a fresh reviewer perspective in a separate review pass.
- Re-read the artifact as if encountering it for the first time; do not rely on the implementer's rationale as evidence.
- Explicitly label the result **self-review fallback — not an independent sub-agent review**.
- Never claim that a separate agent was spawned when one was not.

For a genuinely independent first pass, avoid providing implementation justifications, desired conclusions or leading prompts. Supply source code when needed for security analysis; for visual critique, prioritize rendered output and user/task context before inspecting source.

## 2. Select the review scope

Review the artifact types relevant to the task:

- **HTML prototypes:** inspect the rendered page and key interaction states, including desktop and mobile where available.
- **Design systems:** inspect tokens, typography, color roles, spacing, component rules and representative component applications.
- **Security-critical code:** inspect trust boundaries, data flow, validation, authorization, output handling and failure paths in the supplied code and context.

Do not imply that a review of one artifact proves the quality of unreviewed pages, components, routes or code paths.

## 3. Review for three failure classes

### A. Template feel and design distinctiveness

Look for:

- Generic hero layouts, repetitive card grids, predictable section sequences or interchangeable stock patterns without a product-specific reason.
- Repeated visual treatments that flatten information hierarchy or make every section feel identical.
- Decorative gradients, icons, badges, shadows or animation that do not communicate product value or improve a user task.
- Design choices that ignore the product, audience, content, brand constraints or real evidence.
- A mismatch between the approved design direction and the rendered experience.

Do not reject familiar patterns merely because they are common. Explain what makes a pattern generic in this context and identify a more product-specific alternative.

### B. Accessibility regressions

Look for regressions or omissions involving:

- Semantic structure, accessible names, labels and relationships.
- Keyboard reachability, logical focus order, visible focus and focus restoration.
- Dialogs, menus, forms, validation errors and dynamic status announcements.
- Contrast, zoom/reflow, responsive touch targets and content order.
- Reduced-motion preferences and interaction alternatives.
- Changes that remove or weaken previously working accessible behavior.

Distinguish source-level observations from behavior verified in a browser or assistive technology. Do not claim WCAG conformance from a visual or static review alone.

### C. Missed security edge cases

For security-critical code, inspect applicable risks such as:

- Untrusted input crossing trust boundaries without appropriate validation or encoding.
- Missing authorization checks, insecure direct object access or reliance on client-side checks.
- Injection sinks, unsafe DOM updates, URL handling and dangerous deserialization.
- Secrets or sensitive data exposed in logs, client bundles, errors or configuration.
- Unsafe redirects, permissive cross-origin behavior, weak message-origin checks or missing request protections.
- Error paths, race conditions, replay, rate limits and abuse cases where relevant.

Tie every finding to the actual code path and threat context. Do not report speculative vulnerabilities as confirmed defects; mark uncertainty and state what evidence would resolve it.

## 4. Report actionable findings

For each finding, provide:

1. **Severity:** Critical, High, Medium or Low.
2. **Location:** file, component, route, state or visible page region.
3. **Evidence:** the observed code, rendered behavior or reproducible condition.
4. **Impact:** why it matters to users, maintainers or system security.
5. **Recommendation:** the smallest practical correction or follow-up test.

Separate confirmed findings, risks requiring verification and subjective design suggestions. Avoid arbitrary numerical scores unless the project explicitly requires a defined scoring rubric.

## 5. Review outcome and handoff

Conclude with one of these outcomes:

- **Blocked:** a critical/high-severity issue or material accessibility regression must be addressed before finalization.
- **Changes recommended:** meaningful medium/low findings or design-distinctiveness issues remain.
- **No material findings:** no material issue was identified within the stated review scope.

Return the scope reviewed, review mode (independent sub-agent or self-review fallback), findings, unreviewed areas and recommended next action.

The implementing agent must validate findings, reproduce behavioral issues where possible and route fixes to the appropriate specialist. The reviewer does not silently modify files or override approved design decisions.

## Completion criteria

- [ ] Review mode is honestly identified; independent review is not claimed when simulated.
- [ ] The stated artifact and review scope are explicit.
- [ ] Template feel, accessibility regressions and relevant security edge cases are considered.
- [ ] Findings include evidence, severity, impact and actionable recommendations.
- [ ] Unverified risks and unreviewed areas are disclosed.
- [ ] The implementing agent receives a clear outcome and handoff.
