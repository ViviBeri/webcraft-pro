# Skill-guided example: accessible React login form

This corrected example uses native form semantics, programmatic labels, a named submit button, and visible keyboard focus.

```jsx
import React from "react";

export function LoginForm({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    onSubmit?.({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    });
  }

  return (
    <form className="login" aria-labelledby="login-heading" onSubmit={handleSubmit}>
      <h1 id="login-heading">Sign in</h1>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="username" required />
      </div>

      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>

      <button className="submit" type="submit" aria-label="Sign in">
        Sign in
      </button>
    </form>
  );
}
```

```css
.login :where(input, button):focus-visible {
  outline: 3px solid #1d4ed8;
  outline-offset: 3px;
}

.submit {
  cursor: pointer;
}
```

## Improvements

- A native `form` and `button` provide expected semantics and keyboard behavior.
- Each input has a visible, programmatically associated `label`.
- The submit button has a clear accessible name.
- `:focus-visible` makes keyboard focus perceivable.
- The form exposes its heading through `aria-labelledby`.

The `aria-label` on the submit button is intentionally explicit for this comparison; because the button also has visible text, the visible text already supplies its accessible name and the attribute could be omitted without losing accessibility. Automated checks should be supplemented with keyboard and assistive-technology testing.
