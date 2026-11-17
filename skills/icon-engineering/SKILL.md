---
name: icon-engineering
description: Use when selecting, authoring, integrating, styling or reviewing SVG icons, icon assets and icon-only controls in web interfaces.
---

# Icon Engineering

## Objective

Deliver icons that remain crisp, understandable, accessible, themeable and efficient across supported browsers and input modes. Prefer platform capabilities and existing project conventions over adding an icon dependency.

## 1. Choose the right representation

1. Inspect the project's existing icon source, design system, licensing requirements and rendering constraints before introducing assets or tooling.
2. Prefer inline SVG when an icon needs CSS styling, state changes, accessible integration or precise control over its markup.
3. Use an external SVG file through an image or background when the graphic is static and does not need internal styling or an accessible name beyond the surrounding content.
4. Use a text glyph only when it is genuinely typographic content, not as a substitute for a consistent interface icon.
5. Avoid icon fonts for interface controls when SVG or an existing platform icon system provides more reliable sizing, rendering and accessible behavior.
6. Do not add an icon package or copy an icon collection merely to supply a small number of symbols. Check package maintenance, bundle impact and asset licenses first.

## 2. Author robust SVG

- Include a meaningful `viewBox` so the graphic scales independently of its rendered dimensions.
- Use explicit width/height or a predictable CSS sizing contract to prevent layout shifts.
- Prefer `fill="currentColor"` and/or `stroke="currentColor"` when the icon should inherit text color.
- Keep path geometry and markup minimal; remove editor metadata and unused definitions from production assets.
- Preserve required `title`, `desc`, IDs, gradients, masks and definitions. Do not run destructive optimization that changes rendering or removes accessibility information.
- Avoid hard-coded colors unless the icon is intentionally multicolor.
- Do not rely on CSS transforms to correct a poorly authored viewBox or misaligned source geometry.
- Test at the actual small sizes, device pixel ratios, zoom levels and themes used by the interface.

## 3. Apply the correct accessibility model

Decide whether the icon is decorative or conveys information in context.

### Decorative icon

When adjacent text already provides the complete meaning, remove the SVG from the accessibility tree:

```html
<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
  <path d="..." />
</svg>
```

### Informative standalone icon

When the SVG itself communicates information not provided by nearby text, give it an accessible name. Use a title referenced by `aria-labelledby`, or provide an equivalent accessible name through the surrounding component.

```html
<svg role="img" aria-labelledby="status-title" viewBox="0 0 24 24">
  <title id="status-title">Connection secure</title>
  <path d="..." />
</svg>
```

Ensure IDs are unique when rendering repeated instances. Do not label an SVG as informative if the same meaning is already conveyed by visible adjacent text.

### Icon-only control

Name the interactive control, not merely the decorative SVG inside it:

```html
<button type="button" aria-label="Close dialog">
  <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
    <path d="..." />
  </svg>
</button>
```

Prefer visible text when space and design allow. Keep the accessible name aligned with the action and update it when the action changes. A tooltip alone is not a reliable accessible name.

## 4. Style icons consistently

- Establish a small set of semantic size tokens and align icons to the surrounding text baseline.
- Use `em` when the icon should scale with text, or explicit dimensions when the component contract requires a fixed size.
- Use `currentColor` for icons that follow text and control states.
- Preserve a visible focus indicator on the interactive control; do not rely on icon color or motion alone to indicate focus.
- Keep pointer targets large enough for the control's purpose even when the visible icon is small.
- Avoid changing layout dimensions on hover. Use color, opacity or a restrained transform only when it improves feedback.

## 5. Use CSS for simple visual states

CSS is suitable for hover, focus-visible and pressed feedback. The interactive control must remain fully functional without animation.

```css
.icon-button {
  display: inline-grid;
  place-items: center;
  min-inline-size: 2.75rem;
  min-block-size: 2.75rem;
  border: 0;
  border-radius: 0.5rem;
  color: var(--icon-color, currentColor);
  background: transparent;
  transition: color 160ms ease, background-color 160ms ease;
}

.icon-button:hover {
  color: var(--icon-color-hover, currentColor);
  background: var(--icon-background-hover, transparent);
}

.icon-button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .icon-button {
    transition: none;
  }
}
```

Do not prescribe one animation duration for every interaction. Choose timing according to the component, user preference and motion system. Do not claim that transform or opacity is automatically GPU-accelerated or free; profile when performance matters.

## 6. Animate icon state only when it adds meaning

- Keep the underlying control state and accessible name correct even when animation is disabled, interrupted or unsupported.
- Use CSS for a simple visual swap; use a motion library only when sequencing, orchestration or measured requirements justify it.
- Avoid animating the only indication of success, error, selection or expanded state.
- Do not make interaction completion wait for an animation.
- Respect `prefers-reduced-motion` with a static state or a substantially reduced effect.
- Avoid continuous decorative motion unless it communicates ongoing status and can be paused or stopped where required.

## 7. Optimize and license assets safely

- Optimize SVGs with a maintained tool only after checking visual output and preserving required accessibility metadata.
- Reuse shared symbols or sprites only when they reduce duplication without complicating styling, caching, accessibility or deployment.
- Check the license for the exact icon assets and any font files. A repository's source-code license may not cover separately licensed artwork.
- Record provenance and required attribution for assets that are redistributed.
- Avoid shipping unused icons or entire libraries when tree-shaking or selective asset inclusion is available.

## 8. Verify

1. Inspect the rendered icon at intended sizes, zoom levels, themes and supported browsers.
2. Check SVG dimensions, viewBox, stroke/fill consistency and clipping.
3. Inspect the accessibility tree to confirm decorative icons are ignored and informative icons or controls have accurate names.
4. Operate icon-only controls by keyboard and touch; verify focus visibility and target size.
5. Test hover, focus-visible, pressed, disabled, selected and state-change behavior without relying on animation.
6. Enable reduced motion and confirm the icon remains understandable and the action remains usable.
7. Check for layout shifts, unnecessary asset payload and broken external asset paths.
8. Verify licenses and attribution before redistributing third-party artwork.

## Boundaries

- Use [semantic accessibility](../semantic-accessibility/SKILL.md) for general accessible names and HTML semantics.
- Use [accessible components](../accessible-components/SKILL.md) for widget roles, keyboard models and focus lifecycle.
- Use [image asset optimization](../image-asset-optimization/SKILL.md) for broader media delivery and responsive asset performance.
- Use [motion design systems](../motion-design-systems/SKILL.md) and [accessible motion](../accessible-motion/SKILL.md) for shared motion tokens and motion accessibility requirements.

## Completion criteria

Icons have an intentional representation, correct accessible treatment, consistent sizing and styling, safe asset provenance, and verified behavior across relevant themes, input modes and motion preferences. No dependency is added without a demonstrated need.
