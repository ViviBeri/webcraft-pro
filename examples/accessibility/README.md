# Accessibility Engineering Examples

These examples are implementation starting points, not proof of WCAG conformance. Adapt them to the product, native platform behavior and supported browser/assistive-technology matrix.

## 1. Native semantic structure

```html
<a class="skip-link" href="#main">Skip to main content</a>

<header>
  <nav aria-label="Primary">
    <a href="/">Home</a>
    <a href="/services">Services</a>
  </nav>
</header>

<main id="main">
  <h1>Account settings</h1>
  <section aria-labelledby="profile-heading">
    <h2 id="profile-heading">Profile</h2>
    <form>
      <label for="display-name">Display name</label>
      <input id="display-name" name="displayName" autocomplete="nickname">
      <button type="submit">Save changes</button>
    </form>
  </section>
</main>
```

Use native elements, meaningful headings and visible labels. Add only the landmarks and relationships the page needs.

## 2. Visible focus

```css
:where(a, button, input, select, textarea, [tabindex]):focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 3px;
}

.skip-link {
  position: absolute;
  inset-block-start: 1rem;
  inset-inline-start: 1rem;
  z-index: 1000;
  transform: translateY(-200%);
}

.skip-link:focus {
  transform: translateY(0);
}
```

Check focus contrast against the actual background and ensure sticky headers do not cover focused content.

## 3. Playwright and axe-core scan

```ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('critical account page has no automated violations', async ({ page }) => {
  await page.goto('/account');

  await expect(page.getByRole('heading', { name: 'Account settings' }))
    .toBeVisible();

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

Add separate scans for meaningful states such as an open dialog, expanded navigation, validation errors and loaded results.

## 4. Manual keyboard checklist

- [ ] Reach every interactive control with Tab and Shift+Tab.
- [ ] Activate links and buttons with their expected keys.
- [ ] Confirm focus is always visible and not obscured.
- [ ] Open and close dialogs; verify focus entry and restoration.
- [ ] Trigger form errors and verify focus and error associations.
- [ ] Confirm no keyboard trap or unexpected focus jump.
- [ ] Repeat at narrow viewport and browser zoom.

## 5. Manual assistive-technology checklist

- [ ] Navigate by landmarks and headings.
- [ ] Confirm controls expose useful names, roles, values and states.
- [ ] Complete a critical task without relying on visual position.
- [ ] Verify important dynamic updates are announced.
- [ ] Verify errors are understandable and associated with their fields.
- [ ] Record the browser, assistive technology and versions used.

## Important limitation

Automated scans catch only a subset of accessibility barriers. Manual keyboard, screen-reader, responsive and content assessments remain necessary. Report scope and untested combinations honestly.
