# WebCraft Pro — Public Claims Register

Use this register before changing the README, website, release notes, or marketing copy. Every factual capability claim needs current evidence and an explicit limitation.

| Public claim | Status | Evidence / limitation |
|---|---|---|
| 44 reusable skills | Verified | Canonical `skills/*/SKILL.md` inventory and `scripts/validate-skill-count.mjs`; rerun after skill changes |
| 8 lifecycle stages | Verified | Eight stage README files under `stages/`; not a claim that every project follows all stages |
| Framework-agnostic skills | Verified as design intent | Canonical skills are shared across agent destinations; individual skills may discuss specific technologies |
| Dependency-free installer runtime | Verified by implementation | Installer uses Node.js standard-library modules; browser QA dependencies are development-only |
| Security pattern audit | Verified with limited scope | Static scanner checks selected patterns in Markdown code fences; not a full application security scanner |
| Accessibility keyboard tests | Verified with limited scope | Playwright tests cover selected fixtures and keyboard/focus behavior; do not prove WCAG conformance |
| Browser checker | Verified with limited scope | On-demand Playwright/axe-core checks selected pages/viewports; manual review remains necessary |
| Routing evaluation corpus | Verified as scaffolding | Static validator checks corpus structure and mappings; no live model-routing accuracy is measured |
| Benchmark effectiveness | Not established | Current example is illustrative, not captured model output or a reproducible benchmark |
| Agent compatibility | Not yet verified by this baseline | Verify each agent only after installation, discovery, invocation, and output validation |
| Complete showcase applications | Not present in baseline | Existing examples are templates, fixtures, and focused examples; do not claim complete showcase apps |

## Claim review rules

- Link each new or changed claim to a repository file, workflow run, release artifact, or reproducible test.
- State the scope and limitations of automated checks.
- Do not convert planned work into present-tense capability claims.
- Do not use a single aggregate score unless dimensions, weights, methodology, and limitations are documented.
- Recheck claims before every release.
