# Raw baseline: React login form

This deliberately flawed example represents a possible unconstrained implementation. It is not a recommended pattern.

```jsx
import React from "react";

export function LoginForm() {
  return (
    <div className="login">
      <h1>Sign in</h1>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <div className="submit" onClick={() => alert("Signing in")}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
    </div>
  );
}
```

## Known defects

- The clickable `div` is not a native button and does not provide native keyboard activation.
- The icon-only action has no accessible name or `aria-label`.
- The form fields have placeholders but no associated labels.
- No visible `:focus-visible` styling is provided for keyboard users.

This is intentionally a negative example for review and automated accessibility testing.
