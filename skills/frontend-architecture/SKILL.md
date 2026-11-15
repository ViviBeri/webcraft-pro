---
name: frontend-architecture
description: Use when planning, reviewing or changing a frontend application architecture, routing, rendering strategy, state ownership, data flow or project boundaries.
---

# Frontend Architecture

## Objective

Make the smallest coherent architectural change that improves clarity, reliability and delivery speed without replacing working project conventions unnecessarily.

## Workflow

1. **Inspect before designing**
   - Identify the framework, language, package manager, build system and supported runtime from repository files.
   - Read entry points, route definitions, layouts, data access, state management, tests and deployment configuration relevant to the task.
   - Map the request path: user action → UI → state or request → domain logic → persistence/API → rendered result.
   - Record constraints such as SSR, static generation, client-only behavior, hosting limits and browser support.
2. **Define boundaries**
   - Separate presentation from domain rules and external I/O where the project benefits from it.
   - Keep route composition, reusable UI, domain logic and infrastructure responsibilities distinguishable.
   - Place code according to existing architecture; do not introduce layers solely to satisfy a diagram.
   - Define ownership for shared state and avoid duplicated sources of truth.
3. **Choose rendering and data flow**
   - Prefer the simplest rendering mode compatible with SEO, latency, personalization, interactivity and deployment.
   - Keep secrets and privileged operations on trusted server boundaries.
   - Treat browser state as untrusted input. Revalidate authorization and data on the server.
   - Handle loading, empty, error, stale and success states explicitly.
4. **Evaluate trade-offs**
   - Compare viable approaches when the decision is consequential.
   - Consider complexity, bundle cost, accessibility, testability, operational burden and migration risk.
   - Avoid adding dependencies when platform APIs or existing packages are sufficient.
5. **Plan migration**
   - Identify affected modules, routes, contracts, tests and deployment settings.
   - Prefer incremental, reversible changes with clear compatibility boundaries.
   - Preserve public APIs and URLs unless a breaking change is explicitly required.
6. **Verify**
   - Run the repository's existing lint, typecheck, tests and production build.
   - Add or update tests for changed boundaries and failure paths.
   - Check direct navigation, refresh, not-found behavior and environment configuration where relevant.
   - Report checks not run and explain why.

## Design constraints

- Do not assume React, Next.js, Vue, Angular or any specific framework.
- Do not impose a state library, router, monorepo or microfrontend architecture without a demonstrated need.
- Avoid global mutable state and hidden cross-module side effects.
- Keep configuration explicit and validate required environment variables at startup.
- Use stable contracts between independently changing modules.
- Do not place secrets, privileged credentials or authorization decisions in client bundles.
- Prefer observability that helps diagnose real failures; never log passwords, tokens or unnecessary personal data.

## Deliverables

For architecture work, provide a current-state summary, proposed boundaries and data flow, key trade-offs, incremental implementation plan, verification evidence and known limitations.

## Completion criteria

The architecture fits the actual stack, reduces rather than relocates complexity, preserves required behavior, has clear ownership boundaries and is verified by relevant automated checks.
