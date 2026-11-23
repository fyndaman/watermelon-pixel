# Implementation recipes

These recipes translate the inspected patterns into a new change. Source aliases and GenDS APIs only apply when present in the target project. They are guidance, not an installed component library.

## Common screen recipes

Use these as starting structures, not fixed templates. First inspect the target project's components, tokens, routes, and data conventions. Keep only the sections and interactions the user's task needs.

### Settings page

Use when someone needs to review or change a small set of preferences or account details.

1. Start with a clear page title and one sentence describing what the settings affect.
2. Group related fields under short section headings. Put destructive or security-sensitive actions in a separate, clearly labeled area.
3. Use explicit labels, examples for unfamiliar values, and inline validation tied to the relevant field.
4. Keep one primary save action. Show pending feedback, confirm success, and preserve entered values with an actionable error if saving fails.
5. On narrow screens, stack fields and keep the save action easy to reach without covering content.

Example request: “Create a mobile-friendly settings page for a store owner to update store details. Group related fields, explain errors beside the field, and show clear saving and saved feedback. Reuse the project's existing UI.”

### Profile or detail page

Use when someone needs a quick overview of one person, item, account, or record and its available actions.

1. Put the identity and most important status near the top, with a readable text label even when a badge or avatar is present.
2. Show the most-used action clearly; keep secondary and destructive actions visually separate.
3. Group details by meaning instead of making every value a separate card.
4. Provide a fallback for missing images or optional fields. Do not render empty labels or invented data.
5. Define how the page behaves when the record is loading, unavailable, or not found.

### Dashboard overview

Use when someone needs to understand current status and decide where to act next.

1. Lead with the question the dashboard answers, not a row of unrelated metrics.
2. Prioritize a small number of useful summaries. Label units, time ranges, and comparison periods so values have context.
3. Put trends or warnings next to the information they explain. Pair color with text or icons that have accessible names.
4. Keep filters and their active values visible. Make reset behavior clear.
5. Separate initial loading from background refresh, no data, no matching results, and request failure.

### Searchable list or table

Use when someone needs to find, compare, or act on many records.

1. Keep the search or filters close to the results and show active filters in a removable, understandable form.
2. Choose columns around the user's decision. Use stable widths for technical identifiers and let long values wrap, truncate with a way to inspect, or scroll within the table.
3. Keep row actions predictable and keyboard reachable. Make status readable without relying on color alone.
4. Explain an empty dataset differently from a search with no matches. Preserve useful results during background refresh where possible.
5. Reset pagination when filters or search change. Show the current range and total when available.

### First-run or onboarding screen

Use when someone has arrived before creating content or configuring a feature.

1. Explain the immediate benefit in plain language and show one next step.
2. Ask only for information needed to take that step; defer optional setup.
3. Use a helpful example or starter action only if it is clearly labeled as a sample.
4. Offer a way to skip and return later when the task permits it.
5. After completion, confirm what changed and lead to the next useful action.

## Choose the smallest useful pattern

- A card is useful when it groups related content or provides a clear action; avoid wrapping every block in a separate card.
- A modal is best for a short focused task that should preserve the current context. Use a page for long forms, complex decisions, or shareable work.
- A selector is appropriate when users choose among known options. Use search when the option set is large, but preserve keyboard selection and clear loading/no-match/error states.
- A table helps compare repeated fields. A list or compact cards may work better when each item needs a different action or reads like a small narrative.
- A dashboard should answer a specific operational question; if there is no such question, a simpler overview page is usually easier to use.

## Add a list or settings page

1. Identify the existing shell, typography, Button, Input, skeleton, and notification components. In Morpheus use CommonPageStyles and ThemedButton.
2. Compose title and description, a section header with the primary action, a compact filter area if needed, then the result region and pagination.
3. Use shared surface/text/border roles. Scope feature SCSS locally and preserve the page-shell responsive padding.
4. Define explicit initial loading, populated, no data, no matching results, and failure branches. Preserve the last successful data during background refresh when appropriate.
5. Keep filter/page state coherent, include all request inputs in query keys, and register route/navigation/header labels only when the feature needs them.
6. Verify semantics, narrow layouts, both themes, and useful user interactions using the target's checks.

## Add a modal form

Use the existing Modal and controlled inputs. Keep validation alongside the fields, with stable reserved error space. Normalize values when building the request. Cancel and close should follow the same pending-work policy. Disable submission when invalid or pending, retain values on failure, invalidate affected queries on success, and restore focus to the opener. Adapt the SchedulerModal composition; its domain-specific repeat intervals and date restrictions are product rules, not general UI rules.

## Add a lookup selector

Prefer the target's accessible combobox. Separate selection from search input. Debounce remote lookups, key requests by search and parent selection, reset pagination when either changes, show empty/error/loading states, and support keyboard navigation. Add inline creation only if it serves the workflow; update options and select the created entity after confirmed success. Reuse the interface flexibility of DatasetCombobox without copying its incomplete keyboard implementation.

## Build a dense investigation view

Keep filters adjacent to results, use a scroll container around the table, provide explicit status labels, and put long diagnostics in a detail panel. Preserve filters and selected item in the URL when users need shareable investigations. Avoid replacing a whole table on every refetch. Plan stable column widths and long-content behavior before adding animation.

## Portable React surface example

This example uses native React and CSS with Morpheus role names and proportions. It needs no GenDS package or source aliases. Reuse the target's Button/Card equivalents when present.

```jsx
import { useId } from "react";

export function ResultPanel({ title, description, children, onRefresh, refreshing }) {
  const titleId = useId();
  return (
    <section className="result-panel" aria-labelledby={titleId} aria-busy={refreshing}>
      <header className="result-panel__header">
        <div>
          <h2 id={titleId}>{title}</h2>
          <p>{description}</p>
        </div>
        <button type="button" onClick={onRefresh} disabled={refreshing}>
          {refreshing ? "Refreshing…" : "Refresh"}
        </button>
      </header>
      {children}
    </section>
  );
}
```

The example uses React useId to keep title associations unique across instances. Prefer the existing component library's Button focus and disabled states. For native buttons, define focus-visible and disabled styling explicitly:

```css
.result-panel {
  border: 1px solid var(--color-border, #d6d6d6);
  border-radius: 12px;
  background: var(--color-bg-card, #fff);
  color: var(--color-text-strong, rgba(0, 0, 0, .65));
}
.result-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px;
}
.result-panel h2 { margin: 0; font-size: 18px; line-height: 24px; }
.result-panel p {
  margin: 4px 0 0;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-muted, #666);
}
.result-panel button {
  flex-shrink: 0;
  padding: 8px 16px;
  border: 1px solid var(--color-border, #d6d6d6);
  border-radius: 8px;
  background: var(--color-bg-card, #fff);
  color: inherit;
  font: inherit;
  cursor: pointer;
}
.result-panel button:hover:not(:disabled) { background: var(--color-bg-soft, #f9f9f9); }
.result-panel button:focus-visible {
  outline: 2px solid var(--color-primary, #2e31be);
  outline-offset: 3px;
}
.result-panel button:disabled { opacity: .6; cursor: default; }
@media (max-width: 640px) {
  .result-panel__header { flex-wrap: wrap; padding: 16px; }
}
```

The example supplies light fallbacks only; load both theme maps from `tokens.json` if implementing Morpheus themes. Do not treat the fallback palette as a complete accessible color system. Announce the completed refresh through the target's existing status region.
