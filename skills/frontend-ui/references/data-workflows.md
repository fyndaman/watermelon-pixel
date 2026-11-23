# Data and interaction workflows

## Server state

Morpheus uses TanStack React Query for server data and local React state for form input and transient UI. Services scopes a list query key to page, page size, and debounced search; Monitoring additionally keys by filters and date range. Include every request parameter that changes results in the key. Keep private API clients and response adapters outside reusable visual primitives.

Dependent queries use `enabled` (for example, only fetch tables after a dataset is selected or details after a run id exists). Normalize response shapes at a boundary rather than scattering fallback chains through every cell. Display normalized error text via a shared formatter and use a toast for action outcomes; inline errors should carry recovery details relevant to the current screen.

Writes use a mutation and invalidate relevant list/detail keys after success. Services closes the create modal and notifies only after success. Retain values on error, disable duplicate actions while pending, and consider a synchronous guard if a submit can be triggered through multiple events.

Source examples use `keepPreviousData: true`; check the target's installed React Query version before adopting options. Preserve stable content during pagination with the equivalent API supported by that version.

## Forms with remote verification

Use this pattern when the server must verify settings before a save, such as checking a connection or validating an import configuration.

1. Keep input, local validation, remote verification, and the final save as separate concerns. Normalize the exact values submitted to each endpoint at that endpoint's boundary.
2. Associate a verification result with the normalized inputs it checked. When an input changes, clear only the results that depend on it. Keep successful results for independent sections so users can retry just the failed section.
3. Cancel obsolete requests where supported and guard both success and failure handlers with a request generation or equivalent identity. Comparing input values alone misses the case where someone edits a value and then changes it back while the original request is still pending.
4. Require current verification at submission time. Guard duplicate saves in the handler as well as disabling the control. Keep entered values after recoverable errors.
5. If the server acknowledges a write but omits the identifier needed to confirm it, treat the result as uncertain. Offer a way to reconcile it through a supported lookup or refresh before allowing another create.

## Refreshing background work

Use the last known server status to decide whether polling is necessary. Poll while a job is queued or running and stop when it reaches a known terminal state. Treat a fetch failure as a separate condition from a job failure. Keep previously loaded details visible during refresh when possible, and use the server's canonical state to decide which actions are available.

## Search and pagination

`useDebouncedValue` updates after a supplied delay and clears its timer on dependency change/unmount. Keep the text field immediate and debounce the request input. Reset pagination when search, page size, or filters change. Services obtains totals from server responses; do not infer full-dataset totals from the currently loaded page.

Monitoring stores page, page size, filters, and selected run in URL search parameters so views can be linked and restored. Keep unrelated URL parameters when updating a filter. Validate URL input and clamp impossible page values in new implementations. Define date boundaries and timezone explicitly; a displayed local timestamp must not silently change the queried reporting window.

Monitoring uses a GenDS Pagination footer with total pages/items, page size, callbacks, loading and empty flags, and 10/20/50/100 page-size choices. Adapt these numbers to the target workload rather than assuming them globally.

## Large lookup lists

`useInfiniteUsecases` keys pages by search term, requests 20 items at a time, derives a next page from server total_records, and uses a five-minute stale window with no refetch on focus. These are observed use-case defaults, not requirements for every selector.

InfiniteUsecaseCombobox flattens pages, debounces search, and uses an IntersectionObserver sentinel. Fetch only when another page exists and one is not already being fetched. In a new implementation, disconnect observers on unmount, use the dropdown scroll root where appropriate, expose errors/retry, deduplicate stable ids, and ensure an existing selection remains visible during new searches.

## Dense monitoring surfaces

Compose filters, a result count or compact summary, the table, pagination, then drill-down details. Source table wrappers use horizontal scrolling and explicit minimum widths (1200px and 1480px on different variants), compact 13/18 body text, 11px uppercase headers, status pills, and monospace identifiers. Preserve the density and column relationships when extending that view; do not hardcode those widths into unrelated tables.

Display essential failures inline and full error detail on demand. Use semantic table headers and explicit detail buttons/links; do not rely solely on a clickable row. Numeric metrics use tabular numerals; units and unavailable values should remain unambiguous. Make overlays scroll internally and ensure controls remain reachable on a narrow viewport.

Sources: `src/pages/Services/Services.jsx`, `src/pages/Monitoring/Monitoring.jsx`, `src/pages/Monitoring/MonitoringByUsecase.jsx`, `src/pages/Monitoring/monitoring.module.scss`, `src/hooks/useDebouncedValue.js`, `src/hooks/useInfiniteUsecases.js`, `src/components/InfiniteUsecaseCombobox/InfiniteUsecaseCombobox.jsx`, `.ai/WORKFLOWS.md`.
