# Plain-language UI briefs

A useful request is a compact product brief, not a list of framework terms. Translate what the person said into these decisions before implementation:

1. **Audience and context:** who uses the screen and when they encounter it.
2. **Outcome:** what they need to understand, decide, or complete.
3. **Content and data:** the facts, fields, records, and relationships the screen must show.
4. **Actions:** one primary action, supporting actions, navigation, and any destructive actions.
5. **Visual direction:** the existing visual system to preserve or the explicit direction requested for a redesign.
6. **Constraints:** screen sizes, accessibility needs, framework, installed dependencies, and product rules.
7. **Acceptance checks:** visible behaviors that would let the requester say the result is correct.

Do not make the user answer every item if their request and project provide enough information. Ask one short question only when a missing answer would materially change product behavior, content, or visual direction. Otherwise state the assumption in plain language and proceed.

## Keep the task in scope

For a focused edit, keep the existing product behavior, copy, visual identity, and unrelated components. For a redesign, retain factual content and core actions while forming a coherent new visual direction. Do not invent metrics, customer quotes, backend behavior, or product capabilities. Mark sample data as illustrative.

Break a broad request into a short sequence: establish the shell and hierarchy, build the central content, connect controls to existing behavior, then handle the key states and responsive layout. Keep the user informed about what will change and which files are involved.

## Pick the page's job

- **Decide or act:** establish the value proposition or decision context, then one clear next step.
- **Operate:** prioritize scanability, status, control proximity, and predictable workflows.
- **Understand:** use a clear reading order, descriptive headings, examples, and legible content width.
- **Explore:** let the artifact or content lead, with navigation and context kept easy to find.

A screen may combine these jobs; choose the one that matters most for the requested surface. The job should shape content order and density before decorative styling.
