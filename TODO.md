# TODO

This file is the repository's source of truth for the consolidated outstanding documentation and acceptance work. No `TODO.md` or `ROADMAP.md` existed at the repository root before this file was added.

## Stage 5 — Accessibility Engineering

- [ ] Make the WCAG target and audit scope explicit. (stages/05-accessibility/README.md)
- [ ] Prefer native semantics over unnecessary ARIA. (stages/05-accessibility/README.md)
- [ ] Test keyboard and focus behavior for critical journeys. (stages/05-accessibility/README.md)
- [ ] Name the browser and assistive-technology combinations used for screen-reader checks. (stages/05-accessibility/README.md)
- [ ] Ensure automated scans are not presented as proof of conformance. (stages/05-accessibility/README.md)
- [ ] Ensure findings include the criterion, impact, evidence and retest result. (stages/05-accessibility/README.md)

## Stage 6 — Web and API Security

- [ ] Preserve existing ASVS mappings, API Top 10 mappings, checklists, scanners and header checks unless a concrete defect is found. (stages/06-web-api-security/README.md)
- [ ] Verify scanner behavior, scope, false-positive handling and safe defaults. (stages/06-web-api-security/README.md)
- [ ] Map controls to current authoritative OWASP guidance. (stages/06-web-api-security/README.md)
- [ ] Keep versioned requirements and mappings explicit. (stages/06-web-api-security/README.md)
- [ ] Distinguish static checks from dynamic testing and manual review. (stages/06-web-api-security/README.md)
- [ ] Avoid claiming a clean security posture from a limited scanner result. (stages/06-web-api-security/README.md)

## Stage 7 — Performance Engineering

- [ ] Clearly distinguish field metrics from lab diagnostics. (stages/07-performance/README.md)
- [ ] Include percentile and sampling context with thresholds. (stages/07-performance/README.md)
- [ ] Use repeatable routes, viewports and conditions for audits. (stages/07-performance/README.md)
- [ ] Tie optimizations to measured bottlenecks. (stages/07-performance/README.md)
- [ ] Calibrate budgets against a baseline and measurement noise. (stages/07-performance/README.md)
- [ ] Avoid inferring performance claims from a Lighthouse score alone. (stages/07-performance/README.md)

## Stage 8 — Browser Automation, QA and Release

- [ ] Support an explicit target URL or local-server configuration in the runner. (stages/08-browser-qa-release/README.md)
- [ ] Make three viewport profiles configurable and produce traceable screenshots. (stages/08-browser-qa-release/README.md)
- [ ] Make reduced-motion and keyboard checks repeatable. (stages/08-browser-qa-release/README.md)
- [ ] Review and refine the keyboard focus check for edge cases in complex single-page applications, including dynamically updated focus order and route transitions. (scripts/browser-checker.mjs)
- [ ] Cover meaningful route and interaction states with axe scans. (stages/08-browser-qa-release/README.md)
- [ ] Document cross-browser coverage and exclusions. (stages/08-browser-qa-release/README.md)
- [ ] Make Lighthouse CI assertions configurable and retain reports safely. (stages/08-browser-qa-release/README.md)
- [ ] Verify Scorecard workflow permissions and SARIF handling. (stages/08-browser-qa-release/README.md)
- [ ] Include smoke tests, deployment health and rollback in the release checklist. (stages/08-browser-qa-release/README.md)
- [ ] Test templates in a sample application before describing them as production-ready. (stages/08-browser-qa-release/README.md)

## Benchmarking and evaluation

- [ ] Build a reproducible evaluation script that sends the same task prompt to a selected model with and without the relevant WebCraft Pro skills, renders or packages both outputs into the same test fixture, runs identical Playwright and axe-core checks, and reports comparable metrics (for example, violations, keyboard/focus failures, task completion, and run metadata). Record model/version, settings, prompt, repetitions, and limitations; do not present a single run as statistically conclusive.

## Existing documentation gaps

- [ ] Reconcile the planned example applications in `examples/README.md` with the example applications actually present in the repository. (examples/README.md; repository tree)
- [ ] Fill the blank frontend templates or label them explicitly as template-only: `architecture-decision-record.md`, `component-contract-matrix.md` and `responsive-verification-matrix.md`. (examples/frontend/architecture-decision-record.md; examples/frontend/component-contract-matrix.md; examples/frontend/responsive-verification-matrix.md)
- [ ] Decide later whether `assets/layout-decks.json` is needed; the file does not currently exist. (repository tree)

## v1.1.0 Roadmap — Design and Storytelling Quality

These items define product-specific design and storytelling capabilities for WebCraft Pro v1.1.0. They are roadmap commitments only; do not implement them as part of the current release.

- [ ] **Design Uniqueness Gate** — Add a review gate that compares a proposed page against existing designs across meaningful dimensions (such as page grammar, navigation, hero treatment, action structure, closing section and signature interaction). Require clear differentiation rather than superficial color or copy changes.
- [ ] **Eight Page Grammars** — Document eight reusable page-structure patterns for distinct storytelling and user-journey goals. Include guidance on when to choose each grammar and how to adapt it without forcing a single visual style.
- [ ] **Signature Interaction Requirement** — Require each applicable immersive page concept to define one distinctive, purposeful interaction that reinforces its story or product value. Document its expected behavior, reduced-motion alternative, accessibility considerations and verification criteria.

