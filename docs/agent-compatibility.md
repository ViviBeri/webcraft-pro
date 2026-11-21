# Agent compatibility matrix

**Audit date:** 2026-11-21  
**Release scope:** v1.6.0  
**Status policy:** Installation-path documentation is not proof of agent compatibility. No row is marked Verified until installation, discovery, invocation, and output validation have all passed with reproducible evidence.

## Compatibility summary

| Agent | Expected project skill path | Agent version | Test date | Status |
|---|---|---|---|---|
| OpenAI Codex | `.agents/skills/` | Not recorded | Not tested | **Not tested** |
| Claude Code | `.claude/skills/` | Not recorded | Not tested | **Not tested** |
| GitHub Copilot | `.github/skills/` | Not recorded | Not tested | **Not tested** |

The paths above are the repository's documented installer destinations. They do not establish that a particular agent version discovers or invokes the skill.

## Reproducible test case

Use the canonical `keyboard-focus` skill for all three agents so the task and acceptance criteria remain comparable.

### Installation

From the WebCraft Pro repository root, install only the test skill into the target project:

```bash
node scripts/install-skills.mjs --agent codex --skills keyboard-focus --target /path/to/fixture-project
node scripts/install-skills.mjs --agent claude --skills keyboard-focus --target /path/to/fixture-project
node scripts/install-skills.mjs --agent copilot --skills keyboard-focus --target /path/to/fixture-project
```

Run each command in a separate clean fixture project. Do not mix agent destinations in one test run. Confirm that the destination contains `keyboard-focus/SKILL.md` and that the file content matches the canonical repository file.

### Discovery and invocation prompt

After installation, open a fresh agent session in the fixture project and submit this prompt without pasting the skill contents into the conversation:

> Use the installed WebCraft Pro keyboard-focus skill. Review the following CSS reset and component styles. Identify the keyboard-focus regression, explain the user impact, and propose a minimal accessible correction with a browser verification checklist.
>
> ```css
> * { outline: none; }
> .button { background: #174ea6; color: white; }
> .button:focus { box-shadow: none; }
> ```

Record whether the agent independently discovers and applies the installed skill. If the agent requires the user to name or open the file manually, record that as a discovery limitation; do not mark discovery as passed.

### Output acceptance criteria

The response passes only if it:

1. Identifies that the global reset removes the browser's visible focus indicator.
2. Does not recommend leaving keyboard users without a visible focus state.
3. Recommends a clear `:focus-visible` treatment with sufficient contrast and a non-obscured indicator.
4. Preserves a usable fallback for browsers or controls where the preferred selector is unavailable.
5. Includes verification using keyboard-only navigation and checks that focus remains visible on the button.

A reviewer must inspect the proposed CSS and run the verification in a real browser before marking output validation as passed. A textual checklist alone is not browser evidence.

## Per-agent evidence record

For each run, attach or link:

- Agent product and exact version/build.
- Test date and operating system.
- Installation command and terminal/result evidence (redact local usernames and private paths).
- Screenshot or transcript showing discovery without manually supplying the skill text.
- Prompt and complete agent response.
- Reviewer decision against all five output criteria.
- Browser evidence for the final focus treatment.
- Limitations, setup requirements, and any manual discovery steps.

Use one record per agent. Keep failed attempts; do not replace them with a later passing run without documenting the change.

## Status definitions

| Status | Required evidence |
|---|---|
| **Verified** | Installation, automatic discovery, representative invocation, all output criteria, and browser verification pass. |
| **Partial** | Some stages pass, but at least one stage is incomplete or has a documented limitation. |
| **Not tested** | No reproducible end-to-end run has been completed. |

## Current limitations

- No Codex, Claude Code, or GitHub Copilot end-to-end run is recorded in this repository as of the audit date.
- Agent versions and operating-system versions have not been captured.
- The repository's static routing evaluation validates prompt-to-skill fixture data only; it does not prove live agent routing.
- Installer tests validate file placement and safety behavior, not agent discovery or invocation.
- Do not advertise any agent as Verified until its evidence record is complete.

## Update procedure

After a test is completed, update only that agent's row and add its evidence record below. Keep the status conservative. Link durable, reviewable evidence rather than an unsupported assertion or an unshared local screenshot.
