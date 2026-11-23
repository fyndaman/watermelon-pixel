# Source map and maintenance

Repository: `morpheus-product`. Inspected 2026-11-17, clean working tree at `43651510f6441ff3b21d3adc48fc9c9cc2f7c8d3`. Paths are relative to that checkout, not runtime dependencies of the npm package.

## Source groups

- Visual intent: `.impeccable.md` (data engineers/analysts, speed, precision, restrained delight). Intent is distinct from shipped appearance.
- App colors and theme bridge: `src/styles/theme.css`. Both `:root` and `html[data-theme="dark"]` maps are extracted verbatim as values into `tokens.json`.
- App Sass token aliases: `src/styles/common/_tokens.scss`; shared fallback colors/radii/font: `react-commons/wcommon/base/variable.scss`.
- Page structure and responsive measurements: `src/components/CommonPageStyles.jsx`, `src/styles/common/pageShell.scss`.
- Button contract and variants: `src/components/ThemedButton.jsx`, `src/styles/common/themedButton.scss`.
- Configured design scales: `spacing.json`, `typography.js`, `tailwind.config.js`. Runtime font loading also involves `src/index.css`, `src/index.jsx`, and `react-commons/wcommon/base/fonts.scss`; computed font selection was not measured.
- Theme persistence/toggle: `react-commons/wcommon/components/header/index.jsx`. App layout: `react-commons/wcommon/layouts/index.jsx`, `mainPageLayout.jsx`.
- Loading skeletons, dependent fields, creation, and list pagination: `src/pages/Services/Services.jsx` and `services.module.scss`.
- Dense monitoring, URL state, detail surfaces, metric alignment: `src/pages/Monitoring/Monitoring.jsx`, `MonitoringByUsecase.jsx`, `monitoring.module.scss`.
- Empty states, selection, deletion/invalidation, and modal composition: `src/pages/Assertions/Assertions.jsx`.
- Controlled date/numeric form and GenDS adapters: `src/components/SchedulerModal/SchedulerModal.jsx`, `schedulerModal.module.scss`.
- Entity creation selector: `src/components/DatasetCombobox/DatasetCombobox.jsx`; multi-selection: `src/components/TableCombobox/TableCombobox.jsx`; infinite remote selection: `src/components/InfiniteUsecaseCombobox/InfiniteUsecaseCombobox.jsx`.
- Async helpers: `src/hooks/useDebouncedValue.js`, `useInfiniteUsecases.js`, `useModalClass.js`.
- Technical text and announcement: `src/components/CopyCodeBlock.jsx`, `copyCodeBlock.scss`; compact badge: `src/components/NextRunBadge.jsx`, `nextRunBadge.module.scss`.
- Stated developer conventions and flows: `.ai/CONVENTIONS.md`, `.ai/WORKFLOWS.md`. Consult the source when these disagree: current CommonPageStyles uses class wrappers, not styled-components. The SCSS-forward rule supersedes an older styled-components sentence in the same conventions file.

## Maintaining the snapshot

The async engineering guidance supplements the original snapshot with a clean-tree source review at commit `a1590f514b265d798391c64ef2cbb0cf62023c71`:

- `src/pages/DatabricksConnector/CreateSourceModal.jsx` and `sourceConfigForm.js` show scoped invalidation, request cancellation and identity checks, normalized payloads, and duplicate-save protection. `src/__test__/pages/CreateSourceModal.test.jsx` captures the intended behavior under late responses and ambiguous save results.
- `src/pages/Cube/KpiRequestDetail.jsx` and `KpiMyRequests.jsx` show status-driven polling. `src/__test__/pages/KpiApprovals.test.jsx` includes a case that checks polling stops after completion.
- `src/pages/ConnectorPlatform/InlineError.jsx` shows how to reveal an error banner in a long dialog and announce it as an alert.
- `src/routes.js`, `src/pages/DatabricksConnector/`, and `src/services/` demonstrate route registration, colocation of feature UI, styles and validation, and a separate service layer. The architecture guide adapts these boundaries to the target project's conventions.

The bundled guidance abstracts these behaviors for other applications.

Inspect these groups again when the source system changes. Record the new commit, date, and working-tree condition. Re-extract theme variables and spacing directly from their static source files; do not execute arbitrary project configuration to obtain tokens. Review theme formats and semantic roles, then update measurements and component APIs from actual usage. Keep adopted recommendations marked separately from source observations.

No original app services, credentials, operational data, branded font binaries, images, or third-party component implementation is bundled. Recipes are newly written adaptations. This pack does not assert exhaustive coverage of every feature or every legacy react-commons component; it covers the reusable visual foundation and representative UI workflows listed above.
