---
name: image-asset-optimization
description: Optimize image and media delivery when large visual assets affect loading speed, bandwidth, layout stability or mobile experience.
---

# Image and Asset Optimization

Use this skill when images, video posters, icons or other media dominate transfer size or delay visible content.

## Workflow

1. Identify the LCP element and the largest assets in the network waterfall.
2. Match intrinsic dimensions and responsive candidates to rendered size and device pixel ratio.
3. Use modern formats such as AVIF or WebP when browser support and the delivery pipeline allow; retain suitable fallbacks.
4. Provide responsive sources with srcset and sizes, or the framework's equivalent image component.
5. Reserve layout space with width and height attributes or a stable aspect ratio.
6. Prioritize the actual above-the-fold LCP image. Do not lazy-load it; consider fetchpriority="high" only when measurement confirms it is the LCP resource.
7. Lazy-load below-the-fold images and defer non-critical media.
8. Use appropriately sized video posters and avoid autoplaying large media without a product requirement.
9. Re-test on constrained mobile bandwidth and inspect decoded memory as well as transfer bytes.

## Engineering rules

- Do not serve desktop-sized images to small viewports without a reason.
- Avoid CSS background images for meaningful content that needs text alternatives.
- Do not lazy-load the LCP image or other immediately visible critical content.
- Avoid preloading multiple competing image candidates.
- Keep image quality acceptable for the actual display size.
- Use descriptive alt text for informative images and empty alt for decorative images.
- Verify that optimization does not break cropping, art direction or responsive layout.

## Deliverables

List the asset, current and optimized dimensions/format/bytes, loading priority, responsive strategy, accessibility treatment and measured impact.
