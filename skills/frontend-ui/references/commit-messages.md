# Commit messages

When drafting a commit message, check the repository's contributor guide, commit template, commit lint configuration, and recent commits for the area being changed. Follow the documented rules and use recent history for choices the rules leave open, such as naming a scope or placing an issue ID.

## Write from the staged changes

- Review the staged diff and give each commit one coherent purpose. Describe what the commit actually contains. For a draft without staged changes, use the agreed set of changes.
- Write a short subject that starts with an action verb and names the behavior or area that changed. `Preserve form input after a failed save` tells a future maintainer what to look for. Follow the repo's subject length rule. If it has none, aim for about 50 characters when the subject stays clear.
- Separate the subject and body with a blank line. Add a body when the reason, trade-off, or migration step would be hard to infer from the diff. Use issue references and required trailers in the repository's format. Mention verification only when it actually ran. [Git commit documentation](https://git-scm.com/docs/git-commit#_discussion)

## Match the repository's style

If the repository has no established convention, use a plain imperative subject such as `Keep search results visible during refresh`. For repositories that use Conventional Commits, use `type(scope): summary`, with the scope optional unless the repository requires it. Choose `feat` for a new capability and `fix` for a bug. Use other types such as `perf`, `refactor`, `docs`, or `test` where the project accepts them. For an incompatible change, follow the project's breaking-change format and explain the migration. [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/)

```text
fix(settings): preserve form input after a failed save

Keep the draft available so users can retry without re-entering their
settings.
```

Other examples for repositories using Conventional Commits include `perf(search): defer rendering large result lists` and `docs: explain frontend folder structure`. Keep the scope consistent with nearby commits and use the project's accepted type for the change.
