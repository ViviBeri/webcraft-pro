# Skills

WebCraft Pro skills are maintained as canonical, portable Agent Skills under this directory.

Each skill is a folder containing a SKILL.md with YAML frontmatter and task-specific instructions. The canonical skill source is agent-neutral; do not fork or duplicate skill bodies for individual coding agents. See the [eight-stage architecture](../stages/README.md) for stage-level acceptance criteria and the shared [AGENTS.md](../AGENTS.md) instructions.

## Available skills

### Design intelligence

| Skill | Purpose |
|---|---|
| [design-direction](design-direction/SKILL.md) | Establish a product-specific visual direction and reusable design system. |
| [anti-slop-ui](anti-slop-ui/SKILL.md) | Audit and improve generic, repetitive or template-like interfaces. |
| [premium-landing-pages](premium-landing-pages/SKILL.md) | Build responsive marketing and product landing pages with working conversion paths. |
| [visual-design-review](visual-design-review/SKILL.md) | Review rendered interfaces, responsive behavior, accessibility and interactions. |
| [design-system-architecture](design-system-architecture/SKILL.md) | Architect semantic tokens, component foundations, themes and design-system governance. |
| [visual-reference-analysis](visual-reference-analysis/SKILL.md) | Translate screenshots and visual references into original product-specific design decisions. |
| [design-system-architecture](design-system-architecture/SKILL.md) | Architect semantic tokens, component foundations, themes and design-system governance. |
| [visual-reference-analysis](visual-reference-analysis/SKILL.md) | Translate screenshots and visual references into original product-specific design decisions. |

### Frontend engineering

| Skill | Purpose |
|---|---|
| [frontend-architecture](frontend-architecture/SKILL.md) | Plan application boundaries, routing, rendering, state ownership and data flow. |
| [component-engineering](component-engineering/SKILL.md) | Design reusable component APIs, interaction states and component tests. |
| [responsive-engineering](responsive-engineering/SKILL.md) | Engineer fluid layouts, touch behavior, zoom and responsive reflow. |
| [modern-css](modern-css/SKILL.md) | Maintain CSS cascade, tokens, layout primitives and accessible states. |
| [forms-and-validation](forms-and-validation/SKILL.md) | Build accessible forms with server-side validation and safe submission flows. |

### Motion and interaction

| Skill | Purpose |
|---|---|
| [gsap-fundamentals](gsap-fundamentals/SKILL.md) | Build scoped GSAP tweens and timelines with lifecycle cleanup. |
| [scrolltrigger-experiences](scrolltrigger-experiences/SKILL.md) | Build scroll-linked stories and responsive ScrollTrigger sequences. |
| [motion-design-systems](motion-design-systems/SKILL.md) | Define reusable motion tokens, timing, easing and interaction patterns. |
| [accessible-motion](accessible-motion/SKILL.md) | Implement reduced-motion alternatives and stable focus behavior. |
| [animation-performance](animation-performance/SKILL.md) | Profile and improve animation smoothness and rendering cost. |
| [interactive-storytelling](interactive-storytelling/SKILL.md) | Design narrative experiences that remain clear without animation. |

### Accessibility engineering

| Skill | Purpose |
|---|---|
| [wcag-auditing](wcag-auditing/SKILL.md) | Plan WCAG 2.2 audits and record evidence-based findings. |
| [semantic-accessibility](semantic-accessibility/SKILL.md) | Build meaningful HTML structure and accessible names. |
| [keyboard-focus](keyboard-focus/SKILL.md) | Implement keyboard operation and predictable focus behavior. |
| [screen-reader-testing](screen-reader-testing/SKILL.md) | Validate reading order, announcements and assistive-technology workflows. |
| [accessible-components](accessible-components/SKILL.md) | Implement accessible interactive components from established patterns. |
| [accessibility-automation](accessibility-automation/SKILL.md) | Integrate axe-core accessibility scans with browser tests and CI. |
| [accessibility-review](accessibility-review/SKILL.md) | Conduct release-focused accessibility reviews across input modes. |

### Web and API security

| Skill | Purpose |
|---|---|
| [secure-application-design](secure-application-design/SKILL.md) | Threat-model architecture, trust boundaries and security controls. |
| [authentication-sessions](authentication-sessions/SKILL.md) | Secure identity protocols, login, recovery and session lifecycle. |
| [authorization-access-control](authorization-access-control/SKILL.md) | Enforce object, function, property and tenant-level authorization. |
| [secure-input-output](secure-input-output/SKILL.md) | Validate untrusted input and handle output, files and URLs safely. |
| [api-security](api-security/SKILL.md) | Protect REST, GraphQL and webhook APIs against OWASP risks. |
| [secrets-configuration](secrets-configuration/SKILL.md) | Manage credentials and secure CI/CD configuration. |
| [security-testing](security-testing/SKILL.md) | Plan SAST, dependency, secret and dynamic security verification. |
| [security-review](security-review/SKILL.md) | Conduct application security and pre-release reviews. |

### Performance engineering

| Skill | Purpose |
|---|---|
| [core-web-vitals](core-web-vitals/SKILL.md) | Evaluate field Core Web Vitals and diagnose loading, responsiveness and visual stability. |
| [performance-auditing](performance-auditing/SKILL.md) | Establish repeatable performance baselines and evidence-based audit findings. |
| [javascript-performance](javascript-performance/SKILL.md) | Reduce bundle, main-thread, hydration and third-party JavaScript costs. |
| [image-asset-optimization](image-asset-optimization/SKILL.md) | Optimize responsive images, media delivery and layout stability. |
| [font-performance](font-performance/SKILL.md) | Improve font loading, fallback behavior and typography stability. |
| [network-caching](network-caching/SKILL.md) | Tune network delivery, CDN behavior and HTTP caching policies. |
| [rendering-performance](rendering-performance/SKILL.md) | Diagnose browser rendering, layout, paint and hydration bottlenecks. |
| [performance-testing](performance-testing/SKILL.md) | Define performance budgets and repeatable CI regression checks. |

## Format

Every skill must:

- Use the exact filename SKILL.md.
- Begin with YAML frontmatter containing name and description.
- Use a lowercase kebab-case name matching its parent directory.
- Explain both capability and activation conditions in the description.
- Provide actionable, concise instructions.
- Include verification criteria and honest limitations.
- Avoid unsafe or fabricated implementation guidance.

## Authoring approach

Use progressive disclosure. Keep the main skill focused on the workflow. Put lengthy reference material, templates or scripts in supporting files only when they materially improve execution.

Keep instructions portable. Do not assume a specific framework, shell, browser or paid tool unless the skill explicitly declares that requirement.

## Compatibility

The canonical source is not duplicated into vendor-specific folders in this repository. Copy the skill directories into the target project's documented skill location:

- Codex: .agents/skills/
- Claude Code: .claude/skills/
- GitHub Copilot: .github/skills/

See the root [README](../README.md#installation) for installation guidance.
