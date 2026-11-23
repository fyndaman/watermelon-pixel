# Quality and improvements

This section distinguishes useful patterns from defects or compatibility compromises in the source. The repository was inspected statically; no claim of rendered accessibility, performance, or mobile compliance is made.

## Design review

- Match the surface to the visitor's goal: deciding and acting, completing a task, understanding information, or exploring a showcase.
- Give content a clear reading order. Establish the page title, context, grouped sections, and primary action before polishing color or decoration.
- Preserve the existing design system for focused changes. When a redesign is requested, keep product facts, content, and key interactions accurate while making the visual direction coherent.
- Make controls and feedback predictable. Labels, validation, pending states, success, and recoverable errors should explain what happened and what the person can do next.
- Make the layout feel intentional at both wide and narrow widths. Avoid simply shrinking a desktop screen, repeating the same card pattern for every section, or using motion as decoration.
- Do not make up product capabilities, statistics, customer stories, or testimonials to make a screen feel complete. Ask for missing factual content or clearly mark illustrative examples.
- Review the rendered page on the most relevant desktop and mobile sizes together when a browser is available. Fix meaningful findings in one batch and confirm once; do not continue polishing indefinitely.

## Keep

- Shared page hierarchy and semantic color roles rather than independent styling per screen.
- Compact operational lists with explicit status text and technical identifiers in monospace.
- Layout-shaped skeletons, clear empty states, and query invalidation after writes.
- Colocated feature SCSS with runtime custom-property tokens.
- Reduced-motion handling for page, empty-state, and monitoring animation.
- Copy feedback with a polite status region and short contextual transitions.

## Improve when adapting

- Replace clickable spans/divs for navigation and selector items with semantic controls or a complete accessible widget. Test keyboard navigation and focus restoration.
- Check all result branches. An empty array after an API error must not be presented as a successful empty result.
- Scope library fixes to an adapter surface; broad `[role="option"] *`, generated-class, or `.bg-white` overrides can affect unrelated components and break on upgrades.
- Preserve visible focus rings. Morpheus contains outline-removal rules in specific filters; don't copy those without another visible focus treatment.
- Make clipboard success truthful, handle rejection, and clean up feedback timers. Do not rely on deprecated copying fallbacks for new code.
- Check pending mutations at handler level as well as through disabled buttons, including Enter-key submission and every close path.
- Do not assume desktop sidebar collapse makes a screen mobile-ready. Check 360–390px layouts, scrolling, portals, modal height, and reachable actions.
- Verify actual fonts; configured typography and loaded legacy font families differ. Retain source px/rem conventions carefully because the shared layer declares a 10px base font variable.
- Reconcile radius scales at the surface being extended: GenDS component presets differ from shared Sass aliases and app shell cards.
- Apply the initial theme before paint when needed. Check token specificity and portal styling after library updates.
- Add `min-width: 0`, wrapping, or access to full values where long identifiers and errors can overflow. Do not silently clip essential diagnostics.

## Check a completed UI change

Use the target's existing test/lint/build scripts. Cover changed behaviors with its testing framework where warranted: controlled fields, validation, failed requests, successful mutation, pagination reset, keyboard use, and disabled/pending actions. Morpheus's own conventions request Jest and React Testing Library coverage for UI changes; that is a repository convention, not a requirement to install Jest into every consumer.

Inspect desktop and narrow viewport in light and dark themes. Check loading, data, empty, error, selected, hover, focus-visible, disabled, long content, and reduced-motion states relevant to the change. Verify text/background contrast rather than assuming semantic tokens pass. State which checks ran and which need the host's browser or project runtime.

## Review async forms and background jobs

- Use controllable responses to simulate requests finishing out of order. Cover both stale successes and stale errors, including editing a field and then changing it back.
- Verify that changing an independent field preserves unrelated verification results. Check that failed validation or verification prevents the write, and that a retry keeps the user's input.
- Trigger submit twice before the UI rerenders. Check that only one write reaches the API. Cover an acknowledged write with missing confirmation data as well as an ordinary request failure.
- In long dialogs, check that a save error is both announced and visible at the current scroll position. An inline alert can be scrolled into view without automatically stealing focus. Field errors should remain associated with their controls.
- Exercise a job moving from queued to running to finished. Check that polling stops and that a temporary fetch error is presented separately from the job's own status.

## Adoption boundaries

GenDS-first and SCSS-outside-react-commons are Morpheus conventions. In another project, preserve its library, styling architecture, and brand unless the request calls for migration. Do not import private service endpoints, business records, access rules, fonts, logos, or infrastructure into this npm package. This pack includes extracted design facts and newly written guidance only.
