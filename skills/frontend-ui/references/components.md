# Component patterns

## Page composition

`CommonPageStyles.jsx` exports PageContainer, PageTitle (h1), PageDescription (p), SectionHeader, SectionTitle (h2), CardContainer, LoadingContainer, Breadcrumb primitives, and EmptyState primitives. They merge supplied className with shared classes and forward props. Keep feature styles in colocated `.module.scss` files and shared classes in `pageShell.scss`.

These are ordinary React class wrappers now, even though older docs call them styled components. Reuse their spacing and hierarchy rather than redefining them in each feature. BreadcrumbLink currently renders a span; use a real link or button for navigation in new work and supply keyboard behavior when maintaining existing work.

## Buttons

`ThemedButton` wraps GenDS Button with `variant` (default primary), `size` (default m), optional `kind`, className, children, and forwarded props. Primary maps to GenDS kind primary; other variants map to secondary unless kind is supplied. App variants primary, secondary, and danger receive SCSS styling. The wrapper aligns brand colors across pages.

Pass `type="button"` for non-submit actions inside forms. Tie disabled/loading state to pending work; prevent duplicate submissions in the handler too. Use one clear primary action per form, secondary Cancel, and an explicit danger action for destructive operations. In another project use its existing Button with equivalent variants, not an unresolved Morpheus alias.

## Forms and modals

Observed GenDS Modal usage: `open`, `setOpen(nextOpen)`, `noTriggerBtn`, `closeAction`, `customWidth="min(520px, 95vw)"`, `headerTitle`, and `showFooter={false}` for a custom footer. SchedulerModal uses controlled values and validates numeric ranges and dates before emitting a normalized submit payload. DatasetCombobox prevents close during creation through the setOpen callback and disables footer controls.

Keep the form open on failure, retain entered data, show actionable field errors, and reserve error space to prevent layout shifts. Associate labels and error descriptions with controls. New dialogs should use the installed library's focus trap, Escape, backdrop, accessible title, and focus restoration behavior; the observed prop list does not prove those guarantees. Use one close policy for every close path while work is pending.

`useModalClass` attaches a temporary class to a library-owned DOM id with a bounded requestAnimationFrame retry and cleanup. It is a compatibility escape hatch. Prefer supported portal/content class props when available; DOM ids and selectors can change across library releases.

## Selectors

GenDS VirtualizedDropdown is used with options containing id, label, and value. The observed single-value adapter passes `value` as a one-element array and extracts `selectedOptions?.[0]?.value` in onChange. Check the installed library API before copying that contract.

DatasetCombobox adds inline entity creation, loading/disabled state, filtering, and callbacks (`createFn`, `buildCreatePayload`, `onCreated`, entity labels). TableCombobox supports multi-selection. InfiniteUsecaseCombobox combines debounced remote search and incremental pages. Keep selection separate from transient search text, close after selection, reset dependent selections when their parent changes, and distinguish no matches from no data.

The local selectors use clickable div/span elements and have incomplete keyboard/ARIA behavior. Preserve the product idea, but use an accessible library combobox or implement arrow keys, Enter, Escape, active option tracking, listbox roles, expanded state, and focus management before reusing the implementation.

## Loading, errors, and empty states

Use a skeleton that resembles the final row/card layout (GenDS Shimmer in Services/Assertions), rather than replacing a whole data region with plain loading text. Separate first load from background fetching. Services shows distinct error/empty branches; not every source page covers all states. Give errors a recovery action, and distinguish an empty product from an active filter producing no matches.

Shared empty state: bordered card, centered 48px icon tile, concise title, and a short description constrained to 360px. Add a relevant next action when the product supports one. Do not invent feature claims or promise actions without implementation.

## Code and status

CopyCodeBlock supports read-only preformatted text or a controlled textarea. It gives temporary Copy/Copied feedback and a polite live region. New implementations should handle clipboard failure truthfully and clear feedback timers on unmount; the observed fallback uses deprecated execCommand and reports copied even if fallback fails.

Monitoring status pills and NextRunBadge pair compact text with a semantic surface, optional dot, and numeric emphasis. Use monospace for technical identifiers, wrap long error text, and preserve access to truncated content. Never make status understandable only through color or motion.

Sources: `src/components/CommonPageStyles.jsx`, `ThemedButton.jsx`, `SchedulerModal/SchedulerModal.jsx`, `DatasetCombobox/DatasetCombobox.jsx`, `TableCombobox/TableCombobox.jsx`, `InfiniteUsecaseCombobox/InfiniteUsecaseCombobox.jsx`, `CopyCodeBlock.jsx`, `NextRunBadge.jsx`, `src/styles/common/themedButton.scss`, `src/hooks/useModalClass.js`, `src/pages/Services/Services.jsx`, `src/pages/Assertions/Assertions.jsx`.
