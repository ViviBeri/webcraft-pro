---
name: network-caching
description: Improve network delivery when repeated requests, slow origins, large responses or poor cache policies affect page performance.
---

# Network and Caching Performance

Use this skill when origin latency, asset transfer, cache misses or inefficient resource discovery affect user journeys.

## Workflow

1. Capture a network waterfall for cold and warm cache conditions.
2. Separate origin response time, connection setup, redirects, transfer time and client processing.
3. Reduce avoidable requests and payload bytes. Enable Brotli or gzip where supported and appropriate.
4. Set explicit cache policies by resource type:
   - Fingerprinted static assets can use long-lived public caching and immutable semantics.
   - HTML and mutable entry documents should revalidate so deployments remain fresh.
   - Personalized or sensitive responses must not be shared through public caches.
5. Use ETag or Last-Modified validators where they improve revalidation.
6. Evaluate CDN placement, cache hit ratio, origin shielding and invalidation behavior.
7. Use preload, preconnect or other resource hints only for resources proven critical and known early.
8. Verify cold-cache correctness, warm-cache speed, deployment freshness and privacy boundaries.

## Engineering rules

- Never publicly cache user-specific responses or secrets.
- Pair long-lived immutable caching with content-hashed or versioned URLs.
- Avoid long cache lifetimes for mutable HTML and unversioned assets.
- Do not add resource hints speculatively; each hint consumes connection or bandwidth resources.
- Treat service workers as application code with lifecycle, update and stale-content risks.
- Preserve correct Vary behavior and content negotiation.
- Validate headers at the deployed edge, not only in local configuration.

## Deliverables

Document waterfall evidence, cache policy by resource class, compression, CDN behavior, privacy considerations and deployment verification.
