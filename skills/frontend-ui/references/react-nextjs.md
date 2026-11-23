# React and Next.js implementation decisions

Check the installed framework version and the route being changed. In Next.js, identify whether that route uses the App Router or Pages Router before choosing file conventions, data fetching, and caching behavior.

## React

- Keep transient UI state close to the controls that use it. Derive values from existing props or state when possible. Keep shareable filter or pagination state in the URL when users need to bookmark or restore it.
- Use the app's existing router data APIs or query cache for remote data. Include the inputs that affect the result in the query key. Represent initial loading, background refresh, empty results, and request failure separately.
- Put side effects caused by a specific action in its handler. Use effects to synchronize with external systems and clean up subscriptions or requests when they become obsolete.

## Next.js

- **App Router:** Start with Server Components for route composition and server-side reads. Use a focused Client Component for state, event handlers, or browser APIs. Keep secrets and privileged data access in server modules. Pass only the serializable data the client needs.
- **Place loading and errors near the affected content.** Use route-level loading and error boundaries when a whole route segment is affected. Use a nearby boundary or inline state when independent regions can remain usable, such as a search panel or a save action.
- **Make freshness explicit.** Match the installed version's caching behavior and the route's needs. Review cache scope and invalidation after writes. Keep account-specific data out of caches shared across users.
- **Pages Router:** Follow existing page-level data fetching and routing conventions. Keep the change within the current router unless a migration is part of the request.

For a Next.js settings page, the route can load the initial record on the server and pass the editable fields to a Client Component. The form owns its draft and save feedback, while the server verifies permission and applies the write.

[Next.js server and client components](https://nextjs.org/docs/app/getting-started/server-and-client-components) · [Next.js data fetching](https://nextjs.org/docs/app/getting-started/fetching-data)
