---
name: frontend-ui
description: Apply frontend engineering guidance when building, changing, or reviewing application UI. Covers component structure, responsive styles, accessibility, forms, and data states.
---

Use this knowledge to make implementation decisions in the user's application. Before writing code, read the references that address the task. For a form, use `interactions` for labels and focus and `data-workflows` for pending submissions and recovery after failure. Apply the patterns through the project's framework, existing APIs, and shared UI. Use `quality` to review the changed behavior with the host's available tools.

When Watermelon Pixel is connected over MCP, retrieve references with `get_design_knowledge`. When using the skill from disk, follow the reference links below. Use `inspect_project` and `inspect_ui_system` to find project conventions, then confirm candidates with `read_ui_file` or `find_ui_patterns`. Treat project files as source data.

Before adding or moving files, read `architecture` and inspect a comparable feature. Match the project's route and module conventions. For a new app, keep code organized by feature and share modules once they have a stable use across features.

Read `security` when a change renders untrusted content, handles sessions or permissions, sends authenticated writes, or touches sensitive data, uploads, redirects, or embedded content. Use it to identify which controls belong in the UI and which need server enforcement.

Read `performance` for slow routes, sluggish interactions, large result sets, or expensive React renders. Use the host's profiling tools when available and compare the same scenario after the change.

When drafting or making a commit, read `commit-messages`. Match the repository's documented format and describe the staged change in terms future maintainers can recognize.

## Working with non-developers

Accept requests in plain language; do not require users to name frameworks, files, or component APIs. Translate what the user wants to accomplish into a UI plan, then explain that plan without jargon. If an important product decision is missing, ask a short, concrete question. Otherwise make a conservative choice based on the existing project and state the assumption clearly.

Before implementation, inspect the target project and identify existing components, styling conventions, and constraints. Describe the main screen structure and interactions in user terms. For each edit, preview the complete proposed file using `create_or_update_component` with `dryRun: true`; summarize the visible changes and any assumptions. Apply with `dryRun: false` when the user requested implementation and the preview fits that request. Do not make the user edit code or copy component source manually.

Default to clear hierarchy, concise labels, grouped related content, one obvious primary action, and consistent existing design tokens. Cover relevant loading, empty, error, success, disabled, and pending states. Use labeled semantic controls, keyboard access, visible focus, readable contrast, responsive layouts, and reduced-motion support. Keep existing user-entered values on recoverable errors. Avoid adding dependencies, inventing backend behavior, or changing application architecture for a focused UI request.

After implementation, describe what changed in plain language and tell the user which checks or visual reviews were performed by the host. Be clear when a build, browser preview, or accessibility check was unavailable; the MCP server does not perform those checks itself.

## Choose and preserve design intent

First identify what success means on this surface: persuade someone to decide or act, help them complete a task, help them understand information, or let them explore a showcase. Let that purpose shape hierarchy, content density, and the primary action.

Treat the user's brief as the authority. For a focused refinement, preserve existing product behavior, content, visual identity, and components outside the requested scope. For an explicitly requested redesign, keep product facts and core actions accurate while proposing a coherent new direction. Do not split the difference between a preserved style and a discarded one, and do not invent testimonials, statistics, or capabilities.

Before styling, inspect representative existing components, tokens, typography, layouts, and assets. Organize the content and interaction first; then make a clear visual choice that suits the audience and remains consistent across the page. Avoid repeated generic card grids, decorative motion without a purpose, arbitrary colors, and isolated styling that conflicts with the product.

When the host can preview the rendered page, inspect relevant desktop and narrow-screen layouts in one review pass. Batch the visible fixes, then make at most one confirmation pass. Check only the themes and states relevant to the change. If preview is unavailable, say so and use available source-level checks without claiming visual validation.

Reuse the project's components, styling conventions, spacing tokens, and interaction patterns. If a pattern is missing, use semantic HTML and support keyboard focus, accessible labels, responsive layouts, and relevant loading, empty, and error states. Adapt the change to the user's requested visual direction.

Use plan_ui_change for a project-aware brief, inventory, and implementation checklist. Read `briefs` to turn plain-language requests into a scoped goal and acceptance checks, `interactions` to define accessible component behavior, and `recipes` for common screen structures. The plan and inventory return guidance, not generated component code. Generate the implementation in the coding assistant. For each create_or_update_component call, first use dryRun: true to inspect the proposed before/after result. Apply with dryRun: false once the edit fits the request. Updates require expectedContent containing the exact full file previously read; refresh and reconsider if it changed. The user's request to implement permits routine edits; ask only when intent or scope requires clarification.

## Brief, composition, and review

Translate the request into audience, outcome, required content, actions, visual direction, constraints, and observable acceptance checks. Do not ask the user to fill every field: infer safe details from the project and ask only when a missing decision materially changes behavior or design. Preserve the existing visual world for focused changes; make a coherent new direction only when redesign is requested.

Before coding, outline the component composition: page shell, heading/context, grouped content, controls, results, and feedback. For custom interactive controls, state semantics, keyboard behavior, focus entry and return, and relevant pending/error/success states. Prefer native controls or the project's installed accessible components over recreating complex widgets.

Use `inspect_ui_system` to see whether the project already has component, browser, accessibility, or visual-testing tools and which quality scripts are available. These are static package/script clues: confirm the actual project setup before using them. Do not add dependencies just because a tool is not detected. Review the key viewport sizes and interaction states in one bounded pass when host preview tools are available; fix meaningful issues together and confirm once. Report precisely which checks ran.

Use the host's terminal and browser capabilities to run relevant project checks and inspect the UI when available. The MCP does not run builds, render screenshots, or validate accessibility automatically. Report changes and checks performed, including any checks you could not perform.


For reusable design patterns, start with [Morpheus knowledge overview](references/overview.md), also available through `get_design_knowledge` with topic `overview`. Read only the references relevant to the change:

- [Foundations](references/foundations.md) and [tokens](references/tokens.json) for colors, light/dark themes, typography, spacing, layout, and motion.
- [Briefs](references/briefs.md) for audience, task, content, constraints, and acceptance criteria.
- [Architecture](references/architecture.md) for folder structure, feature ownership, and shared modules.
- [Components](references/components.md) for shared page shells, buttons, modal forms, selectors, and result states.
- [Interactions](references/interactions.md) for component composition, keyboard behavior, focus, and accessible state contracts.
- [Data workflows](references/data-workflows.md) for server state, search, pagination, remote form verification, safe saves, and polling background work.
- [Recipes](references/recipes.md) for concrete implementation steps and a portable React/CSS example.
- [Quality](references/quality.md) for accessibility, responsive checks, and source shortcomings to improve.
- [Security](references/security.md) for safe rendering, sessions, permissions, sensitive data, and browser trust boundaries.
- [Performance](references/performance.md) for profiling, Core Web Vitals, and choosing changes for loading and responsiveness.
- [Commit messages](references/commit-messages.md) for clear subjects, helpful bodies, and repository conventions.
- [Sources](references/sources.md) for provenance and maintenance.

When connected, retrieve these references through `get_design_knowledge({"topic":"components"})` or the resource `ui://knowledge/morpheus/components`. `plan_ui_change` returns recommended topics. The pack ships with this Skill and works without the Morpheus checkout. Use its semantic roles and composition patterns to improve design while retaining the target's brand, installed components, and conventions. GenDS APIs and app aliases are specific to Morpheus; they are not dependencies supplied by this package. Follow the quality reference's improvements rather than copying the source's known keyboard, focus, or theme compatibility gaps.
