# Skills

This directory contains reusable AI agent skills.

Each skill lives in its own directory and must contain a `SKILL.md` file.

## Structure

```text
skills/
├── design-direction/
│   └── SKILL.md
├── anti-slop-ui/
│   └── SKILL.md
├── frontend-engineering/
│   └── SKILL.md
└── web-security/
    └── SKILL.md
```

## Skill requirements

Every skill must include YAML frontmatter with:

- `name`
- `description`

The name must match the directory name.

The description must explain the skill's purpose and activation conditions.

Skill instructions should be practical, testable and framework-aware.

## Compatibility

The repository maintains a common skill source.

Agent-specific discovery and installation conventions will be documented separately to avoid assuming that every agent loads skills from the same directory.
