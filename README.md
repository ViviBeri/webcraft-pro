<div align="center">

# WebCraft Pro

**Design with intention. Engineer with discipline. Secure by default.**

Framework-agnostic Agent Skills for building distinctive, accessible, performant and secure websites.

[![Validate Repository](https://github.com/ViviBeri/webcraft-pro/actions/workflows/validate.yml/badge.svg)](https://github.com/ViviBeri/webcraft-pro/actions/workflows/validate.yml)
[![GitHub stars](https://img.shields.io/github/stars/ViviBeri/webcraft-pro?style=flat)](https://github.com/ViviBeri/webcraft-pro/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/ViviBeri/webcraft-pro?style=flat)](https://github.com/ViviBeri/webcraft-pro/network/members)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Agent Skills](https://img.shields.io/badge/Format-Agent%20Skills-6f42c1)](https://agentskills.io/)

[Explore skills](#available-skills) · [Install](#installation) · [Contribute](CONTRIBUTING.md) · [Report a vulnerability](SECURITY.md)

</div>

---

## What is WebCraft Pro?

WebCraft Pro is an open-source collection of reusable **Agent Skills** for the website delivery lifecycle: visual direction, interface quality, frontend architecture, responsive implementation, forms, motion design, accessibility, performance, browser verification and application security.

It gives coding agents structured, task-specific engineering guidance instead of relying on vague prompts. The skills follow the open Agent Skills format and are maintained as one canonical source.

**The project is framework-agnostic.** Choose tools based on the product and existing codebase—not because a skill assumes one framework.

## Why use it?

- **Design with purpose:** establish a visual system that reflects the product and audience.
- **Avoid generic UI:** identify interchangeable layouts, filler copy and decoration without function.
- **Build maintainable frontends:** make deliberate architecture and component decisions.
- **Support real devices:** engineer responsive behavior, accessible forms and resilient CSS.
- **Use purposeful motion:** create meaningful transitions and scroll experiences with accessible fallbacks.
- **Verify the result:** review rendered pages, keyboard behavior and real viewport sizes.
- **Reuse one skill source:** keep portable instructions in the standard SKILL.md format.

## Available skills

### Design intelligence

| Skill | What it does |
|---|---|
| [design-direction](skills/design-direction/SKILL.md) | Defines visual direction, design tokens, hierarchy and responsive design principles. |
| [anti-slop-ui](skills/anti-slop-ui/SKILL.md) | Audits generic or repetitive interfaces and replaces weak design decisions with product-specific solutions. |
| [premium-landing-pages](skills/premium-landing-pages/SKILL.md) | Plans and implements conversion-focused, responsive marketing and product pages. |
| [visual-design-review](skills/visual-design-review/SKILL.md) | Reviews rendered pages, responsive layouts, accessibility and interactions using observable evidence. |

### Frontend engineering

| Skill | What it does |
|---|---|
| [frontend-architecture](skills/frontend-architecture/SKILL.md) | Evaluates application boundaries, routing, rendering, state ownership and data flow. |
| [component-engineering](skills/component-engineering/SKILL.md) | Designs reusable component APIs, state behavior, semantic interactions and focused tests. |
| [responsive-engineering](skills/responsive-engineering/SKILL.md) | Builds and audits fluid layouts, viewport behavior, touch interactions, zoom and reflow. |
| [modern-css](skills/modern-css/SKILL.md) | Applies maintainable cascade strategy, design tokens, layout primitives and user preferences. |
| [forms-and-validation](skills/forms-and-validation/SKILL.md) | Builds accessible forms with server-enforced validation, safe submission and useful errors. |

### Motion and interaction

| Skill | What it does |
|---|---|
| [gsap-fundamentals](skills/gsap-fundamentals/SKILL.md) | Builds scoped GSAP tweens and timelines with predictable lifecycle cleanup. |
| [scrolltrigger-experiences](skills/scrolltrigger-experiences/SKILL.md) | Creates scroll-linked storytelling and pinned sequences without scroll hijacking. |
| [motion-design-systems](skills/motion-design-systems/SKILL.md) | Defines reusable motion tokens, timing, easing and interaction patterns. |
| [accessible-motion](skills/accessible-motion/SKILL.md) | Implements reduced-motion alternatives, stable focus and accessible animation behavior. |
| [animation-performance](skills/animation-performance/SKILL.md) | Profiles and improves animation smoothness, rendering cost and lifecycle reliability. |
| [interactive-storytelling](skills/interactive-storytelling/SKILL.md) | Designs narrative pages that remain understandable without animation. |

See [skills/README.md](skills/README.md) for the complete index and authoring rules. See [motion examples](examples/motion/README.md) for implementation patterns.

## Installation

Each skill is a folder containing a SKILL.md. The canonical source is skills/<skill-name>/.

Clone the repository:

```bash
git clone https://github.com/ViviBeri/webcraft-pro.git
cd webcraft-pro
```

Copy the skills into the project-level directory supported by your coding agent.

| Agent | Project skill directory |
|---|---|
| OpenAI Codex | .agents/skills/ |
| Claude Code | .claude/skills/ |
| GitHub Copilot | .github/skills/ |

For example, install all skills for Codex:

```bash
mkdir -p .agents/skills
cp -R skills/* .agents/skills/
```

For Claude Code, use .claude/skills/ as the destination. For GitHub Copilot, use .github/skills/.

These are project-local installation paths. Follow the target agent's current documentation for personal/global installation and supported client versions. The source files remain portable; discovery paths are client-specific.

## Validate the repository

Requirements: Node.js 20 or later.

```bash
npm run validate
```

The validator checks each skill directory for a SKILL.md, required frontmatter fields, naming consistency, duplicate names and non-empty instructions.

## Design and engineering principles

Every skill should:

1. State when it should be used and what outcome it supports.
2. Give an actionable workflow rather than generic advice.
3. Respect the existing stack and project conventions.
4. Avoid fabricated product claims, metrics, testimonials or credentials.
5. Include responsive, accessibility and security considerations relevant to the task.
6. Define how to verify the work and report limitations honestly.

See [Design Quality Standard](standards/design-quality.md), [Frontend Engineering Standard](standards/frontend-engineering.md) and [Motion Engineering Standard](standards/motion-engineering.md) for shared review baselines.

## Roadmap

| Area | Status |
|---|---|
| Design direction and visual systems | Available |
| Anti-generic UI review | Available |
| Premium landing pages | Available |
| Visual design review | Available |
| Frontend architecture | Available |
| Component engineering | Available |
| Responsive engineering | Available |
| Modern CSS | Available |
| Forms and validation | Available |
| GSAP fundamentals and timelines | Available |
| ScrollTrigger experiences | Available |
| Motion design systems | Available |
| Accessible motion and reduced-motion behavior | Available |
| Animation performance | Available |
| Interactive storytelling | Available |
| Accessibility engineering | Planned |
| Web and API security | Planned |
| Performance engineering | Planned |
| Browser automation and QA | Planned |

Roadmap status reflects files currently maintained in this repository. It is not a claim of certification or guaranteed output quality.

## Project quality checks

GitHub Actions validates skill metadata on pushes and pull requests. The workflow uses read-only repository permissions and pins its external checkout action to a full commit SHA.

The project intends to add automated checks for:

- Full Agent Skills specification compliance.
- Markdown and link integrity.
- Example validation.
- Accessibility and browser regression testing.
- Dependency and supply-chain security.

Only checks present in the repository's workflows should be treated as active.

## References and attribution

WebCraft Pro is independently authored. We study established projects and standards for ideas, workflows and technical guidance; we do not assume that public source code is free to copy.

See [REFERENCES.md](REFERENCES.md) for the checked reference repositories, their declared licenses and attribution requirements.

## Contributing

Contributions are welcome, especially reproducible improvements, framework-neutral guidance, practical examples and security corrections.

- Read [CONTRIBUTING.md](CONTRIBUTING.md).
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md).
- Report vulnerabilities using [SECURITY.md](SECURITY.md).
- Open an issue for a focused proposal or bug report.

## License

The original project materials are distributed under the [MIT License](LICENSE), except where a file or third-party material states otherwise. Third-party references retain their own licenses and attribution requirements.

---

If WebCraft Pro is useful in your workflow, consider **starring the repository** or contributing a tested improvement. Stars help other developers discover the project; useful skills and reliable maintenance are what make them stay.

<div align="center">

**WebCraft Pro**  
*Better interfaces. Better engineering. Safer releases.*

</div>
