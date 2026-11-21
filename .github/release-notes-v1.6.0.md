# WebCraft Pro v1.6.0 — Technical Excellence & International Adoption

We are proud to announce v1.6.0. This release focuses on making WebCraft Pro easier to use, more trustworthy, and more deeply integrated with modern developer workflows.

## 🚀 New Features

- **Selective Installer:** Install specific skills with `--skills` and `--stage` instead of installing all 44 skills every time.
- **npx Distribution:** Install the published package with `npx webcraft-pro install --agent claude` without cloning the repository.
- **Skill Doctor:** From a repository checkout, run `node scripts/skill-doctor.mjs` to validate skill metadata and report duplicate descriptions and unresolved inter-skill references. The published npm package does not include this repository script. Strict mode is available through `npm run validate:skill-doctor` when working in the repository.
- **Agent Compatibility Matrix:** Added a structured test procedure and evidence requirements for Claude Code, GitHub Copilot, and OpenAI Codex. All three remain explicitly **Not tested** until real agent and browser evidence is available.

## 🛡️ Engineering & CI Architecture

- **Markdown Link Checker:** Added a zero-dependency Markdown link and anchor checker, including handling for GitHub-style heading anchors and edge cases.
- **Version & Skill Synchronization:** Added CI validation to prevent package/lockfile/README version drift and canonical skill-count mismatches.
- **Repository Validation:** Expanded automated checks for skill metadata, stage coverage, installer behavior, routing evaluation data, and internal links.
- **CI Reliability:** Required repository, Chromium keyboard/focus, and security-pattern checks run on pull requests targeting `main`.

## 🔒 Security & Reliability

- **Installer Hardening:** Added destination preflight checks, per-destination manifest locks, atomic manifest writes, rollback handling, and safeguards against overwriting existing skill directories without explicit permission.
- **Security Pattern Audit:** Added a zero-dependency static audit of Markdown code examples, with scanner tests and a retained JSON report artifact. This is a focused pattern audit, not a complete application security assessment.

## 📚 Documentation

- **5-Minute QuickStart:** Reworked onboarding around the published CLI installation path and documented the GitHub-hosted fallback.
- **Contributor Onboarding:** Added issue templates and contributor instructions for repository validation and npm package testing.
- **Compatibility Transparency:** Documented agent-specific install destinations, reproducible test prompts, evidence requirements, and conservative status definitions.

## ⚠️ Deferred to v1.6.1

- Complete the remaining 41 skill-specific failure-mode updates in reviewable batches of approximately 10 skills per PR.
- Run live Claude Code, GitHub Copilot, and Codex compatibility sessions and update the matrix only with reproducible evidence.
- Complete landing-page CSS visual polish.

**Full Changelog:** [v1.5.1...v1.6.0](https://github.com/ViviBeri/webcraft-pro/compare/v1.5.1...v1.6.0)
