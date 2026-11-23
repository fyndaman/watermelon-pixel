# Observability and privacy

- Define the user outcome first. Record signals that help distinguish a task failure from expected states such as validation errors or empty results. Use the project's existing error reporting, analytics, and performance tools.
- Capture a small set of useful fields such as route, operation, release version, and a supported correlation ID. Apply the project's consent and retention policies. Exclude secrets, unneeded personal fields, and raw form or URL contents.
- Measure user-facing timing in context. Distinguish local traces, test runs, and field telemetry. Compare equivalent routes and devices or cohorts when diagnosing regressions.
- Make recovery clear in the UI. Show the user what happened and how to continue. Keep diagnostics in the approved reporting path and group failures by cause to avoid alert noise.
- Verify a representative event or error in the appropriate test environment. Confirm event payload shape, redaction, and release attribution.
