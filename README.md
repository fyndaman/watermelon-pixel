# watermelon-pixel

**Frontend engineering guidance for coding assistants.**

[View the source on GitHub](https://github.com/fyndaman/watermelon-pixel)

Watermelon Pixel gives your coding assistant a frontend engineering playbook and tools for inspecting the app it’s working on. The playbook covers where code belongs, how interfaces should behave, and what to check before handing off a change. The assistant applies that guidance using the app’s existing framework, components, and conventions.

For example, ask it to **improve a settings form**. It can find the app’s existing fields and save flow, consult guidance on keyboard focus and failed saves, and propose an edit that keeps people’s input when saving fails. Your assistant writes the code and uses its own terminal or browser tools for builds, tests, and visual review.

[Quick start](#quick-start) · [Worked example](#worked-example-improve-a-settings-form) · [Guidance topics](#guidance-topics) · [MCP tool reference](#mcp-tool-reference) · [Troubleshooting](#troubleshooting)

## Quick start

You need **Node.js 22 or newer** and a coding assistant that supports local MCP servers over stdio. Add this entry to your assistant’s MCP settings. The settings location and configuration format depend on the host.

```json
{
  "mcpServers": {
    "watermelon-pixel": {
      "command": "npx",
      "args": [
        "-y",
        "watermelon-pixel@latest",
        "--root",
        "/absolute/path/to/your/frontend-project"
      ]
    }
  }
}
```

Replace the example path with your app’s directory, then reload the assistant and check that the server is connected. Each server entry points to one project. To pin a release, replace `@latest` with a specific published version.

### Try it with a real task

> Use Watermelon Pixel to improve our settings form. Keep what I typed if saving fails, make errors easy to find with the keyboard, and show me the proposed changes first.

You can describe the task in everyday language. Say who uses the screen, what they need to do, and any important constraints. For a code review, ask the assistant to use the guide and report what it checked.

### More prompts to try

- **Build a screen.** “Add an orders page with a status filter and a usable layout on phones. Reuse our existing table and filters. Distinguish a store with no orders from a search with no matches.”
- **Diagnose slow React UI.** “Typing in the product filter feels slow. Use the performance guidance to identify whether rendering or requests are causing the delay. Show what you measured.”
- **Review a browser security boundary.** “Review how we render customer notes and where the sign-in flow sends people afterward. Identify which checks belong in the frontend and which need server enforcement.”
- **Draft a commit message.** “Use the commit message guide to describe the staged settings change in our repository’s usual style.”

## What the assistant gets

1. **Engineering guidance.** Load the bundled workflow with `get_component_guidance`, then retrieve the references relevant to the task with `get_design_knowledge`. A form change might use `interactions`, `data-workflows`, and `quality`.
2. **Project context.** Inspect the app’s files and package manifest, find candidate components and design tokens, and read nearby code to confirm the existing patterns.
3. **A planning checklist.** `plan_ui_change` returns the request, project context, recommended topics, and prompts about goals, constraints, and acceptance checks. The assistant uses this information to make an implementation plan.
4. **A file preview.** The assistant can submit its proposed code for one file and see the current and proposed contents before writing. It can then use the host’s tools to check the change.

## Worked example: improve a settings form

1. **Find the existing implementation.** The assistant uses `inspect_ui_system` and `find_ui_patterns` to locate the settings screen, shared field components, and existing validation patterns. It reads the relevant files to confirm how the form submits and surfaces errors.
2. **Plan around observable behavior.** The assistant uses `plan_ui_change` to identify the relevant guidance, then reads `interactions` for field labels and focus and `data-workflows` for pending and failed saves. A proposed plan could keep the draft on failure, guard repeated submissions, and show an error the user can reach with the keyboard.
3. **Review the proposed code.** The assistant writes the implementation and can use `create_or_update_component` to preview each file. Ask for a summary of the proposed changes before they’re applied.
4. **Check the result.** After applying the edit, the assistant can use the host’s tools to check a successful save, a failed save followed by a retry, and keyboard use. Ask it to report the checks it actually ran.

## How do I know it’s working?

Ask the assistant to plan a test for a settings form that keeps edits after a failed save. Ask it to use Watermelon Pixel’s `testing` and `data-workflows` topics and show the plan before editing.

A useful response identifies the actual form and a nearby test in your project, then proposes a check for error feedback, preserved input, and a successful retry. If you ask it to implement the test, it should show the proposed change and report which checks it ran. If it can’t load the topics, check the MCP connection and the package version configured in your host.

## Guidance topics

### Plan and structure the change

- `overview` explains how to use the references.
- `briefs` turns a request into a user goal, scope, constraints, and observable acceptance checks.
- `architecture` covers route placement, organizing by feature, and deciding when to move code into shared folders.
- `web-platform` covers semantic HTML, browser APIs, navigation, compatibility, and offline behavior.
- `typescript` covers state and prop modeling, runtime validation, and API contracts.
- `react-nextjs` covers React state and fetching, Next.js router conventions, server and client boundaries, and where to put loading and error states.

### Build the interface

- `foundations` covers semantic color, typography, spacing, responsive layouts, themes, and motion.
- `css-design-systems` covers the cascade, layout, shared tokens and variants, and managing style overrides.
- `accessibility` covers document structure, keyboard and screen reader behavior, and manual review.
- `components` covers page shells, buttons, forms, selectors, and feedback states.
- `interactions` covers semantic controls, keyboard behavior, names and labels, and where focus goes when a dialog opens or closes.
- `recipes` offers implementation patterns for settings, dashboards, searchable lists, onboarding, and other common screens.
- `tokens` provides example color, sizing, and motion values in JSON. Use the app’s established tokens where available.
- `internationalization` covers translated copy, locale-aware dates and amounts, long labels, and right-to-left layouts.

### Handle data and review behavior

- `data-workflows` covers search, pagination, stale responses, remote verification, safe saves, and background polling.
- `state-and-network` covers state ownership, API clients, caching, retries, and optimistic updates.
- `security` covers untrusted content, sessions, redirects, permissions, uploads, and server enforcement.
- `performance` covers Core Web Vitals, React render profiling, memoization, code splitting, and comparing measurements.
- `quality` covers accessibility, responsive behavior, theme checks, and review of async states.
- `testing` covers choosing unit, component, or browser tests and checking retries, keyboard focus, and stale results.

### Ship and maintain

- `seo-content` covers public pages, metadata, redirects, and search discoverability.
- `build-and-delivery` covers dependencies, environment configuration, CI, deployment, and rollback.
- `observability` covers production diagnostics, performance signals, analytics, and privacy.
- `commit-messages` covers concise subjects, useful bodies, and how to follow the repository’s commit conventions.
- `sources` records reference notes for maintainers.

The workflow and topic references are also available as read-only MCP resources in hosts that support resource browsing.

## MCP tool reference

- `get_component_guidance` loads the bundled frontend workflow skill.
- `get_design_knowledge` loads a guidance topic. The default is `overview`.
- `inspect_project` lists supported files and reads the root `package.json`.
- `inspect_ui_system` identifies likely frameworks, UI dependencies, reusable components, styles, token names, and quality scripts. Confirm these candidates in source before relying on them.
- `find_ui_patterns` searches UI source for a case-insensitive literal term and returns excerpts from up to 30 matching files.
- `read_ui_file` reads one supported file using a project-relative path.
- `plan_ui_change` gathers project context and provides prompts and a checklist for planning a UI change.
- `create_or_update_component` previews or applies the full proposed contents of one file. Preview is the default. To write, supply `dryRun: false`. For an existing file, `expectedContent` must match its full current contents.

### Preview and apply a file edit

For an existing file, the assistant reads it first and passes the exact full text as `expectedContent`, with the proposed replacement as `content`. For a new file, omit `expectedContent`. The default preview returns the operation, the current content (or `null` for a new file), and the proposed content. Applying uses the same inputs with `dryRun: false`.

If the existing file changes between reading and previewing or applying, the assistant must read it again and reconcile the proposed edit with the new contents. This workflow handles one file per call.

### File scope and limits

- **Read:** `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`, `.css`, `.scss`, `.json`, and `.md`. **Edit:** the same extensions except JSON and Markdown. The size limit is 200 KB per file.
- **Paths:** file tools take paths relative to `--root`, such as `src/features/settings/SettingsForm.tsx`. They reject absolute paths, parent traversal, hidden paths, and symlinks. Scans also skip dependency and build directories such as `node_modules`, `dist`, and `.next`.
- **Discovery:** project scans are bounded to 10 directory levels, 15,000 entries, and 3,000 eligible files. The UI inventory examines at most 600 source files and 300 stylesheets. Use a known path to read a file directly when it falls outside the scanned results.
- **Search:** use a literal query up to 120 characters. Search covers source and styles, and returns the first matching line and surrounding text per file.

## Command line

```sh
npx -y watermelon-pixel@latest --help
npx -y watermelon-pixel@latest --print-skill
npx -y watermelon-pixel@latest --root "/absolute/path/to/your/frontend-project"
```

`--print-skill` prints the bundled workflow to stdout. `--root` starts the stdio server used by the assistant.

## Troubleshooting

- **The assistant can’t connect.** Check that Node.js 22 or newer and `npx` are available to the process that launches the assistant. Run `npx -y watermelon-pixel@latest --help` to check that the package starts, then confirm the host’s stdio settings and reload it.
- **The assistant sees the wrong project.** Check the absolute directory passed to `--root`. In a monorepo, choose the app directory if its package manifest is the one you want the tools to inspect.
- **A component or token is missing from the inventory.** Use `find_ui_patterns` or read a known file directly. The inventory uses package names and source patterns as clues and can miss project-specific naming or files outside its scan limits.
- **A preview shows no change on disk.** Preview mode returns the proposed file contents. The assistant can apply those contents with `dryRun: false` when you want the edit written.
- **An update is rejected because the file changed.** Read the current contents, reconcile the edit with them, and preview again using the refreshed `expectedContent`.

## Development

```sh
nvm use 22
npm ci
npm run build
node dist/cli.js --help
```

## License

[MIT](LICENSE)
