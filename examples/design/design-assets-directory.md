# Design Asset Directory

> **AI Agents: When building a site, you must pull actual assets from these sources, or use them as direct inspiration. Do not use generic placeholder text or default system fonts.**

Use this directory before finalizing a design direction. Select real, project-appropriate fonts, colors, illustrations/icons, imagery and visual references. Record the exact choices and source URLs in the design direction. A resource is a starting point, not automatic permission to use every asset.

## Usage rules

- Choose assets that support the product, audience, content and approved art direction; do not add decoration merely because a resource is available.
- Specify exact font family names and intended weights, a defined color palette with hex values, and the exact illustration/icon/image assets or a concrete reference.
- Prefer assets that can be downloaded, self-hosted or integrated predictably. Document remote runtime dependencies when a CDN or hosted asset is retained.
- Check each asset's current license, attribution requirements, commercial-use terms and redistribution restrictions before shipping. Availability in a directory does not guarantee a particular asset is free for every use.
- Use real project copy wherever available. If content is not yet supplied, write clearly labeled, context-specific draft copy and flag it for user confirmation; do not ship lorem ipsum or generic filler.
- Do not silently replace the selected font or asset with a system default. If a selected asset cannot be used, explain why and propose a deliberate alternative.
- Respect the human confirmation gate in the design workflow: present the selected assets in the design direction and wait for explicit approval before component implementation.

## Fonts

- [Google Fonts](https://fonts.google.com/) — browse and select open-source font families; record the exact family, weights and subsets needed.
- [Fontpair](https://www.fontpair.co/) — explore typography pairings, including Google Fonts combinations.
- [Fontsource](https://fontsource.org/) — self-host open-source fonts through package-based font files when that fits the project architecture.

## Colors

- [Coolors](https://coolors.co/) — generate, explore and export cohesive color palettes.
- [Realtime Colors](https://www.realtimecolors.com/) — preview color and typography choices in a live interface context.
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) — verify foreground/background contrast for selected color pairs. A palette generator is not an accessibility test.

## Illustrations and icons

- [unDraw](https://undraw.co/illustrations) — customizable SVG illustrations; choose imagery that fits the product rather than inserting generic decoration.
- [Heroicons](https://heroicons.com/) — consistent SVG icon set for interface actions and states. These are icons, not a substitute for meaningful illustrations.
- [ManyPixels Gallery](https://www.manypixels.co/gallery) — browse illustration styles and downloadable artwork; verify the current license and usage terms for each asset.

## UI inspiration

- [Mobbin](https://mobbin.com/) — reference real product flows and interface patterns. Use it to understand interaction and information architecture; do not copy screens, branding or proprietary content.
- [Land-book](https://land-book.com/) — curated website and landing-page examples for visual direction.
- [Awwwards](https://www.awwwards.com/) — explore high-craft websites and interaction ideas; adapt principles to the project's usability and accessibility constraints.

## Supporting reference

- [Brad Traversy's Design Resources for Developers](https://github.com/bradtraversy/design-resources-for-developers) — broad, categorized directory spanning UI graphics, fonts, colors, icons, stock media, tools and design inspiration. Use it to discover alternatives beyond the shortlist above. The upstream repository notes that new resource submissions are paused; check links and terms directly with each provider.

## Required design-direction asset record

Before the design direction is finalized, include an **Asset selections** subsection with:

| Asset type | Required specification |
| --- | --- |
| Typography | Exact font family, weights, source URL and loading/self-hosting approach |
| Color | Named semantic tokens and selected hex values; contrast evidence for key text/action pairs |
| Illustrations and icons | Exact asset or icon set, source URL, intended placement and license/attribution check |
| Photography/media | Exact selected asset or a concrete sourcing brief; source and usage rights |
| UI references | Specific screens/patterns and the principles to adapt without copying |

If an asset is not selected yet, state the reason and the next action. Do not imply that an unselected or unverified asset is already available.
