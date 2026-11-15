# Skills

WebCraft Pro skills are maintained as canonical, portable Agent Skills under this directory.

Each skill is a folder containing a SKILL.md with YAML frontmatter and task-specific instructions.

## Available skills

### Design intelligence

| Skill | Purpose |
|---|---|
| [design-direction](design-direction/SKILL.md) | Establish a product-specific visual direction and reusable design system. |
| [anti-slop-ui](anti-slop-ui/SKILL.md) | Audit and improve generic, repetitive or template-like interfaces. |
| [premium-landing-pages](premium-landing-pages/SKILL.md) | Build responsive marketing and product landing pages with working conversion paths. |
| [visual-design-review](visual-design-review/SKILL.md) | Review rendered interfaces, responsive behavior, accessibility and interactions. |

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
