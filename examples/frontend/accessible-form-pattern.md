# Accessible Form Pattern

Illustrative native HTML. Adapt server routes, validation rules and CSRF protection to the application's authentication and deployment model.

    <form action="/profile" method="post">
      <div>
        <label for="display-name">Display name</label>
        <p id="display-name-help">Use the name shown on your public profile.</p>
        <input id="display-name" name="displayName" type="text"
          autocomplete="nickname" maxlength="80" required
          aria-describedby="display-name-help">
      </div>
      <div>
        <label for="email">Email address</label>
        <input id="email" name="email" type="email"
          autocomplete="email" required>
      </div>
      <button type="submit">Save profile</button>
    </form>

## Error-state requirements

When server validation fails:

1. Preserve the user's valid input.
2. Render a concise error summary before the form and link each summary item to its field.
3. Associate each field's specific error using aria-describedby and set aria-invalid=true only while invalid.
4. Move focus to the summary or first invalid field when this materially helps recovery.
5. Announce asynchronous success or failure through an appropriate status region.
6. Revalidate all submitted values and authorization on the server; client constraints are usability support, not a security boundary.

Do not add hidden fields as trusted authorization claims. Apply CSRF defenses when required by the session model.
