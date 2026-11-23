# Frontend testing

Turn the requested behavior into observable checks. Find the nearest existing test, runner configuration, and package scripts before choosing tools. Reuse the project's fixtures, helpers, and conventions.

## Choose the smallest test that exercises the behavior

- **Unit:** Test pure logic, such as validating a form value, normalizing a request payload, or formatting a date for a given locale.
- **Component or integration:** Render the relevant screen or component and exercise it through accessible roles, labels, and user actions. Check what people can see or do. Mock the network boundary when you need to control responses.
- **Browser end to end:** Use a real browser for behavior that depends on navigation, browser focus, or multiple screens. Reserve full end-to-end flows for important user journeys and use an isolated account or test fixture.

[Testing Library guiding principles](https://testing-library.com/docs/guiding-principles)

## Worked example: a settings form that can retry a failed save

1. Open the form, change a field by its label, and submit. Keep the request pending long enough to check the pending indicator and verify that a repeated action sends a single write.
2. Return a recoverable error. Check that the error is visible, the entered value is still present, and the user can retry.
3. Make the retry succeed. Check that success is communicated and the saved value appears in the expected place.

For a dialog, open it with the keyboard, close it, and verify focus returns to the trigger. For search, type two queries, resolve the newer response first, then resolve the older one and verify the newer results remain. Control the order explicitly and wait for observable outcomes instead of adding arbitrary delays.

When reporting verification, name the commands or manual checks that actually ran and specify any uncovered behavior. Use deterministic mock responses for failure and retry scenarios.
