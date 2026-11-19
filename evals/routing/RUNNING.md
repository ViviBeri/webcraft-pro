# Running live routing evaluations

## Scope

The v1.5.0 CI integration validates only the static evaluation corpus. It does not invoke a language model, infer actual skill selection, require provider credentials, or produce routing-accuracy claims.

Live evaluation is an optional, separately invoked layer. The recommended runner to evaluate is [skilldx](https://github.com/AndreySukhanov/skilldx), subject to a compatibility and license review before adoption. This repository does not vendor it or add it as a dependency.

## Runner contract

A compatible live runner must:

1. Read the prompt corpus from `prompts.json` and expected mappings from `expected-skills.json`.
2. Invoke a configured agent/model using an explicitly documented provider and model identifier.
3. Capture the skills actually selected or activated for each prompt.
4. Compare actual selections with expected skills using exact, deterministic matching rules.
5. Emit one result per prompt with:
   - `promptId`
   - `expectedSkills`
   - `actualSkills`
   - `status`: `ROUTED`, `MISSED`, or `MISROUTED`
   - `provider`, `model`, runner version, and timestamp
6. Preserve raw output or a reproducible trace sufficient to review disputed results, while redacting credentials and sensitive prompt data.
7. Report aggregate counts and precision/recall only when the scoring definitions and sample set are disclosed.

## Outcome definitions

- **ROUTED**: all expected skills were selected and no unexpected skill was selected.
- **MISSED**: one or more expected skills were not selected and no unexpected skill was selected.
- **MISROUTED**: at least one unexpected skill was selected. If expected skills are also missing, classify as MISROUTED and record both discrepancies.

## Execution and CI policy

- Live runs must be opt-in and separate from the default pull-request validation workflow.
- Provider credentials must be supplied through the runner's documented secret mechanism; never commit credentials or prompt traces containing secrets.
- Pin runner versions and record provider/model versions for reproducibility.
- Do not make CI merge decisions from an unreviewed model score alone.
- Keep the static validator as the zero-cost, provider-neutral baseline.

## Suggested adoption sequence

1. Evaluate `skilldx` against this contract, including license, supported model adapters, output format, and reproducibility.
2. Run a small baseline on the nine starter prompts and manually inspect every discrepancy.
3. Add overlapping-skill collision prompts only after documenting the intended routing policy.
4. Publish results as advisory artifacts before considering any required status check.

No live runner is implemented or invoked by this repository in v1.5.0.
