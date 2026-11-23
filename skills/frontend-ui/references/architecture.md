# Frontend folder structure

Choose file locations by ownership and by the framework's routing and runtime rules. In an existing app, inspect the nearest comparable feature, its route entry, and its imports. Follow that structure and the repository's naming, alias, and test conventions. In a workspace with multiple apps, make the decision within the app or package that owns the change.

## Where code belongs

- **Route entry:** Use the framework's route directory or the app's route registration. Keep route parameters, layout wiring, and framework-specific loading or error boundaries there when the framework expects them.
- **Feature UI and logic:** Keep feature-specific components, styles, form validation, and state near the screen that uses them. Extract a module when it has a distinct responsibility, such as building an API payload or managing a request lifecycle.
- **Data access:** Follow the existing service or API client convention. A feature can own its endpoint adapter. Shared request behavior, such as transport and error normalization, belongs with the common client. Observe the framework's server and client import boundaries.
- **Shared code:** Promote a component, hook, or utility when multiple features need the same stable behavior. Keep shared modules free of imports from specific features. For business-specific code used across features, choose a domain owner with an explicit API.
- **Styles and tests:** Keep feature styles near their consumers and global tokens or themes in the existing shared styling layer. Place tests according to the repository's convention, whether colocated or mirrored in a central test directory.

## A starting point for a new app

This example uses a separate route layer. Substitute the framework's required entry points. A small feature can start as one screen and gain files as responsibilities emerge.

```text
src/
  routes/                         # Order route wires the URL to OrdersPage
  features/
    orders/
      OrdersPage.tsx              # Screen composition
      OrderFilters.tsx            # UI specific to orders
      orders.api.ts               # Orders requests and response mapping
      orders.module.css           # Styles specific to orders
  shared/
    ui/                           # Controls reused across features
    api/                          # Shared HTTP client
  styles/                         # Global theme and tokens
```

Before creating files, identify the route entry, the feature that owns the behavior, and the shared modules the change will reuse. Prefer colocating a small change over creating empty layers. For moves the user requests, check route behavior, imports, and module boundaries after the move.
