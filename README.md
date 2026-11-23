# watermelon-pixel

**Frontend engineering knowledge for coding assistants.**

`watermelon-pixel` packages practical frontend engineering knowledge as an MCP server and a bundled skill. A coding assistant consults this guidance while building an application to make decisions about code structure, accessible interactions, responsive styling, forms, data fetching, and UI states.

The assistant applies the guidance using the app's framework and conventions, then writes the implementation in the app's own codebase. Project inspection, source search, and file previews help it put the guidance into practice.

## How the assistant uses the knowledge

1. **Before coding**, load `get_component_guidance` and read the relevant topics with `get_design_knowledge`. For example, consult `interactions` for keyboard behavior and focus, or `data-workflows` for a paginated list.
2. **While implementing**, inspect nearby code and use the project's existing conventions. For example, preserve form input after a failed save and prevent duplicate submissions while the request is pending.
3. **Before handing back the change**, use the `quality` topic to decide what to review with the host's available tools. Report which behaviors were checked.

Try asking your assistant: “Use Watermelon Pixel’s guidance to improve our settings form. Keep what I typed if saving fails, and make the errors easy to find with the keyboard.”

## What it does

- **Shares frontend engineering guidance:** covers component structure, accessibility, responsive layouts, forms, data workflows, and implementation review.
- **Understands a frontend project:** lists supported UI files and reads its root `package.json`.
- **Maps the existing UI system:** identifies likely exported components, framework and UI-library dependencies, stylesheets, theme files, CSS/Sass token candidates, and installed UI quality tools.
- **Finds existing patterns:** searches source files for a literal term and returns nearby lines from matching files.
- **Reads relevant files:** provides source, configuration, and documentation contents to the assistant.
- **Plans changes with project context:** turns a request into an audience, outcome, content, action, constraints, and acceptance brief, then supplies a project-aware implementation checklist.
- **Previews file changes safely:** shows the full proposed content before writing anything; applying a change requires an explicit `dryRun: false` request.
- **Protects existing file edits:** requires the exact current file contents before updating an existing file, helping avoid overwriting changes made since it was read.
- **Supports several frontend formats:** recognizes React/JavaScript/TypeScript, Vue, Svelte, CSS, and SCSS files, with a narrower set of file types allowed for edits.

## Features in detail

### 1. Project inspection

The assistant can ask `inspect_project` to get a project-relative list of supported files and the root package manifest. The file scan understands `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`, `.css`, `.scss`, `.json`, and `.md` files.

To keep inspection bounded, the server skips hidden paths, symlinks, and common generated or dependency directories such as `node_modules`, `.git`, `dist`, `build`, `.next`, and `coverage`. It scans at most 10 directory levels, 15,000 directory entries, and 3,000 supported files. The result indicates when the scan was truncated.

### 2. UI system inventory

`inspect_ui_system` builds a static overview of the project that can help the assistant reuse what is already there. It reports:

- Framework candidates found in dependencies, such as React, Next.js, Vue, Nuxt, Svelte, SvelteKit, and Astro.
- Likely UI-library dependencies, including common styling, component, and icon packages.
- Candidate components found from exported PascalCase functions, classes, and variables, plus PascalCase Vue and Svelte filenames.
- Stylesheet paths and likely theme or token stylesheet paths.
- Candidate CSS custom properties (`--name`) and Sass variables (`$name`).
- File counts by extension and the number of source and stylesheet files scanned.
- Likely quality tooling from dependencies, grouped into component exploration/testing, browser testing, accessibility, and visual testing.
- Existing package scripts whose names suggest build, test, lint, typecheck, Storybook, end-to-end, visual, or accessibility checks.

This is a heuristic map of source code. It does not render the application or prove that a candidate is an active component or design token. The assistant should open and confirm relevant files before relying on inventory results. The scan is bounded to the first 600 source files and 300 stylesheets; output lists are capped.

### 3. UI pattern search

`find_ui_patterns` searches source files for a literal, case-insensitive query. It returns at most 30 matching files, with the first matching line number and a short excerpt around that line. JSON and Markdown files are excluded from this search. Queries can be up to 120 characters.

Use this to find examples of an existing button, form field, modal, layout, spacing token, or interaction before adding another pattern.

### 4. Read project files

`read_ui_file` returns the content of a supported project-relative source, configuration, or documentation file. Paths cannot escape the configured project root, traverse parent directories, or enter excluded/hidden paths. Individual reads are limited to 200 KB.

### 5. Plan a UI change

`plan_ui_change` accepts a plain-language UI request and returns:

- The request itself.
- A bounded project inspection and UI inventory.
- Suggested reference topics for the request.
- A structured brief covering the audience, outcome, content, actions, visual direction, constraints, and acceptance checks.
- A sequence for confirming project patterns, outlining component composition and interaction behavior, reusing the current design system, previewing code, and reviewing the result.

This is structured context and a checklist, not an AI-generated implementation. The host assistant interprets the request and produces any code.

### 6. Frontend engineering skill and references

`get_component_guidance` provides the bundled frontend workflow skill. It helps the assistant turn a brief into an interface plan, establish hierarchy and states, reuse the project's conventions, and review the implementation.

`get_design_knowledge` provides these focused reference topics:

| Topic | Covers |
| --- | --- |
| `overview` | How to use the engineering references |
| `briefs` | Turning a plain-language idea into goals, scope, constraints, and acceptance checks |
| `architecture` | Folder structure, route placement, feature ownership, and when to share code |
| `foundations` | Semantic color, themes, typography, spacing, layout, shape, and motion |
| `components` | Page shells, buttons, modal forms, selectors, states, technical text, and badges |
| `interactions` | Component composition, semantics, keyboard behavior, focus, and interaction states |
| `data-workflows` | Query state, remote form verification, safe saves, background polling, search, and pagination |
| `recipes` | Reusable page, form, selector, and investigation recipes, including a portable React example |
| `quality` | Accessibility, responsive and theme review, source-quality checks, and adoption boundaries |
| `security` | Safe rendering, sessions and permissions, sensitive data, uploads, and browser trust boundaries |
| `sources` | Reference organization, conflicts, and maintenance notes |
| `tokens` | Machine-readable color, layout, typography, spacing, and motion values |

The same skill and knowledge topics are also exposed as read-only MCP resources for hosts that support resource browsing.

### 7. Create or update a component file

`create_or_update_component` accepts a project-relative file path and complete file content supplied by the host assistant.

- **Preview by default:** `dryRun` defaults to `true`; the response includes the proposed complete content and any current content without writing it.
- **Explicit apply:** the assistant must send `dryRun: false` to write the change.
- **Safe existing-file updates:** an existing file can only be updated when `expectedContent` exactly matches the complete current file. If it has changed since the assistant read it, the update is rejected and the assistant should read it again.
- **New files:** a new file is created only if it does not already exist.
- **Supported edits:** `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`, `.css`, and `.scss` files up to 200 KB.
- **Path and size checks:** edits stay inside the configured project, reject symlinks and excluded paths, and enforce the per-file size limit.

The tool writes one file per call. It does not automatically run a formatter, build, tests, accessibility audit, or visual browser review. Use the host assistant's available project tools for those follow-up steps.

## How a non-developer can use it

You do not need to know component names or framework terminology to describe what you want. Give the assistant the goal, the people who will use the screen, and any important information or actions it must include.

For example:

> Create a simple order tracking page for a small shop owner. Show the order number, customer, status, expected delivery, and a clear way to filter delayed orders. Keep the existing style and make it usable on a phone.

Or:

> Make the signup form easier to understand. Explain why each field is needed, show validation beside the field, and keep the primary action obvious.

A useful request usually says:

1. **Who it is for:** the user or role.
2. **What they need to accomplish:** the main task or decision.
3. **What information belongs on the screen:** fields, columns, status, or content.
4. **What actions are needed:** search, filter, submit, edit, cancel, or navigate.
5. **Any constraints:** mobile use, existing style, accessibility, or project conventions.

The assistant can then inspect the project, find similar UI, plan the change, present a preview, and apply an approved file edit. Exact steps depend on the MCP host.

## Installation

Requirements: **Node.js 22 or newer** and an MCP-compatible assistant host that supports stdio servers.

Add the following server configuration to your host's MCP settings. Replace the project path with the absolute path to the frontend project you want the assistant to work on.

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

Restart or reload the host after saving its configuration. The server instance is scoped to the one project directory given by `--root`. Use a separate MCP server entry if you want to connect another project.

## Command line

```sh
npx -y watermelon-pixel@latest --help
```

Start the server directly with a project path:

```sh
npx -y watermelon-pixel@latest --root "/absolute/path/to/your/frontend-project"
```

Print the bundled skill text:

```sh
npx -y watermelon-pixel@latest --print-skill
```

The server communicates over **stdio**. Its logs are written to stderr so they do not interfere with the MCP connection.

## Available MCP tools

| Tool | Purpose | Writes files? |
| --- | --- | --- |
| `inspect_project` | List bounded project files and read the root package manifest | No |
| `inspect_ui_system` | Map likely frameworks, UI dependencies, components, styles, token candidates, and quality tooling | No |
| `find_ui_patterns` | Search UI source and return matching excerpts | No |
| `read_ui_file` | Read a supported project file | No |
| `plan_ui_change` | Gather context and return a structured brief and UI implementation checklist | No |
| `get_design_knowledge` | Retrieve one bundled guidance topic | No |
| `get_component_guidance` | Retrieve the bundled workflow skill | No |
| `create_or_update_component` | Preview or apply one complete UI file | Yes, only when `dryRun` is `false` |

## Good practices

- Describe the user's task and the information they need before prescribing a visual style.
- Ask the assistant to inspect and reuse existing components, tokens, and interaction patterns before introducing new ones.
- Keep changes focused and consistent with the project's framework, dependencies, and conventions.
- Include meaningful loading, empty, error, success, disabled, and validation states when they apply.
- Ask for responsive behavior and accessible labels, keyboard use, focus visibility, and sufficient contrast.
- Review a preview before applying a file edit, and ask the assistant to explain which file it plans to change.
- After applying, use the host's build, tests, formatter, and browser tools as appropriate. The MCP server itself does not run them.
- Treat the inventory as a set of clues, then verify actual components and token definitions in source.

## Security and scope

- The server is configured with one project root and only accepts project-relative paths within that root.
- Hidden paths, symlinks, parent-directory traversal, and common generated/dependency directories are excluded.
- Reads support source, configuration, and documentation formats listed above, with a 200 KB per-file limit.
- Writes support only UI source and style formats, with a 200 KB per-file limit.
- Existing files require a matching full-file `expectedContent` before an update is applied.
- The server does not transmit files to a separate service. Files are made available through the local MCP connection to the assistant host you configured.

## Development

```sh
nvm use 22
npm ci
npm run build
node dist/cli.js --help
```

## License

MIT. See [LICENSE](LICENSE).
