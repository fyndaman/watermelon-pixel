# Accessibility engineering

- Start with native elements, a logical heading and landmark structure, and meaningful labels. Give informative images useful alternatives and mark decorative imagery accordingly.
- Walk the complete interaction with the keyboard. Check visible focus, reading order, access to every action, and focus entering and returning from overlays. If using a custom widget, follow its interaction pattern and test each supported key.
- Check errors and status messages with assistive technology. Associate field errors with their controls. Announce dynamic feedback where needed without interrupting typing or repeating the same message.
- Check contrast, text resizing, zoom and reflow, target sizes, reduced motion, and supported high-contrast modes. Use the project's applicable accessibility target.
- Run existing automated checks for detectable issues, then manually test the changed flow with keyboard and a representative screen reader where available. Report the specific behavior checked and avoid inferring app-wide compliance from sampled checks.

[W3C accessibility principles](https://www.w3.org/WAI/fundamentals/accessibility-principles/) · [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
