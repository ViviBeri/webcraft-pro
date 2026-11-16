# References and attribution

WebCraft Pro is independently authored. The repositories and standards below are research references. Their presence here does not imply endorsement, affiliation or permission to copy their content.

Repository existence, default branch and declared license metadata were checked when this file was updated. A repository's license may not cover every asset or third-party file; inspect the relevant license and notices before reuse.

## Design quality and interface critique

| Project | Focus | Declared repository license |
|---|---|---|
| [unslop](https://github.com/heydamir/unslop) | Product-specific visual direction and ordered interface refinement passes | CC-BY-4.0 |
| [taste-skill](https://github.com/Leonxlnx/taste-skill) | Visual direction, configurable design choices and specialized frontend workflows | MIT |

## Motion and interaction

| Project | Focus | Declared repository license |
|---|---|---|
| [scroll-craft](https://github.com/nateherkai/scroll-craft) | Visitor-journey planning, structural variety and scroll-driven visual verification | MIT |
| [GSAP Skills](https://github.com/greensock/gsap-skills) | Official agent guidance cross-check for core tweens, timelines, ScrollTrigger, framework lifecycle, plugins and performance | MIT |
| [GSAP documentation](https://gsap.com/docs/v3/) | Core tweens, timelines, context and responsive animation setup | Official documentation |
| [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia/) | Responsive and reduced-motion-aware animation contexts | Official documentation |
| [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | Scroll-linked timelines, pinning, scrub and trigger lifecycle | Official documentation |

## Web and API security

- [OWASP ASVS 5.0.0](https://asvs.owasp.org/) — stable application security verification requirements for web applications and services.
- [OWASP API Security Top 10 (2023)](https://owasp.org/www-project-api-security/) — API-specific security risks and mitigation guidance.
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/) — practical secure implementation guidance.
- [Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) — authentication and identity verification controls.
- [Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) — server-side access-control design.
- [Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html) — syntactic and semantic validation practices.

## Security, performance and testing

| Project | Focus | Declared repository license |
|---|---|---|
| [OWASP ASVS](https://github.com/OWASP/ASVS) | Application security verification requirements | CC-BY-SA-4.0 |
| [OWASP Cheat Sheet Series](https://github.com/OWASP/CheatSheetSeries) | Secure implementation guidance | CC-BY-SA-4.0 |
| [Google Lighthouse](https://github.com/GoogleChrome/lighthouse) | Performance, accessibility and best-practice auditing | Apache-2.0 |
| [Playwright](https://github.com/microsoft/playwright) | Cross-browser automation and end-to-end testing | Apache-2.0 |
| [OpenSSF Scorecard](https://github.com/ossf/scorecard) | Open-source supply-chain security checks | Apache-2.0 |

## Performance engineering

- [Web Vitals](https://web.dev/articles/vitals) — current field metrics, definitions and recommended thresholds.
- [Core Web Vitals threshold methodology](https://web.dev/articles/defining-core-web-vitals-thresholds) — p75 classification and threshold rationale.
- [Chrome DevTools Performance panel](https://developer.chrome.com/docs/devtools/performance/overview) — profiling, traces and local Core Web Vitals diagnostics.
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview) — controlled lab audits and performance diagnostics.
- [PageSpeed Insights](https://pagespeed.web.dev/) — field and lab performance reporting where data is available.
- [MDN HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching) — cache-control, validators and immutable asset caching.

## Agent Skills format and compatibility

- [Agent Skills specification](https://agentskills.io/specification) — portable skill folder, required metadata and progressive-disclosure format.
- [Codex AGENTS.md guidance](https://developers.openai.com/cookbook/examples/codex/iterating-development-workflows-with-codex) — repository-level instructions and project-local skill organization.
- [OpenAI Skills](https://github.com/openai/skills) — examples and authoring guidance for Codex skills.
- [GitHub Copilot agent skills](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills) — project skill locations, SKILL.md requirements and supported Copilot surfaces.
- [GitHub Copilot custom instructions](https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions) — repository-wide instructions and agent instruction file support.
- [Claude Code skills](https://code.claude.com/docs/en/skills) — Claude Code skill behavior and configuration.
- [VS Code Agent Skills](https://code.visualstudio.com/docs/agent-customization/agent-skills) — documented project skill locations for Codex, Claude and Copilot in VS Code.

## Accessibility engineering

- [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) — normative accessibility requirements and testable success criteria.
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) — design patterns and keyboard interaction guidance for custom widgets.
- [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing) — automated accessibility testing with axe-core and documented testing limitations.
- [axe-core](https://github.com/dequelabs/axe-core) — open-source accessibility testing engine.

## Frontend engineering and accessibility

- [MDN: CSS container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries) — component-responsive layout based on containing block dimensions, with fallback guidance.
- [MDN: CSS cascade](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction) — cascade origins, layers, specificity and precedence.
- [WAI: Labeling controls](https://www.w3.org/WAI/tutorials/forms/labels/) — explicit and implicit form label associations.
- [WAI: Form instructions](https://www.w3.org/WAI/tutorials/forms/instructions/) — accessible field instructions and expected formats.
- [WAI: Validating input](https://www.w3.org/WAI/tutorials/forms/validation/) — accessible validation feedback and the need for server-side validation.
- [Chrome for Developers: Modern Web Guidance](https://developer.chrome.com/docs/modern-web-guidance/guides) — implementation guidance for current web platform patterns, including forms.
- [web.dev: Learn Forms](https://web.dev/learn/forms) — form design, validation, accessibility, privacy, autofill and usability testing.
- [web.dev: Accessibility](https://web.dev/learn/design/accessibility) — semantic structure, keyboard navigation, focus and accessible content.
- [web.dev: Accessible responsive design](https://web.dev/articles/accessible-responsive-design) — responsive behavior, zoom, reading order and touch targets.

## Reuse and attribution policy

Before adapting or redistributing third-party code, documentation, examples, images or skill content:

1. Inspect the source repository's current license and the license of the specific file or asset.
2. Confirm that the intended reuse is permitted by that license.
3. Preserve copyright notices, attribution and change notices where required.
4. Record the source and modifications when adapting material.
5. Do not treat a repository's top-level license as permission to reuse files that carry separate terms.
6. Prefer independently written guidance that cites the source rather than copying substantial content.

WebCraft Pro does not claim ownership of the referenced projects and is not affiliated with their maintainers.

## Browser automation, quality and release

- [Playwright](https://github.com/microsoft/playwright) — Apache-2.0 — browser automation library for Chromium, Firefox and WebKit.
- [axe-core](https://github.com/dequelabs/axe-core) — MPL-2.0 — accessibility testing engine used through the Playwright integration.

- [Playwright best practices](https://playwright.dev/docs/best-practices) — user-visible assertions, isolated tests, resilient locators, and cross-browser projects.
- [Playwright CI](https://playwright.dev/docs/ci) — browser installation, CI worker settings and test execution guidance.
- [Playwright trace viewer](https://playwright.dev/docs/trace-viewer) — inspect action timelines, DOM snapshots, screenshots and network activity when debugging failures.
- [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing) — axe-core integration and the limits of automated accessibility checks.
- [Playwright visual comparisons](https://playwright.dev/docs/test-snapshots) — screenshot baselines and visual comparison configuration.
- [Lighthouse CI getting started](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/getting-started.md) — collect, assert and retain Lighthouse reports in CI.
- [Lighthouse CI assertions](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md#assertions) — configure route and audit assertions against a project baseline.
- [OpenSSF Scorecard](https://scorecard.dev/) — evaluate open-source supply-chain practices and understand the limits of individual checks.
- [Scorecard GitHub Action](https://github.com/ossf/scorecard-action) — official action inputs, permissions, publication behavior and SARIF reporting guidance.

## Agent interoperability

- [GitHub Copilot custom instructions](https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions) — repository instructions and shared `AGENTS.md` behavior across Copilot surfaces.
- [Claude Code project memory and AGENTS.md](https://code.claude.com/docs/en/memory) — project instruction files and importing shared instructions with `@path`.
- [Agent Skills specification](https://agentskills.io/specification) — canonical skill structure and metadata requirements.
