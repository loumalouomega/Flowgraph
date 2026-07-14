# Publishing

FlowGraph is published to NPM as [`@kratos-flowgraph/flowgraph`](https://www.npmjs.com/package/@kratos-flowgraph/flowgraph)
(a scoped package under the `@kratos-flowgraph` org) and its documentation is deployed to GitHub
Pages. Both are automated with GitHub Actions.

## Publishing to NPM

The [`publish.yml`](https://github.com/loumalouomega/Flowgraph/blob/master/.github/workflows/publish.yml)
workflow runs automatically whenever a **tag matching `v*` is pushed** (it also runs when a GitHub
Release is published, and can be started manually via *workflow_dispatch*). It installs dependencies
and runs `npm publish --provenance --access public` using the `NPM_TOKEN` repository secret.

### Release checklist

1. Bump the version and create the tag (both in one step):
   ```sh
   npm version patch        # or minor / major — edits package.json, commits, tags vX.Y.Z
   git push && git push --tags
   ```
2. The pushed `vX.Y.Z` tag triggers the workflow, which publishes the new version to NPM.

::: warning Tag the right commit
For a tag-push trigger, GitHub uses the workflow file **and** `package.json` from the tagged commit.
`npm version` tags the commit it just made, so this is automatic — but never move a tag onto an
older commit that predates a workflow/package change, or the stale files will be used.
:::

::: tip No manual GitHub Release needed
Because the trigger is the tag itself, you don't have to create a GitHub Release. Creating one still
works (it's an additional trigger) if you want formal release notes.
:::

::: tip One-time setup
The `NPM_TOKEN` secret must exist in the repository settings (Settings → Secrets and variables →
Actions). It should be an **automation** token with publish rights to the `@kratos-flowgraph` org.
:::

### What gets published

The `files` whitelist in `package.json` controls the tarball contents — `app.js`, `bin/`, `src/`,
`public/`, `views/`, `config/`, `README.md` and `LICENSE`. Documentation, tests and screenshot
tooling are **not** shipped. Verify locally with:

```sh
npm pack --dry-run
```

## Docs deploy

The [`docs.yml`](https://github.com/loumalouomega/Flowgraph/blob/master/.github/workflows/docs.yml)
workflow builds the VitePress site on every push to `master` and deploys `doc/.vitepress/dist` to
GitHub Pages.

::: warning One-time setup
GitHub Pages must be enabled for the repository with the **GitHub Actions** source (Settings →
Pages → Build and deployment → Source: *GitHub Actions*). The site is served at
<https://loumalouomega.github.io/Flowgraph/>, which matches the `base` in
`doc/.vitepress/config.mjs`.
:::

Because screenshots are committed, the docs build does not launch the app; it only compiles the
static site.
