# Foundations

## Overview

Design for repeated operational work: keep the task, result, and next action easy to scan. Use hierarchy and spacing to group controls. Reserve strong accents for actions, selected items, and meaningful data states. The design brief in `.impeccable.md` emphasizes speed, precision, and restrained feedback; actual screen styles are the visual evidence.

## Colors

`tokens.json` contains the exact declared colors for both themes from `src/styles/theme.css`. Use semantic variables such as `--color-bg-soft` for the workspace, `--color-bg-card` for cards/dialogs, `--color-text-strong` for primary text, `--color-text-muted` for metadata, `--color-border` for boundaries, `--color-primary` for the action accent, and danger/success foreground/background pairs for status.

Light is the default. Dark mode uses `html[data-theme="dark"]`; this has greater specificity than a library's injected `:root`. The header persists a choice under `morpheus-theme`. Theme state is applied in an effect; this alone does not establish flash-free startup. When adapting to another project, initialize its theme using its established startup mechanism.

The source has three token layers: app `--color-*`, legacy shared variables such as `--PrimaryColor`, and GenDS `--gd-*`. Its dark selector bridges those layers, including HSL channel values used by the library. Preserve the library's expected value format. New SCSS aliases should reference CSS custom properties so changing themes at runtime does not require rebuilding Sass.

Prefer library theme APIs or scoped adapter classes over broad global overrides. Morpheus has compatibility selectors for `.bg-white`, generated color classes, and role attributes; these are version-sensitive workarounds, not portable design primitives. Test dropdown portals, inputs, badges, and datepickers in both themes.

## Typography

Tailwind's configured families are Inter and Inter Display. `src/index.css` registers JioTypeWMS fonts and the shared Sass primary font falls back to NitrozenType/Helvetica/Arial. Do not claim a single actual rendered family without computed-style evidence. Reuse the target's installed family; no font binaries are distributed in this pack.

Source page hierarchy: title 24/32 at 700, mobile 22/30; section title 18/24 at 600; description and form text 14/20. Monitoring table body uses 13/18; headers use compact 11px uppercase at 600 with 0.05em tracking. Monospace is for identifiers, paths, SQL, and errors, not all interface labels. Tabular numbers help align run metrics. Some observed styles omit line-height; define one explicitly in new work.

## Layout

The page shell uses 32px vertical and 40px horizontal padding, then 24px at max-width 1024px and 16px at max-width 640px. Sections use 24px top separation and 16px bottom separation. Header controls wrap with a 10px gap on small screens. These are the current app-shell values; legacy GlobalStyle also exports a different breakpoint set. Match the surface being extended.

The desktop app shell has a collapsible 252px/68px sidebar and a flex content area with `min-width: 0`. The main area scrolls vertically; dense table wrappers scroll horizontally. Avoid making the entire viewport horizontally scroll because a table needs a minimum width. Small screens need a tested navigation strategy; a collapsible desktop sidebar alone is not proof of mobile usability.

`spacing.json` defines a 0, 1, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80px spacing vocabulary. Common gaps are 8px for related controls and 16/24px for larger groups. Use `minmax(0, 1fr)` and `min-width: 0` for flexible grids containing inputs or long identifiers.

## Elevation & Depth

Prefer surface changes and 1px borders for normal cards. Monitoring uses a subtle 0 1px 2px shadow; overlays use stronger elevation. Keep background, borders, and text consistent as one surface system in each theme. Heavy shadows belong to overlays, not every list item.

## Shapes

The app shell card radius is 12px. Legacy Sass radius aliases resolve to 4/8/16px defaults, while the GenDS spacing file declares component presets such as 24px cards and 32px modals. Preserve these as distinct layers; they are not one consistent universal scale. Use the existing component's radius in extensions and choose one coherent scale for new projects. Status pills use a fully rounded shape.

## Components

See `components.md` for actual wrapper APIs and `recipes.md` for composition. Shared page styles include small page-enter and empty-state transitions. Use them once at the container level; do not repeatedly animate every child on background refetch. The source disables these animations for reduced motion. Avoid introducing motion into frequent data updates.

## Do's and Don'ts

- Keep exact token values in `tokens.json`; reference roles in component styles.
- Check focus, hover, selected, disabled, and error states in both themes.
- Keep visible status text alongside semantic color.
- Do not turn library compatibility hacks or legacy values into defaults for every new project.
- Do not infer contrast compliance from token names; check rendered combinations.

Sources: `src/styles/theme.css`, `src/styles/common/_tokens.scss`, `src/styles/common/pageShell.scss`, `src/pages/Monitoring/monitoring.module.scss`, `react-commons/wcommon/base/variable.scss`, `react-commons/wcommon/components/header/index.jsx`, `react-commons/wcommon/layouts/mainPageLayout.jsx`, `react-commons/GlobalStyle.js`, `tailwind.config.js`, `typography.js`, `spacing.json`, `src/index.css`.
