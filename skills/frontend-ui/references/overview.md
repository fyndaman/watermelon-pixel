# Morpheus UI knowledge

This knowledge pack captures the reusable UI implementation in `morpheus-product`, inspected on 2026-11-17 at commit `43651510f6441ff3b21d3adc48fc9c9cc2f7c8d3` with a clean working tree. It is a source-based snapshot, not a live visual or accessibility audit. Source paths below are relative to that repository. No dependency on the original checkout is required to consume this pack.

Morpheus serves data engineers and analysts performing repeated, precise tasks: browse data services, run queries, configure schedules, and investigate pipeline failures. Its useful design characteristics are clear hierarchy, compact operational layouts, semantic status colors, restrained indigo actions, runtime themes, and short feedback transitions. Apply those principles to comparable product interfaces while respecting the target project's brand and libraries.

## Read by task

- `architecture` covers file placement, framework routes, feature ownership, and shared modules.

- `foundations`: color roles, typography, spacing, responsive layout, depth, motion, and theme integration.
- `components`: shell primitives, buttons, forms, dropdowns, loading and empty states, code blocks, and badges.
- `data-workflows`: queries, mutations, server pagination, shareable filter state, dependent fields, and infinite lookup lists.
- `recipes`: concrete page, form, monitoring, and selector implementation recipes with a portable React example.
- `quality`: accessibility checks, responsive verification, migration conflicts, and improvements to make instead of copying defects.
- `security`: rendering untrusted content, handling sessions and permissions, and protecting sensitive data.
- `performance`: diagnosing slow loading and interactions, reducing unnecessary work, and measuring improvements.
- `sources`: source map and evidence classification for maintaining this pack.
- `tokens`: machine-readable light/dark variables and measured source constants.

Retrieve a topic with `get_design_knowledge({"topic":"foundations"})`, or read the corresponding reference file alongside this Skill. MCP resources use `ui://knowledge/morpheus/<topic>`.

## Applying the knowledge

Inspect the target project first. Existing tokens and shared primitives take precedence when extending an established UI. For Morpheus itself, reuse GenDS, ThemedButton, CommonPageStyles, and SCSS modules. For another project, translate the roles and interaction patterns into its own components; GenDS, Morpheus aliases, and service APIs are not bundled dependencies.

Use `tokens.json` when the user requests Morpheus styling or when establishing a compatible new interface. Do not install GenDS, ship brand assets, replace fonts, impose data-platform domain rules, or change a target project's architecture solely because this pack contains those examples.

## Evidence and limits

Source code takes precedence over older prose. The source defaults to light mode despite the dark-leaning design brief. SCSS modules and shared class wrappers are current outside `react-commons`; old docs still mention styled-components. Tailwind specifies Inter while legacy font layers also load. Native tables and local selectors exist despite GenDS-first guidance. The references call out these distinctions and identify improvements separately from observations.
