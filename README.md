# watermelon-pixel

**Frontend engineering guidance for coding assistants.**

[View the source on GitHub](https://github.com/fyndaman/watermelon-pixel)

Watermelon Pixel gives your coding assistant a frontend engineering playbook and tools for inspecting the app it’s working on. The playbook covers where code belongs, how interfaces should behave, and what to check before handing off a change. The assistant applies that guidance using the app’s existing framework, components, and conventions.

For example, ask it to **improve a settings form**. It can find the app’s existing fields and save flow, consult guidance on keyboard focus and failed saves, and propose an edit that keeps people’s input when saving fails. Your assistant writes the code and uses its own terminal or browser tools for builds, tests, and visual review.

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

## What the assistant gets

1. **Engineering guidance.** Load the bundled workflow with `get_component_guidance`, then retrieve the references relevant to the task with `get_design_knowledge`. A form change might use `interactions`, `data-workflows`, and `quality`.
2. **Project context.** Inspect the app’s files and package manifest, find candidate components and design tokens, and read nearby code to confirm the existing patterns.
3. **A planning checklist.** `plan_ui_change` returns the request, project context, recommended topics, and prompts about goals, constraints, and acceptance checks. The assistant uses this information to make an implementation plan.
4. **A file preview.** The assistant can submit its proposed code for one file and see the current and proposed contents before writing. It can then use the host’s tools to check the change.

## Guidance topics

- **Start a change** · `overview` explains how to use the references. `briefs` turns an idea into a goal and acceptance checks. `architecture` covers file placement, routes, feature ownership, and shared modules.
- **Build the interface** · `foundations` covers color, typography, spacing, responsive layouts, and motion. `components` and `interactions` cover structure, labels, keyboard behavior, and focus. `recipes` offers patterns for common screens and forms. `tokens` provides example design values to adapt to your app.
- **Handle data and failures** · `data-workflows` covers search, pagination, stale responses, safe saves, and background job polling.
- **Review the result** · `security` covers untrusted content, sessions, permissions, and uploads. `performance` covers Core Web Vitals, React render profiling, and choosing fixes based on measurements. `quality` covers accessibility, responsive behavior, and theme checks.
- **Write the commit** · `commit-messages` covers clear subjects and useful bodies that follow the repository’s conventions.
- **Maintain the guidance** · `sources` records reference notes for maintainers.

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

### File scope and limits

Reads support `.ts`, `.tsx`, `.js`, `.jsx`, `.vue`, `.svelte`, `.css`, `.scss`, `.json`, and `.md`. Edits support the same extensions except JSON and Markdown. Files are limited to 200 KB. Pattern search covers source and styles. Project scans skip hidden paths, symlinks, and common dependency and build directories, and report when the scan is truncated. File tools operate under the configured project root.

## Command line

```sh
npx -y watermelon-pixel@latest --help
npx -y watermelon-pixel@latest --print-skill
npx -y watermelon-pixel@latest --root "/absolute/path/to/your/frontend-project"
```

`--print-skill` prints the bundled workflow to stdout. `--root` starts the stdio server used by the assistant.

## Development

```sh
nvm use 22
npm ci
npm run build
node dist/cli.js --help
```

## License

[MIT](LICENSE)
