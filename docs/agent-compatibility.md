# Agent compatibility matrix

**Audit date:** 2026-11-21  
**Release scope:** v1.6.0  
**Status policy:** Documented destination paths are not proof of agent compatibility. No row is marked Verified until installation, automatic discovery, invocation, output validation, and browser verification have all passed with reproducible evidence.

## Compatibility summary

| Agent | Expected project skill path | Agent version | Test date | Status |
|---|---|---|---|---|
| OpenAI Codex | `.agents/skills/` | Not recorded | Not tested | **Not tested** |
| Claude Code | `.claude/skills/` | Not recorded | Not tested | **Not tested** |
| GitHub Copilot | `.github/skills/` | Not recorded | Not tested | **Not tested** |

The paths above are the repository's documented installer destinations. They do not establish that a particular agent version discovers or invokes the skill.

## Reproducible test case

Use the canonical `keyboard-focus` skill for all three agents so the task and acceptance criteria remain comparable.

### Installation fixture

The compatibility test isolates agent discovery from installer behavior. Until selective installation is available on the tested base revision, create a clean fixture project and copy only the canonical skill directory into the expected agent destination.

From the repository root in a POSIX-compatible shell, repeat the following for each agent in a separate, empty fixture project. Set `AGENT_SKILLS_DIR` to exactly one of `.agents/skills`, `.claude/skills`, or `.github/skills` for the agent under test:

```bash
FIXTURE=/path/to/fixture-project
AGENT_SKILLS_DIR=.agents/skills
mkdir -p "$FIXTURE/$AGENT_SKILLS_DIR"
cp -R skills/keyboard-focus "$FIXTURE/$AGENT_SKILLS_DIR/"
```

This manual fixture setup does not test the WebCraft Pro installer. Record it as a limitation and do not use it as installer evidence. Confirm that the fixture contains only `keyboard-focus/SKILL.md` and that its content matches the canonical repository file. Run each agent test in a fresh fixture.

### Automatic discovery test

Open a fresh agent session in the fixture project. Do not mention WebCraft Pro, `keyboard-focus`, or the skill file in the initial prompt. Submit only this task:

> Review this project's CSS reset and button styles for keyboard accessibility regressions. Identify any issue, explain the user impact, and propose a minimal accessible correction with a browser verification checklist.
>
> ```css
> * { outline: none; }
> .button { background: #174ea6; color: white; }
> .button:focus { box-shadow: none; }
> ```

Record whether the agent independently discovers and applies the installed skill's guidance. If the response does not show evidence of the skill being discovered, record automatic discovery as failed or inconclusive. Do not prompt the agent with the skill name before recording this result.

### Explicit invocation test

After recording the automatic-discovery result, submit a separate prompt explicitly asking the agent to use the installed `keyboard-focus` skill and repeat the review. Record this as invocation evidence only; it cannot convert a failed automatic-discovery result into a pass.

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
- Fixture setup steps and terminal/result evidence (redact local usernames and private paths).
- Screenshot or transcript showing the initial task prompt and automatic-discovery result, before explicit invocation.
- Separate explicit-invocation prompt and complete agent response.
- Reviewer decision against all five output criteria.
- Browser evidence for the final focus treatment.
- Limitations, setup requirements, and any manual discovery steps.

Keep failed attempts; do not replace them with a later passing run without documenting the change.

## Status definitions

| Status | Required evidence |
|---|---|
| **Verified** | Installation, automatic discovery, representative invocation, all output criteria, and browser verification pass. |
| **Partial** | At least one test stage has been attempted, but the complete Verified criteria have not all passed. |
| **Not tested** | No test stage has been attempted for that agent. |

## Current limitations

- No Codex, Claude Code, or GitHub Copilot end-to-end run is recorded in this repository as of the audit date.
- Agent versions and operating-system versions have not been captured.
- The repository's static routing evaluation validates prompt-to-skill fixture data only; it does not prove live agent routing.
- Installer tests validate file placement and safety behavior, not agent discovery or invocation.
- The manual fixture procedure above is not installer validation.
- Do not advertise any agent as Verified until its evidence record is complete.

## Update procedure

After a test is completed, update only that agent's row and add its evidence record below. Keep the status conservative. Link durable, reviewable evidence rather than an unsupported assertion or an unshared local screenshot.
