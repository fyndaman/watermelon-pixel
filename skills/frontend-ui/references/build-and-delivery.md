# Build and delivery

- Identify the package manager, lockfile, supported Node version, build command, and deploy target. Follow the repository's workspace and CI conventions. Keep dependency updates reviewable and inspect why a new dependency is needed.
- Preserve the server and client configuration boundary. Treat values embedded in browser bundles as public. Check that environment validation runs where the corresponding values are required.
- Verify the production artifact and routes in a representative preview. Check assets, route rewrites, security headers, and cache policy at the deployment boundary. Keep an explicit record of the version or commit shipped.
- Use the project's release controls such as staged rollout, feature flags, and rollback. Give experimental flags owners and cleanup criteria. Keep API and asset versions compatible with clients already loaded in browsers.
- For a shared package, review public exports, versioning implications, and package contents. Match the project's release and commit conventions.
