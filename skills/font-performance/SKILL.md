---
name: font-performance
description: Improve typography loading when web fonts delay text rendering, increase transfer size or cause layout shifts.
---

# Font Performance

Use this skill when custom fonts affect first render, layout stability, bandwidth or text readability.

## Workflow

1. Inventory font families, weights, styles, language coverage and actual usage.
2. Remove unused families and weights. Prefer a small number of deliberate font files.
3. Use efficient formats such as WOFF2 and subset only when language and glyph coverage remain correct.
4. Define robust system fallback stacks and test line wrapping, weight and metrics before deployment.
5. Choose font-display behavior deliberately. Use swap or optional based on product requirements and acceptable fallback behavior.
6. Preload only a font file proven critical to above-the-fold rendering. Match its URL, type and crossorigin mode to the eventual request.
7. Use unicode-range only when subsets are correctly generated and tested for all required scripts.
8. Measure font transfer, request priority, text paint and layout shifts on mobile and desktop.

## Engineering rules

- Do not preload every weight or every language subset.
- Do not rely on a font-display setting to fix poor font selection or oversized files.
- Consider metric-compatible fallbacks and font metric overrides to reduce layout shifts.
- Preserve readability when fonts fail or load slowly.
- Verify diacritics, multilingual content, variable font axes and synthetic bold/italic behavior.
- Respect font licensing and self-hosting requirements.

## Deliverables

Provide font inventory, files removed or retained, preload rationale, fallback strategy, licensing notes and measured loading/layout impact.

## Common AI failure mode

**Failure:** An agent swaps in a custom web font whose metrics differ substantially from the fallback, causing text blocks to reflow after the font loads.

**Why it matters:** Late changes in glyph widths and line metrics move headings, controls, and surrounding content, producing cumulative layout shift and disrupting reading position or interaction.

**Symptoms:**
- Text wraps to different lines after the web font loads.
- Headings or controls move vertically despite reserved image and media dimensions.
- The selected fallback has visibly different width or line-height metrics from the final font.

**Prevention:** Choose a metric-compatible fallback and use supported font metric overrides where appropriate. Load only required WOFF2 subsets and weights, preload only a measured critical font, and choose `font-display` deliberately. Measure layout shift and text paint on representative devices and verify multilingual glyph coverage and readability when the custom font is unavailable.
