# Skill routing evaluations

This directory defines a provider-neutral, static evaluation corpus for checking the quality and integrity of skill-routing examples.

## Files

- `prompts.json`: nine representative user prompts.
- `expected-skills.json`: the expected skill or skills for each prompt.
- `validate-evals.mjs`: dependency-free structural and referential validation.
- `RUNNING.md`: contract for an optional live model runner; not executed by CI.

## Static validation

Run:

```bash
npm run validate:evals
```

The validator checks JSON shape, unique prompt IDs, complete one-to-one prompt mappings, non-empty prompt text, and references to existing skill directories. It does not call a model, infer routing, or claim that a model would select the expected skill.

## Live evaluation boundary

Live routing evaluation is deliberately separate from static CI. See [RUNNING.md](./RUNNING.md) for the provider-neutral runner contract and the recommended `skilldx` runner.
