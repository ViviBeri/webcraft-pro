# Skill Doctor

Skill Doctor reports cross-skill inconsistencies without modifying repository files. It complements, rather than replaces, the per-skill validator, stage coverage validator, routing corpus validator, and repository consistency checks.

## Commands

\`\`\`sh
npm run test:skill-doctor
npm run validate:skill-doctor
node scripts/skill-doctor.mjs
node scripts/skill-doctor.mjs --json
node scripts/skill-doctor.mjs --strict
\`\`\`

- Human-readable output is the default.
- \`--json\` writes only the versioned report to stdout.
- \`--strict\` escalates warnings to failures.
- No command applies automatic fixes.

## Validation ownership

- \`scripts/validate-skills.mjs\` owns individual skill structure and frontmatter parsing.
- Skill Doctor invokes that validator as a subprocess with \`--json\`; it does not parse frontmatter or provide a fallback parser.
- Skill Doctor owns only cross-skill duplicate-description and broken-reference diagnostics.
- Stage coverage owns stage membership and canonical stage links.
- Issue #16 owns repository-wide skill counts, version synchronization, and general internal-link validation.

## Diagnostic rules

| Rule | Severity | Meaning |
|---|---|---|
| \`SKILL001\` | warning | Two or more canonical skills have identical descriptions after whitespace and case normalization. |
| \`SKILL002\` | error | An explicit Markdown link in a skill does not resolve to an existing canonical skill file. |

Description similarity is not inferred. Only exact normalized duplicates are reported.

### Canonical inter-skill references

A reference is valid only when its destination, resolved relative to the referring \`SKILL.md\`, normalizes to an existing \`skills/<name>/SKILL.md\` path.

- Relative Markdown links to canonical skill files are checked.
- Absolute filesystem paths, paths outside the skills tree, and non-canonical nested paths are diagnostics.
- External URLs, anchor-only destinations, prose mentions, and fenced-code examples are ignored.
- The rule does not scan arbitrary prose for skill-name mentions.

## JSON contract

The canonical schema is [skill-doctor-report.v1.json](../schemas/skill-doctor-report.v1.json). The report uses \`schemaVersion: "1.0"\` and \`tool: "webcraft-skill-doctor"\`. Diagnostic order is deterministic: file, line (missing lines last), then rule ID.

Each diagnostic contains \`ruleId\`, \`severity\`, \`file\`, \`message\`, \`relatedFiles\`, and \`fixHint\`. A positive \`line\` is included when a source line is available. Summary counters must match the diagnostics array.

## Exit codes

| Mode | Exit 0 | Exit 1 | Exit 2 |
|---|---|---|---|
| Default | No errors; warnings/info allowed | One or more errors | Invalid CLI usage or execution failure |
| \`--strict\` | No errors or warnings | One or more errors or warnings | Invalid CLI usage or execution failure |

Tool errors always use exit code 2, including in strict mode.

See [Issue #15](https://github.com/ViviBeri/webcraft-pro/issues/15) and [v1.6.0 decisions](../release/v1.6.0-decisions.md).
