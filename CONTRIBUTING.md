# Contributing to WebCraft Pro

Thank you for contributing.

We welcome improvements to design skills, frontend engineering, animation, accessibility, performance, security and testing.

## Contribution principles

- Submit practical, technically accurate improvements.
- Prefer reusable instructions over framework-specific assumptions.
- Avoid unnecessary dependencies.
- Include examples where they improve understanding.
- Verify claims against authoritative documentation.
- Respect the licenses of referenced projects.
- Do not introduce secrets, credentials or private data.

## Before submitting

1. Check existing issues and pull requests.
2. Identify the problem your change solves.
3. Keep changes focused.
4. Validate Markdown and skill metadata.
5. Test relevant examples.
6. Document important limitations.

## Skill requirements

Each skill must contain:

- A `SKILL.md` file.
- Valid YAML frontmatter.
- A meaningful name and description.
- Clear activation conditions.
- Actionable instructions.
- Verification requirements.
- Relevant references where necessary.

## Security contributions

Security recommendations must be supported by reliable sources.

Do not introduce:

- Hardcoded credentials.
- Insecure authentication examples.
- Unsafe shell execution.
- Unverified security claims.
- Vulnerable dependency configurations.

Report security vulnerabilities privately using the instructions in `SECURITY.md`.

## Pull requests

Use descriptive titles and explain:

- What changed.
- Why it changed.
- How it was validated.
- Any compatibility implications.

Keep pull requests focused and reviewable.

## Licensing

By contributing, you agree that your contributions are provided under the repository's MIT license, subject to applicable third-party licensing requirements.


## Testing the CLI Locally

Use Node.js 22.12.0 or higher.

### Link the CLI into a local test environment

From the WebCraft Pro repository root, run:

```bash
npm link
```

This creates a global development link to the current checkout and exposes the package's `webcraft` executable. It does not publish the package to npm. To test from a separate project, change that project's working directory and run:

```bash
webcraft install --agent claude
```

Use an empty disposable project directory so the installer test does not modify a real project. Repeat with `--agent codex` or `--agent copilot` when needed. To remove the global development link after testing, run `npm unlink --global webcraft-pro` from the package directory.

### Run installer tests

Run the installer's automated regression suite from the repository root:

```bash
npm run test:installer
```

This runs the Node.js test suite for argument parsing, selection, installation behavior, manifests, and safety cases. It does not prove that a third-party AI agent discovers or invokes an installed skill; record those as separate compatibility tests.

Before opening a pull request, also run the relevant repository validation commands and report exactly which checks were run and their results.

### Add a new skill

1. Read the [skill format and authoring guidance](skills/README.md#format).
2. Create `skills/<kebab-case-name>/SKILL.md` with YAML frontmatter containing `name` and `description`.
3. Write task-specific activation conditions, actionable steps, verification criteria, and honest limitations.
4. Add the skill to the appropriate category in `skills/README.md` and update any affected stage index or tests.
5. Run the baseline repository validation with `npm run validate` and the installer regression suite with `npm run test:installer`. Run any additional checks relevant to the changed files. Include evidence and note checks that were not performed.

Keep the canonical skill agent-neutral. Do not duplicate its contents into agent-specific directories.
