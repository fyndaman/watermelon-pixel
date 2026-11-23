# State and network engineering

- Give each value an owner. Keep transient state local, use the URL for shareable view state, and put remote snapshots in the project's request cache. Derive values when possible. Reserve global state for behavior or data shared across otherwise independent areas.
- Put transport details in the existing client or adapter. Distinguish aborted requests, transport failures, server responses, validation errors, and stale refreshes. Keep query keys scoped to all inputs that affect results, including account or tenant where relevant.
- Decide which reads may be reused or revalidated. Review browser, CDN, service-worker, and application caches independently. Clear or isolate private state on sign-out or account change.
- Retry according to the operation's contract. Use bounded retry for transient read failures. Retry writes only when the API guarantees idempotency or provides a way to reconcile an uncertain result. Use optimistic updates only when you can reconcile or roll back after failure.
- Model transitions explicitly when a workflow has multiple competing outcomes. Check a late result, an interrupted request, a failed write, and a successful retry with predictable fixtures.
