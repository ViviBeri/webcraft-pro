# Performance Engineering Examples

These examples are implementation review patterns, not universal configuration defaults. Validate behavior against the deployed application and its supported browsers.

## Implementation patterns

### 1. Responsive image with reserved dimensions

Use intrinsic dimensions, responsive candidates and an appropriate loading priority. The browser should discover the real LCP image early.

```html
<picture>
  <source
    type="image/avif"
    srcset="/images/hero-640.avif 640w, /images/hero-1280.avif 1280w"
    sizes="(max-width: 700px) 100vw, 1200px"
  />
  <img
    src="/images/hero-1280.webp"
    srcset="/images/hero-640.webp 640w, /images/hero-1280.webp 1280w"
    sizes="(max-width: 700px) 100vw, 1200px"
    width="1600"
    height="900"
    alt="Product dashboard displayed on a laptop"
    fetchpriority="high"
  />
</picture>
```

Only use high fetch priority when this asset is confirmed to be the page's LCP candidate. Do not lazy-load the initial viewport's critical image.

### 2. Lazy-load non-critical media

```html
<img
  src="/images/customer-story.webp"
  width="960"
  height="640"
  loading="lazy"
  decoding="async"
  alt="Customer using the product at a desk"
/>
```

Use lazy loading for media outside the initial viewport. Keep dimensions so the browser can reserve layout space.

### 3. Cache fingerprinted assets

A content-hashed asset can use a long immutable cache lifetime:

```http
Cache-Control: public, max-age=31536000, immutable
```

The HTML entry point generally needs revalidation so users receive current asset references:

```http
Cache-Control: no-cache
ETag: "deployment-specific-validator"
```

Do not apply public caching to personalized or sensitive responses. Configure and verify headers at the deployed CDN or origin.

## Audit, measurement and investigation templates

- [Performance audit template](performance-audit-template.md) — context, representative routes, metric results, bottleneck analysis and conclusion.
- [Core Web Vitals record](core-web-vitals-record.md) — field p75 values, population, reporting window and supporting diagnostics.
- [Performance test matrix](performance-test-matrix.md) — reproducible device, network, cache and workload scenarios.
- [Performance investigation template](performance-investigation-template.md) — symptom, reproduction, evidence, root cause and retest.
- [Performance budget template](performance-budget-template.md) — calibrated user-experience and delivery budgets with enforcement and waiver policy.

## Performance review checklist

- [ ] Field and lab evidence are clearly separated.
- [ ] Mobile and desktop journeys are represented.
- [ ] The LCP resource is discoverable and correctly prioritized.
- [ ] Images and embeds reserve layout space.
- [ ] Optional JavaScript and third-party code are deferred.
- [ ] Cache policies distinguish immutable assets from HTML and private data.
- [ ] Performance budgets are based on repeatable baselines.
- [ ] Reports and test conditions are retained for comparison.
- [ ] Accessibility and core functionality remain intact.
