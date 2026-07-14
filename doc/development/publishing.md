# Publishing

FlowGraph is published to NPM as [`@kratos-flowgraph/flowgraph`](https://www.npmjs.com/package/@kratos-flowgraph/flowgraph)
(a scoped package under the `@kratos-flowgraph` org) and its documentation is deployed to GitHub
Pages. Both are automated with GitHub Actions.

## Publishing to NPM

The [`publish.yml`](https://github.com/loumalouomega/Flowgraph/blob/master/.github/workflows/publish.yml)
workflow runs whenever a **GitHub Release is published**. It installs dependencies and runs
`npm publish` using the `NPM_TOKEN` repository secret.

### Release checklist

1. Bump the `version` field in `package.json` (follow [semver](https://semver.org/)).
2. Commit and push to `master`.
3. Create a **GitHub Release** with a matching tag (e.g. `v1.2.0`).
4. The workflow publishes the new version to NPM automatically.

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
