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
