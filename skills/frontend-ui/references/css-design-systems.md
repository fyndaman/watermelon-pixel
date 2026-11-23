# CSS and design systems

- Inspect the project's cascade, theme entry points, and shared UI before adding styles. Keep global resets and base rules at their existing entry point. Scope feature-specific styles and use shared tokens for repeated decisions.
- Prefer semantic tokens such as surface, foreground, and danger over raw color names in components. Express repeated variations through the design system's APIs. Review base, hover, focus, disabled, loading, and invalid states.
- Use CSS layout to fit the content. Choose grid for two-dimensional arrangements and flex for one-axis alignment. Start with normal flow and intrinsic sizing, then add breakpoints or container queries where the layout actually needs to change.
- Choose overrides through the component's supported API or the project's agreed cascade. Check inheritance, specificity, and stacking contexts before adding stronger selectors or increasing z-index. Use portals under the existing overlay policy.
- Review at narrow and wide widths with long content, keyboard focus, light and dark themes where supported, reduced motion, and forced colors where applicable. Document shared tokens or variants only when they represent a stable pattern.
