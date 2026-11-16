# Stage 1 — Foundation

## Purpose

Provide one portable source of truth for WebCraft Pro, clear installation paths, a reliable skill format, validation and interoperable entry points for Codex, Claude Code and GitHub Copilot.

## Canonical assets

- [Shared agent instructions](../../AGENTS.md)
- [Claude Code adapter](../../CLAUDE.md)
- [GitHub Copilot adapter](../../.github/copilot-instructions.md)
- [Repository overview](../../README.md)
- [Canonical skill index](../../skills/README.md)
- [Skill metadata validator](../../scripts/validate-skills.mjs)
- [Validation workflow](../../.github/workflows/validate.yml)
- [References and attribution](../../REFERENCES.md)

## Architecture decisions

- `AGENTS.md` is the shared agent-neutral instruction source.
- `CLAUDE.md` imports the shared file; it does not maintain a parallel ruleset.
- `.github/copilot-instructions.md` is Copilot's repository entry point and delegates shared rules to `AGENTS.md`.
- Codex reads the root `AGENTS.md`.
- Skills remain in the portable `skills/<name>/SKILL.md` format.
- Stage folders are indexes and acceptance records, not duplicate skill stores.

## Known gaps to close

- Audit the existing installer and plugin/manifest story against the source archive before claiming packaging parity.
- Verify each agent's current discovery and installation paths against official documentation.
- Expand validation beyond skill metadata only when the repository has real fixtures and testable behavior.
- Confirm that all root and stage indexes remain synchronized.

## Acceptance gate

- [x] One shared agent-neutral instruction file exists.
- [x] Claude Code imports the shared instructions.
- [x] GitHub Copilot has repository-wide instructions.
- [x] Codex has a root `AGENTS.md`.
- [x] The eight-stage architecture has one shared index.
- [ ] Installer and plugin manifests are audited and documented.
- [ ] Skill format and discovery paths are verified against current official specifications.
- [ ] Validation coverage and limitations are documented and tested.

A checked item records repository presence, not an external compatibility guarantee. Complete the remaining checks before marking Stage 1 fully accepted.
