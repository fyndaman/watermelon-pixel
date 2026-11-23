# TypeScript and API contracts

- Follow the project's strictness settings. Model states as a discriminated union when values are mutually exclusive, such as loading, success, and error. Narrow the state before reading its fields.
- Treat data entering from an API, storage, URL, or browser message as unknown until it is validated. Reuse the project's schema or decoder where available. A type assertion or generated client type alone cannot validate a response at runtime.
- Keep transport types at the API boundary. Map data into a small domain or view model when the UI has different needs. Represent absence, empty results, and unknown enum values deliberately.
- Make reusable component props express supported combinations. Use generics when callers benefit from a meaningful relationship between types. Preserve type inference and avoid broad assertions that hide mistakes.
- Review type checks alongside behavior. A successful build supplies evidence about compilation. Representative runtime data supplies evidence about the contract.

[TypeScript narrowing handbook](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
