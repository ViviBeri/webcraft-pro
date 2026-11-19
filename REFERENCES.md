# References and standards

WebCraft Pro is an independently authored engineering toolkit. This directory points to authoritative standards, official platform documentation and product documentation used to validate technical guidance. References do not imply endorsement or affiliation.

## Frontend platform and architecture

- [MDN Web Docs](https://developer.mozilla.org/) — authoritative web platform reference for HTML, CSS, JavaScript and browser APIs.
- [Chrome for Developers: Modern Web Guidance](https://developer.chrome.com/docs/modern-web-guidance/) — current implementation guidance for modern web applications.
- [Angular documentation: Dependency Injection](https://angular.dev/guide/di) — official explanation of dependency injection concepts and explicit dependency boundaries.
- [web.dev](https://web.dev/) — practical guidance for building fast, accessible and resilient web experiences.

## Optional Visual Builders (Human-in-the-loop)

These tools may be used by humans to create or edit website layouts and generate HTML/CSS. They are optional references, not required WebCraft Pro dependencies. AI agents reviewing exported code should follow the guardrails in the frontend architecture skill and shared frontend engineering standard.

- [GrapesJS](https://github.com/GrapesJS/grapesjs) — embeddable, open-source visual web builder. License: BSD-3-Clause.
- [HugoBlox Kit](https://github.com/HugoBlox/kit) — reusable website-building kit for HugoBlox projects. License: MIT.
- [Webstudio](https://github.com/webstudio-is/webstudio) — visual website development platform. License: AGPL-3.0-or-later; review its obligations before copying or distributing any of its code.
- [VvvebJs](https://github.com/givanz/VvvebJs) — drag-and-drop website builder written in JavaScript. License: Apache-2.0.

Listing a project does not imply endorsement, affiliation, or permission to reuse its code or assets. Verify the current license and applicable notices in each upstream repository before reuse.

## Design systems and interface quality

- [W3C Design Tokens Community Group](https://www.w3.org/community/design-tokens/) — community group work on interoperable design-token formats.
- [MDN CSS guides](https://developer.mozilla.org/en-US/docs/Web/CSS) — normative platform behavior and practical CSS reference.
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) — contrast-ratio evaluation for text and interface colors.
- [Google Fonts](https://fonts.google.com/) — font catalog and family/weight metadata. Review each font's license before distribution or self-hosting.

## Motion and interaction

- [GSAP documentation](https://gsap.com/docs/v3/) — official API reference for tweens, timelines, contexts and plugins.
- [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia/) — responsive animation contexts and preference-aware setup.
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) — scroll-linked animation, pinning, scrubbing and lifecycle behavior.
- [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) — platform preference for reduced motion.

## Accessibility engineering

- [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) — normative accessibility requirements and testable success criteria.
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) — patterns and keyboard interaction guidance for custom widgets.
- [WAI Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/) — accessible labels, instructions and validation.
- [axe-core documentation](https://github.com/dequelabs/axe-core) — automated accessibility testing engine and rule documentation.
- [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing) — official guidance for automated accessibility checks and their limitations.

## Web and API security

- [OWASP ASVS 5.0.0](https://asvs.owasp.org/) — application security verification requirements for web applications and services.
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/) — API-specific security risks and mitigation guidance.
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/) — practical secure implementation guidance.
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) — authentication and identity verification controls.
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) — access-control design.
- [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html) — syntactic and semantic validation practices.

## Performance engineering

- [Google Core Web Vitals](https://web.dev/articles/vitals) — user-centric loading, interactivity and visual-stability metrics with current thresholds.
- [Core Web Vitals threshold methodology](https://web.dev/articles/defining-core-web-vitals-thresholds) — percentile-based classification and threshold rationale.
- [Chrome DevTools Performance panel](https://developer.chrome.com/docs/devtools/performance/overview) — profiling, traces and local performance diagnostics.
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview) — controlled lab audits and performance diagnostics.
- [PageSpeed Insights](https://pagespeed.web.dev/) — field and lab performance reporting where data is available.
- [MDN HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching) — cache-control, validators and immutable asset caching.

## Browser QA and release

- [Playwright documentation](https://playwright.dev/docs/intro) — official browser automation documentation for Chromium, Firefox and WebKit.
- [Playwright best practices](https://playwright.dev/docs/best-practices) — user-visible assertions, isolated tests and resilient locators.
- [Playwright CI](https://playwright.dev/docs/ci) — browser installation and CI execution guidance.
- [Playwright trace viewer](https://playwright.dev/docs/trace-viewer) — inspect action timelines, DOM snapshots, screenshots and network activity.
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) — continuous performance measurement and assertions.
- [OpenSSF Scorecard](https://scorecard.dev/) — open-source supply-chain security checks and their limitations.

## Community Standards & Snippet Libraries

- [Front-End Performance Checklist](https://github.com/thedaviddias/Front-End-Performance-Checklist) — community checklist covering HTML, CSS, fonts, images, JavaScript and performance tooling; required reading for Stage 7 audits.
- [HEAD](https://github.com/joshbuchea/HEAD) — comprehensive catalog of HTML `<head>` elements, recommended ordering, metadata, social tags, links and icons; use alongside the WHATWG HTML standard for normative validity.
- [30 seconds of code](https://github.com/Chalarangelo/30-seconds-of-code) — recommended snippet library for Stage 3 frontend patterns and Stage 4 motion-related implementation research. Verify snippets against the target runtime and current APIs before use. Its code snippets are CC-BY-4.0; provide attribution and preserve applicable notices when reusing them. Do not copy site content, images, branding or other non-code material without permission.

## Industry Tooling & Standards

### Stage 3 — Frontend architecture

- [HEAD](https://github.com/joshbuchea/HEAD) — comprehensive HTML document-head reference for metadata, social previews, links and icons.
- [30 seconds of code](https://github.com/Chalarangelo/30-seconds-of-code) — supplementary, attributed code-snippet research for frontend implementation.
- [Angular Dependency Injection](https://angular.dev/guide/di) — official framework documentation describing dependency injection and explicit service boundaries. The concepts can inform decoupled frontend architecture without requiring Angular.

### Stage 6 — API security verification

- [HTTPie documentation](https://httpie.io/docs/cli) — command-line HTTP client for manual API requests and response inspection.
- [Hoppscotch documentation](https://docs.hoppscotch.io/) — API client documentation for manually exercising requests, authorization and response contracts.

### Agent interoperability

- [Agent Skills specification](https://agentskills.io/specification) — portable skill structure and metadata requirements.
- [GitHub Copilot custom instructions](https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions) — repository-wide agent instruction support.
- [Claude Code skills](https://code.claude.com/docs/en/skills) — official skill behavior and configuration.
- [VS Code Agent Skills](https://code.visualstudio.com/docs/agent-customization/agent-skills) — documented project skill locations and compatibility.

## Source and reuse policy

- Prefer standards bodies, official product documentation and primary platform documentation for technical requirements.
- Verify version-specific behavior against the documentation for the installed tool or runtime.
- Review applicable licenses and notices before redistributing third-party code, documentation, fonts, images or other assets.
- Keep WebCraft Pro guidance independently authored; cite authoritative requirements without copying substantial third-party material.
