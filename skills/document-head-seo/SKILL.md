---
name: document-head-seo
description: Construct, review or repair an HTML document head for search discovery, social sharing, browser behavior and efficient critical-resource loading.
---

# Document Head, SEO and Metadata

Use this skill when creating a page, implementing a route-level metadata system, reviewing search/social previews, or correcting document-head markup. Produce metadata that accurately represents the page and does not invent claims, URLs, images or verification tokens.

## 1. Inspect the page and deployment model

1. Identify the page's primary purpose, audience, language, content title and concise description.
2. Determine its final public URL, indexability, canonical URL, social-preview image and supported locales.
3. Inspect the existing framework, routing, SSR/SSG or client-rendering model, metadata library and deployment base path.
4. Reuse the project's established metadata system. Ensure each route emits its own metadata in the initial HTML when the rendering architecture supports it; do not rely on post-load JavaScript for essential crawler metadata when server/static rendering is available.
5. Never fabricate a canonical URL, social image, author, publication date, business identity, structured-data value or search verification token. Ask for missing facts or omit optional fields.

## 2. Build a valid, ordered `<head>`

Use the [HEAD guide](https://github.com/joshbuchea/HEAD) as the comprehensive practical catalog of head elements, metadata families, icons and recommended ordering. Confirm normative element validity and semantics against the [WHATWG HTML Living Standard](https://html.spec.whatwg.org/multipage/semantics.html#the-document-metadata). HEAD is a community reference, not a substitute for the HTML standard.

Start with the required document metadata, placed early:

- `<meta charset="utf-8">` near the beginning of the document head.
- `<meta name="viewport" content="width=device-width, initial-scale=1">` for responsive viewport behavior.
- A unique, descriptive `<title>` for the page.
- A concise, accurate `<meta name="description">` that summarizes the page without keyword stuffing.

Add only metadata that is accurate and applicable:

- `<meta name="robots">` only when crawler behavior needs to be controlled; do not accidentally block production indexing.
- `<meta name="theme-color">` and `<meta name="color-scheme">` when they reflect the actual interface.
- `<meta name="referrer">` only when the chosen policy is intentional and consistent with application requirements.
- Site-verification tags only when the owner supplies the real token.
- A Content Security Policy should normally be delivered as an HTTP response header. Do not add a meta CSP as a substitute for a complete server policy; understand its limitations and test compatibility first.

Keep titles and descriptions unique across indexable routes. Avoid obsolete or unsupported SEO tags and do not promise ranking outcomes.

## 3. Add canonical and social-sharing metadata

For an indexable page, include an absolute canonical URL that resolves to the preferred public version of that page:

```html
<link rel="canonical" href="https://example.com/products/example">
```

Normalize trailing slashes, query parameters, hostnames and locale variants according to the site's routing policy. Do not canonicalize unrelated pages to the homepage. For non-indexable or private pages, follow the site's explicit indexing policy instead of adding a misleading canonical.

Add Open Graph metadata for share previews. At minimum, provide page-specific values for:

- `og:type` (usually `website` or `article`, as appropriate).
- `og:title`.
- `og:description`.
- `og:url` (the canonical public URL).
- `og:image` (an absolute, publicly fetchable image URL with suitable dimensions and format).
- `og:site_name` where a site name is defined.
- `og:locale` when locale information is known.

Add Twitter/X card metadata:

- `twitter:card` (commonly `summary_large_image` when a suitable large image exists; otherwise use a suitable card type).
- `twitter:title` and `twitter:description`.
- `twitter:image` when a valid share image is available.
- `twitter:site` or `twitter:creator` only when verified account handles are supplied.

Keep Open Graph and Twitter values consistent with the visible page content. Do not use a placeholder image, inaccessible private asset or misleading preview. Platform rendering and card availability can change; verify previews with the relevant platform tools where possible.

## 4. Configure favicons and application icons

Use the actual project assets and deployment paths. Include appropriate `<link rel="icon">` declarations for the supported favicon formats/sizes and a touch icon when the product provides one. Link a web app manifest only when the project includes a valid manifest. Check:

- Every referenced file exists and returns successfully from the deployed base path.
- Icon MIME types and declared sizes match the actual assets.
- Light/dark variants are used only when real variants exist.
- The manifest's names, theme colors and icon paths agree with the product.
- No broken legacy favicon path remains.

Do not generate new icon URLs or manifest references without creating and verifying the corresponding assets.

## 5. Optimize critical resource discovery

Use resource hints selectively, based on a measured critical path:

- Use `preconnect` for a small number of critical cross-origin origins that the page will contact early. Add `crossorigin` when required by the resource's fetch mode, especially for font origins.
- Use `dns-prefetch` only as a lower-cost hint where a connection is not yet justified.
- Use `preload` only for resources needed very early and otherwise discovered late, such as a confirmed LCP image, critical font or essential stylesheet. Set the correct `as`, `type`, `crossorigin` and responsive `imagesrcset`/`imagesizes` attributes when applicable.
- Do not preload every image, font, script or stylesheet. Incorrect or excessive preloads compete with more important work and can worsen performance.
- Use `fetchpriority="high"` only for the actual high-priority resource when supported and justified; avoid duplicating priority signals without evidence.
- Use `defer` for classic scripts that need to execute after parsing and preserve dependency order. Use `async` only when execution order does not matter. Prefer module semantics appropriate to the application.
- Keep stylesheets and required resource hints discoverable early; do not introduce fragile JavaScript-based stylesheet loading without a clear need and a no-JavaScript fallback.

Validate hints using a network waterfall and browser performance trace. A hint is useful only when it improves discovery or loading under representative conditions.

## 6. Validate the result

Before completion:

1. Inspect the rendered initial HTML for the target route, not only the source component.
2. Confirm one meaningful title, description and canonical URL per indexable page.
3. Check Open Graph and Twitter metadata for accurate, matching page content and absolute public image URLs.
4. Verify favicons, touch icons and manifest assets return successfully.
5. Check for duplicate, conflicting or stale metadata injected by layouts, plugins or client-side code.
6. Confirm crawler directives do not unintentionally noindex or block the production page.
7. Review preconnect/preload choices against the actual network waterfall and LCP resource.
8. Validate HTML structure and test social previews with platform validators where available.
9. Record routes inspected, evidence, unresolved assets and checks not performed.

## Constraints

- Treat the WHATWG HTML standard and current search/platform documentation as normative for behavior; use HEAD as a practical catalog.
- Metadata improves document semantics and sharing context but does not guarantee search ranking or social-card rendering.
- Do not add structured data unless its values are accurate, visible/appropriate for the page and validated against the applicable schema requirements.
- Respect the existing framework, SSR/SSG architecture, content-management system and deployment base path.
- Do not copy substantial third-party reference content into this skill. Keep these instructions independently authored and link to sources.

## Common AI failure mode

**Failure:** An agent copies metadata across routes or invents canonicals, social images, structured data, or indexing directives without verifying deployed URLs and page content.

**Why it matters:** Incorrect canonicals misdirect search signals, social previews show unrelated content, and inaccurate structured data or robots directives misrepresent or hide pages.

**Symptoms:**
- Distinct routes share metadata
- canonicals point to localhost/previews/redirects
- JSON-LD claims unsupported ratings/offers
- robots and sitemap settings conflict with deployment intent.

**Prevention:** Derive metadata from verified route content and production URL configuration. Check canonical targets, status codes, robots, sitemap, social assets, and structured-data claims. Validate deployed routes and rendered head output; leave unknown values unset.

