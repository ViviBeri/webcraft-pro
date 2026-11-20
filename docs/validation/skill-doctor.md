# Skill Doctor

Skill Doctor reports cross-skill inconsistencies without modifying repository files. It complements, rather than replaces, the per-skill validator, stage coverage validator, routing corpus validator, and repository consistency checks.

## Commands

```sh
npm run test:skill-doctor
npm run validate:skill-doctor
node scripts/skill-doctor.mjs
node scripts/skill-doctor.mjs --json
node scripts/skill-doctor.mjs --strict
```

- Human-readable output is the default.
- `--json` writes only the versioned report to stdout.
- `--strict` escalates warnings to failures.
- No command applies automatic fixes.

## Diagnostic rules

| Rule | Severity | Meaning |
|---|---|---|
| `SKILL001` | warning | Two or more canonical skills have identical descriptions after whitespace and case normalization. |
| `SKILL002` | error | A Markdown link in a skill points to an unknown canonical `SKILL.md`. |

Description similarity is not inferred. Only exact normalized duplicates are reported.

## JSON contract

The canonical schema is [skill-doctor-report.v1.json](../schemas/skill-doctor-report.v1.json). The report uses `schemaVersion: "1.0"` and `tool: "webcraft-skill-doctor"`. Diagnostic order is deterministic: file, line (missing lines last), then rule ID.

Each diagnostic contains `ruleId`, `severity`, `file`, `message`, `relatedFiles`, and `fixHint`. A positive `line` is included when a source line is available. Summary counters must match the diagnostics array.

## Exit codes

| Mode | Exit 0 | Exit 1 | Exit 2 |
|---|---|---|---|
| Default | No errors; warnings/info allowed | One or more errors | Invalid CLI usage or execution failure |
| `--strict` | No errors or warnings | One or more errors or warnings | Invalid CLI usage or execution failure |

Tool errors always use exit code 2, including in strict mode.

## Ownership boundaries

- `scripts/validate-skills.mjs`: individual skill structure and required metadata.
- Stage coverage validator: stage membership and canonical stage links.
- Skill Doctor: cross-skill diagnostics and fix hints.
- Issue #16: repository-wide skill counts, version synchronization, and internal-link validation.

See [Issue #15](https://github.com/ViviBeri/webcraft-pro/issues/15) and [v1.6.0 decisions](../release/v1.6.0-decisions.md).
