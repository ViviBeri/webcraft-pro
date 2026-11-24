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

## Reviewing Visual Builder Export Code

If a user provides HTML/CSS exported from a visual builder (like GrapesJS, Webstudio, or Webflow), do not blindly trust it. Audit it for semantic HTML (div-soup), unused CSS, WCAG accessibility violations, and vendor lock-in scripts. Strip out unnecessary builder bloat before integrating it into the codebase.

- Preserve required behavior and visual intent while replacing generic containers with semantic elements where appropriate.
- Check keyboard operation, accessible names, focus visibility, heading hierarchy, form labels, contrast and responsive reflow.
- Identify builder runtime dependencies, hosted assets, proprietary attributes and scripts; remove them only when they are not required by the exported experience.
- Verify the resulting code in the target application and report any retained dependencies or limitations.

## Component Architecture

Angular's Dependency Injection and module organization are useful conceptual references for decoupling responsibilities and making dependencies explicit. Apply the underlying principles—not Angular-specific APIs or conventions—even when working in React, Vue or another frontend stack. Keep abstractions proportionate to the project and follow its existing framework conventions.

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


## Decision record

For consequential architecture choices, record context, constraints, options considered, decision, trade-offs, migration/rollback path and verification plan. Keep the record proportionate to the decision.

## State and rendering boundaries

- Classify state by lifetime and ownership: ephemeral component state, URL/shareable state, server data, cross-route client state and persisted preferences.
- Keep server data authoritative; define cache freshness, invalidation and optimistic-update rollback behavior where applicable.
- Make route-level loading, error, not-found, empty and permission-denied states explicit. Do not collapse distinct failures into a generic empty screen.
- Treat server/client component boundaries as data and capability boundaries where supported; pass only minimum serializable data to client code.
- Prefer progressive enhancement for critical flows when the platform and product allow it.
- Document route ownership, deep-link behavior, refresh behavior and fallback behavior for unavailable dependencies.

## Common AI failure mode

**Failure:** An agent introduces a second mutable source of truth for the same application state, allowing the UI, URL, and server data to diverge.

**Why it matters:** Updates become order-dependent and stale values can overwrite newer user intent. Bugs appear during navigation, refresh, optimistic updates, and error recovery because ownership and synchronization rules are unclear.

**Symptoms:**
- The same value is independently stored in component state, a global store, and the URL or server cache.
- A change in one representation does not update or invalidate the others.
- Back/forward navigation or a failed optimistic update restores a value that no longer matches the authoritative state.

**Prevention:** Assign each state value one authoritative owner based on its lifetime and sharing needs. Derive presentation state where possible, define URL synchronization and server-cache invalidation explicitly, and document optimistic-update rollback. Test navigation, refresh, concurrent updates, and failed requests to prove that duplicate mutable copies cannot drift.
