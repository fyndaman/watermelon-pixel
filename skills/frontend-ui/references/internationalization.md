# Internationalization

Find the project's message catalogs, locale routing, and formatting helpers. Use the configured locale and supported languages for visible and accessible UI text, including labels, placeholders, validation, status messages, and announcements.

## Make text and data adaptable

- Translate complete messages with named placeholders and plural rules through the existing message formatter. Give translators context for short or ambiguous strings.
- Format dates, times, numbers, and currencies with the project's helpers or the appropriate `Intl` formatter. Choose a timezone from the feature's requirements and use the actual currency code from the data. Keep stored values and API payloads in their expected formats.
- Set the document's `lang` and `dir` for the current locale. Use logical CSS properties such as `margin-inline-start` when layout follows reading direction. Mirror directional icons where their meaning follows reading order. Use isolation such as `bdi` for unknown-direction inline content when it would otherwise disturb surrounding text. [W3C HTML direction guidance](https://www.w3.org/International/questions/qa-html-dir)

## Review a secondary locale

- Try longer labels and error messages at a narrow width. Check wrapping, control alignment, and whether important content remains visible.
- Check plural forms and copy with placeholders, along with dates, currency, and numeric input if the feature uses them.
- For supported right-to-left locales, review navigation, reading order, alignment, and mixed-direction strings such as names and IDs. Check that the language and direction persist through navigation.

For an orders screen, translate the result count as a pluralized message, format the amount using the order's currency, and confirm that a long status label still fits on a narrow screen.
