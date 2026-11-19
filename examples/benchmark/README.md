# Micro-benchmark: raw output vs. skill-guided output

This directory contains a small, illustrative comparison of two React login-form implementations:

- [Raw baseline](./react-login-form-bad.md) — a deliberately flawed example of what an unconstrained implementation can look like.
- [Skill-guided example](./react-login-form-good.md) — a corrected implementation applying semantic HTML, accessible names, and visible keyboard focus.

## What this demonstrates

The comparison is a concrete teaching fixture, not a statistically valid model benchmark. It does not claim that every model will produce the baseline or that every skill-guided response will be correct. It shows how explicit engineering requirements and verification can make quality criteria reviewable.

The baseline uses a clickable `div` instead of a native `button`, provides no accessible name for its icon-only action, and removes or omits a visible focus indicator. When rendered and checked with the repository's Playwright browser checker and axe-core scan, these defects are expected to produce accessibility failures or findings: the control is not natively keyboard-operable, its accessible name is missing, and keyboard focus is not visibly indicated.

The corrected example uses native form controls, associated labels, a semantic `button`, an accessible name, and a visible `:focus-visible` style. It is designed to pass the relevant checks in this example. Passing an automated scan is not proof of WCAG conformance; manual keyboard and assistive-technology testing is still required.

## How this relates to repository CI

The repository has two distinct accessibility paths:

- The push/pull-request **Accessibility Keyboard Tests** workflow runs the Playwright keyboard/focus regression suite against the maintained accessibility fixture.
- The **Manual Browser Check** workflow runs the browser checker, including axe-core, against a selected target.

These Markdown examples are explanatory source snippets; they are not currently wired as executable fixtures in either workflow. Therefore, the expected bad/good outcomes above are reasoned from the code and checker scope, not reported benchmark results. A future evaluation should render both implementations and run the same automated checks against them.

## Future measurement

See the benchmark/evaluation task in the root [TODO.md](../../TODO.md). A reproducible evaluator should use the same prompt, model, settings, application fixture, and test commands for both conditions, then report raw results and limitations.
