# Web platform

## Choose the boundary

- Use native HTML for navigation, actions, input, form submission, and tabular data. A link has a destination. A button performs an action. Give controls a usable name and preserve browser defaults such as opening links in a new tab.
- Keep route state in the URL when users need bookmarks, sharing, or back and forward behavior. Parse URL values and define defaults for missing or invalid values. Coordinate route transitions with page titles, scroll, and focus.
- Keep browser APIs out of server rendering paths. Feature-detect capabilities such as clipboard or geolocation, handle permission denial, and provide a usable fallback. Release listeners, timers, observers, abort controllers, and object URLs when their owner unmounts or changes.
- Use workers for measured CPU-heavy work that can run without the DOM. Account for the cost of moving data between threads and how cancellation and cleanup work.

## Compatibility and offline behavior

- Use the project's supported browser and device matrix. Check touch, keyboard, text scaling, and slow or interrupted connections for the changed flow. Add a fallback for an essential feature that depends on an unsupported API.
- Choose storage by lifetime and access needs. Keep private session data scoped and treat browser storage as fallible. Design graceful recovery for quota errors or cleared storage.
- Add service workers and offline queues when the product needs them. Define which reads may be stale, which writes can be queued safely, and how users see pending, failed, or conflicting work. Keep private data out of shared caches and account for upgrades and sign-out.

## JavaScript and browser events

- Keep modules focused and keep top-level side effects deliberate. Use the project's state update conventions and preserve stable identities for records so DOM and framework reconciliation can follow edits.
- Understand event propagation before adding delegation. Use the appropriate target and preserve default input behavior. Cancel a default action only when the app provides the corresponding behavior.
- Handle promise rejection at the owning boundary. Use parallel requests for independent work, and choose how partial failures are presented when several panels load together. Long synchronous tasks can block input and painting. Measure the work before splitting it, moving it to a worker, or deferring it.

[MDN secure contexts](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Secure_Contexts)
