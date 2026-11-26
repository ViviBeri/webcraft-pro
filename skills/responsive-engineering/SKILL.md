---
name: responsive-engineering
description: Use when implementing or auditing responsive layouts, mobile and tablet behavior, fluid typography, container queries, touch interactions or zoom and reflow support.
---

# Responsive Engineering

## Objective

Make the same content and functionality work across viewport sizes, input methods, zoom levels and content lengths. Responsive design is not a desktop layout squeezed onto a phone.

## Workflow

1. **Establish the content model**
   - Identify primary tasks, reading order, navigation, dense data and critical actions.
   - Inspect the existing viewport meta tag and layout constraints.
   - Find fixed widths, fixed heights, overflow traps and assumptions about pointer precision.
2. **Design from constraints**
   - Start with a robust narrow layout, then add space where content benefits from it.
   - Choose breakpoints when the content no longer fits—not from a device list.
   - Prefer fluid sizing with min(), max() and clamp() where it improves continuity.
   - Use Grid and Flexbox for layout; use container queries when a component depends on its available container rather than the viewport.
   - Set sensible maximum line lengths and avoid overly wide text measures.
3. **Protect content and controls**
   - Allow text, labels, buttons and cards to wrap or grow.
   - Avoid fixed heights around dynamic content.
   - Make tables intentionally scrollable or provide a useful narrow-screen alternative.
   - Ensure images have intrinsic dimensions or aspect-ratio reservations to reduce layout shifts.
   - Use appropriate object-fit and focal positioning without cropping essential information.
4. **Support touch, keyboard and zoom**
   - Provide adequately sized and spaced touch targets.
   - Do not make hover the only way to reveal information or actions.
   - Preserve logical DOM order when changing visual layout.
   - Keep focus visible and ensure overlays fit within the viewport.
   - Do not disable browser zoom.
   - Test reflow at narrow widths and enlarged text.
5. **Use resilient CSS**
   - Prefer logical properties for inline and block directions.
   - Avoid relying on exact device dimensions or user-agent detection.
   - Use safe-area environment variables when edge-to-edge layouts require them.
   - Account for dynamic viewport units when browser chrome affects full-height layouts.
   - Avoid horizontal overflow caused by long URLs, code, unbroken strings or intrinsic media.
6. **Verify representative conditions**
   - Test narrow phone, wide phone, tablet, laptop and large desktop widths appropriate to the product.
   - Test portrait and landscape when relevant.
   - Test keyboard navigation, touch behavior, zoom and long/localized content.
   - Inspect actual rendered pages; do not infer correctness from CSS alone.

## Responsive review checklist

- No unintended horizontal page scrolling.
- No clipped text, hidden actions or overlapping controls.
- Navigation remains usable at every tested width.
- Content order remains logical for reading and keyboard navigation.
- Images and embeds scale without distortion.
- Forms remain readable and easy to complete.
- Dialogs and menus remain within the visible viewport.
- Layout survives larger text and longer translations.
- Motion and sticky behavior do not obstruct content.

## Completion criteria

The interface preserves content, task completion and accessibility across the tested viewport and input conditions, with any intentional overflow clearly designed and documented.


## Reflow and content stress tests

- Verify at a 320 CSS-pixel-wide viewport and at 400% browser zoom where applicable; content must remain available without two-dimensional page scrolling except where the content requires it (for example, a wide data table or map).
- Test long words, URLs, translated labels, validation messages, empty states and user-generated content.
- Check text resizing and spacing changes without clipping, overlap or loss of controls.
- Test orientation changes and dynamic browser chrome on mobile when the experience depends on viewport height.
- Confirm sticky headers, fixed action bars and virtual keyboards do not obscure focused fields or essential content.
- For complex data, document the narrow-screen interaction: scroll region, column prioritization, summary/detail view or alternative representation.

Choose breakpoints from observed content failure. Record widths and conditions actually tested; do not claim universal device coverage from a small sample.

## Common AI failure mode

**Failure:** An agent treats responsiveness as familiar device breakpoints and tunes a few screenshots without testing content stress or intermediate widths.

**Why it matters:** Real users resize windows, zoom text, use translated content, and encounter long labels; preset-only layouts overflow between breakpoints or with realistic content.

**Symptoms:**
- Overflow/clipping appears at untested widths
- fixed heights break with large text/localization/errors
- visual order conflicts with DOM order
- page fails intermediate widths or 200% zoom.

**Prevention:** Use fluid content-driven constraints. Test narrow, wide, and intermediate widths plus zoom/reflow, long text, localization, and error states. Verify focus order, touch targets, overflow, sticky elements, and DOM/visual order; record exact conditions.

