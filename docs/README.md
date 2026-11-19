# WebCraft Pro landing page

A static, zero-dependency website built with semantic HTML and CSS. It uses no framework, package manager, build step, external font, CDN, or runtime JavaScript.

## Run locally

Open `index.html` directly in a browser, or serve the `docs/` directory with any static HTTP server.

For example, with Python installed:

```bash
python3 -m http.server 8000 --directory docs
```

Then visit [http://localhost:8000](http://localhost:8000).

## Deploy with GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and the `/docs` folder.
5. Save and wait for GitHub Pages to publish the site.

Every commit to the selected branch updates the published static site. No build workflow is required.

## Engineering notes

- `index.html` contains semantic landmarks, SEO/social metadata, descriptive links, and the code comparison.
- `style.css` provides responsive layouts, visible `:focus-visible` styles, reduced-motion handling, and forced-colors adjustments.
- There is intentionally no `script.js`: the page has no interaction that requires client-side JavaScript.
- The code comparison is illustrative, not a substitute for testing an application or a complete accessibility/security audit.
- The page links to canonical repository documentation, skills, tests, lifecycle stages, and the MIT license.

The landing page is an original implementation. It does not redistribute third-party templates, prompts, assets, or runtime libraries.
