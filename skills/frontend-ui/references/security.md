# Frontend security

Trace the inputs touched by the change from their origin to where they are rendered, stored, or sent. Treat data from users, APIs, URLs, browser storage, uploaded files, and cross-window messages as untrusted. Identify which decisions belong to the server before implementing the UI.

## Render and navigate safely

- Render untrusted text through the framework's escaped bindings or DOM text APIs. If rich text is required, use the project's maintained sanitizer with an explicit policy at the rendering boundary. Review link and media rules separately and avoid modifying sanitized HTML afterward. Apply Content Security Policy through the existing deployment layer as an additional safeguard. [OWASP XSS prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- Parse and validate destinations before assigning them to links or redirects. Allow only the schemes and origins needed for the feature. For a post-login redirect, prefer a known internal route and fall back to a safe default if the destination fails validation.
- For cross-window messaging, send to the expected origin and check the sender's origin, expected window, and message shape before acting. Keep iframe permissions limited to what the embed needs. [MDN postMessage reference](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)

## Keep sessions and permissions at the right boundary

- Reuse the project's authentication and API client. Hidden buttons, route guards, and client validation improve the UI. The server must authenticate and authorize reads and writes against the requested record and account, and validate submitted values.
- For server-managed sessions, use the established cookie policy, including Secure, HttpOnly, and a SameSite setting compatible with the sign-in flow. Use the framework's CSRF protection for cookie-authenticated writes. Keep CORS origins scoped to intended callers. [OWASP CSRF prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- Handle expired sessions and access denied separately. When users sign out or switch accounts, clear or isolate data belonging to the old session and discard its pending responses. Scope cached private data to its account or tenant.

## Keep sensitive data out of the browser

- Treat frontend bundles, public environment variables, and serialized page data as visible to users. Keep private API credentials on the server. Avoid adding session tokens or sensitive response data to storage, URLs, logs, analytics, or error messages.
- Show user-facing errors with a clear next action. Send detailed diagnostics through the project's approved reporting path with sensitive fields redacted.
- For file uploads, use client-side type and size checks for immediate feedback. Enforce authorization, size, and file validation on the server. Use the app's approved preview method for untrusted files and release temporary object URLs when their previews are discarded.

## Review the behavior you changed

- Check that plain text displays as text, rich text follows the approved policy, and invalid link destinations use the safe fallback.
- Verify the UI behavior for missing, expired, and denied sessions where relevant. Confirm server-side permission checks and, for cookie-authenticated writes, confirm the application's CSRF protection is connected.
- Check that private data is removed when accounts change and that messages or uploads outside the accepted policy are rejected. State which controls still need verification in the server or deployment environment.
