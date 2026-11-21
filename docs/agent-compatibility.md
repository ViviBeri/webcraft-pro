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

Use the WebCraft Pro selective installer to create a clean fixture for each agent. This tests the installer and gives the compatibility run a reproducible starting point. Use a separate empty fixture directory for every agent; do not reuse a destination containing previous skills.

From the repository root, run the matching command:

```bash
node scripts/install-skills.mjs --agent codex --target /path/to/codex-fixture --skills keyboard-focus
node scripts/install-skills.mjs --agent claude --target /path/to/claude-fixture --skills keyboard-focus
node scripts/install-skills.mjs --agent copilot --target /path/to/copilot-fixture --skills keyboard-focus
```

For a non-mutating preflight, add `--dry-run` before the actual installation. Verify that each fixture contains only `keyboard-focus/SKILL.md` under its agent-specific destination and that the file matches the canonical `skills/keyboard-focus/SKILL.md`. Record the installer command, exit status, destination listing, and agent version in the evidence record. The installer's file-placement tests do not prove that an agent discovers or invokes the skill; those remain separate test stages.

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

Evaluate the automatic-discovery response and the explicit-invocation response independently against all five criteria. The automatic-discovery response must satisfy them for automatic discovery to pass; the explicit-invocation response must also satisfy them for invocation to pass. A passing explicit-invocation response cannot compensate for a failed or inconclusive automatic-discovery response. A reviewer must inspect the proposed CSS and run the verification in a real browser before marking browser verification as passed. A textual checklist alone is not browser evidence.

## Per-agent evidence record

For each run, attach or link:

- Agent product and exact version/build.
- Test date and operating system.
- Fixture setup steps and terminal/result evidence (redact local usernames and private paths).
- Screenshot or transcript showing the initial task prompt and automatic-discovery result, before explicit invocation.
- Separate explicit-invocation prompt and complete agent response.
- Separate reviewer decisions against all five output criteria for the automatic-discovery and explicit-invocation responses.
- Browser evidence for the final focus treatment, linked to the exact CSS revision tested.
- Limitations, setup requirements, and any manual discovery steps.

Keep failed attempts; do not replace them with a later passing run without documenting the change.

## Status definitions

| Status | Required evidence |
|---|---|
| **Verified** | Installation, automatic discovery, explicit invocation, both response evaluations, and browser verification all pass with evidence. |
| **Partial** | At least one required stage passes, but one or more Verified criteria remain incomplete, inconclusive, or fail. |
| **Failed** | Testing was attempted, but no required stage passed; record the failed stages and evidence. |
| **Not tested** | No test stage has been attempted. Once any stage is attempted, use Partial or Failed instead. |

## Current limitations

- No Codex, Claude Code, or GitHub Copilot end-to-end run is recorded in this repository as of the audit date.
- Agent versions and operating-system versions have not been captured.
- The repository's static routing evaluation validates prompt-to-skill fixture data only; it does not prove live agent routing.
- Installer tests validate file placement and safety behavior, not agent discovery or invocation.
- The manual fixture procedure above is not installer validation.
- Do not advertise any agent as Verified until its evidence record is complete.

## Update procedure

After a test is completed, update only that agent's row and add its evidence record below. Keep the status conservative. Link durable, reviewable evidence rather than an unsupported assertion or an unshared local screenshot.
