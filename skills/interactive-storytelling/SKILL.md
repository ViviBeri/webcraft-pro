---
name: interactive-storytelling
description: Use when designing narrative product pages, scroll-led editorial experiences, interactive case studies or progressive visual explanations.
---

# Interactive Storytelling

## Objective

Use interaction and motion to help visitors understand a sequence, relationship or product story. The narrative must remain understandable and navigable without animation.

## Workflow

1. **Write the story first**
   - Define the audience, central message and desired next action.
   - Break the narrative into a small number of meaningful beats.
   - Give each section one primary purpose and a clear heading.
   - Ensure the story remains coherent when read as plain document content.
2. **Choose interaction intentionally**
   - Use scroll to reveal progression only when the sequence benefits from it.
   - Use pinned scenes sparingly and keep them short.
   - Use interactive diagrams only when the visitor gains useful control or insight.
   - Provide visible cues for interactive affordances and a clear way to continue.
   - Do not make essential information depend on hover, pointer precision or animation completion.
3. **Preserve semantic structure**
   - Keep meaningful content in the DOM in logical reading order.
   - Use headings, lists, figures, captions and links according to their meaning.
   - Ensure focus order follows the narrative sequence.
   - Avoid visual reordering that conflicts with reading order.
4. **Implement progressive enhancement**
   - Render the complete core story before initializing motion.
   - Add enhancement only after required elements and assets are ready.
   - Use CSS for simple transitions and GSAP/ScrollTrigger for complex choreography.
   - Provide a static or simplified narrow-screen experience when pinning or scrubbing is unsuitable.
   - Ensure route changes and component teardown remove all animation resources.
5. **Respect preferences and performance**
   - Honor reduced motion with a meaningful non-animated presentation.
   - Avoid forced scroll pacing, long pinned scenes and large parallax movement.
   - Load only the assets needed for the current experience.
   - Reserve image and media space to prevent layout shifts.
6. **Validate the narrative**
   - Read the page top to bottom with JavaScript disabled or motion unavailable.
   - Navigate by headings and keyboard only.
   - Test slow and fast scrolling, reverse scrolling, touch, narrow widths and reduced motion.
   - Confirm links, calls to action and forms remain reachable throughout the experience.

## Story review checklist

- Is the core message clear before motion is added?
- Does every animated beat add meaning?
- Can visitors understand their current position?
- Is the next action discoverable?
- Can the story be read linearly?
- Does it work without hover or scroll precision?
- Are narrow-screen and reduced-motion versions complete?
- Are assets and pinned scenes justified by user value?

## Completion criteria

The narrative is coherent as semantic content, interaction improves understanding, the experience remains accessible across input modes, and motion can be disabled without losing information.


## Resilience and narrative state

- Make the complete story available in document order before motion setup. Use animation to emphasize progression, not to gate access to a section.
- Ensure anchor links, browser find, heading navigation and direct fragment URLs still work when scenes are pinned or transformed.
- Keep a visible progress or orientation cue only when it adds genuine value; do not imply that the visitor must follow a prescribed pace.
- Define how the story behaves when fonts, images or remote data load late. Reserve media dimensions and refresh scroll measurements only after relevant layout changes settle.
- Provide a linear narrow-screen alternative for horizontal or pinned sequences, preserving all text, controls and calls to action.

## Common AI failure mode

**Failure:** An agent makes essential narrative content appear only after a scroll-triggered animation initializes or reaches a prescribed progress point.

**Why it matters:** Visitors using reduced motion, keyboard navigation, direct fragment links, browser find, slow devices, or disabled JavaScript can miss information or be unable to follow the story.

**Symptoms:**
- Core text or calls to action are hidden until a timeline or scroll event runs.
- Direct fragment navigation lands on transformed or pinned content that is not readable in sequence.
- The story becomes incomplete when motion is disabled or JavaScript fails.

**Prevention:** Render the complete narrative in semantic document order before motion setup. Use animation only to emphasize progression, keep anchors and heading navigation functional, and provide a linear narrow-screen and reduced-motion presentation. Test with JavaScript disabled, motion unavailable, keyboard-only navigation, direct fragment URLs, and browser find.
