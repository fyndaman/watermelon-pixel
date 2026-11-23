# Component composition and interaction contracts

Before implementation, describe the component tree in a few lines. This makes hierarchy and valid nesting clear to both the requester and the coding assistant.

```text
Page
├── Header: title, context, primary action
├── Controls: search and relevant filters
├── Results: summary, table/list, pagination
└── Feedback: loading, empty, error, or success content
```

For a form, group related fields under a heading or fieldset; pair every control with a visible label and relevant help or error text; place the primary submit action where keyboard and visual order make sense. For a dialog, define its trigger, accessible name, description, contents, actions, close rules, and where focus returns.

## Prefer native behavior

Use a native `button`, `a`, `input`, `select`, `label`, `fieldset`, or table element when it provides the required interaction. For complex widgets such as comboboxes, menus, tabs, dialogs, and tree views, reuse an installed accessible implementation. A custom `div` with an ARIA role does not inherit native keyboard behavior.

If a custom widget is necessary, specify its interaction contract before writing it:

- Accessible role, name, description, selected/expanded state, and relationships.
- How Tab enters and leaves; whether arrow keys move within the widget; what Enter, Space, Escape, Home, and End do.
- Where focus moves when a dialog, menu, popover, or dynamic result opens and closes.
- How focus is restored to the trigger and remains visible.
- How selection works with pointer, keyboard, touch, and assistive technology.
- How disabled, pending, validation, error, empty, and success states are announced and displayed.

Do not assign `menu` semantics to ordinary site navigation. Choose a pattern that matches the user's expectation and keep keyboard behavior consistent with that pattern.

## Stateful controls

Treat state as part of the component contract, not a decorative afterthought:

| State | User should be able to tell |
| --- | --- |
| Idle | What the control does and whether it is available |
| Hover/focus | Which element is interactive and currently focused |
| Selected/expanded | What value or section is active |
| Pending | Which action is processing and whether repeated submission is prevented |
| Validation error | Which field needs attention and how to correct it |
| Request error | What failed, whether entered data remains, and what recovery is available |
| Empty/no match | Whether there is no data yet or the current search found no results |
| Success | What changed after the action completed |

Use text and structure alongside color to communicate status. Keep focus visible, avoid unexpected focus loss after updates, and respect reduced-motion preferences.
