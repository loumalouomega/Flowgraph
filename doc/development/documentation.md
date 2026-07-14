# Documentation & Screenshots

This documentation site is built with [VitePress](https://vitepress.dev/) and lives in the `doc/`
folder. The screenshots are captured automatically with [Playwright](https://playwright.dev/) and
committed to the repository.

## Editing the docs

```sh
npm run docs:dev      # local dev server with hot reload
npm run docs:build    # production build into doc/.vitepress/dist
npm run docs:preview  # preview the production build
```

- Content pages are Markdown files under `doc/` (`guide/`, `nodes/`, `development/`).
- Navigation and sidebar are configured in
  [`doc/.vitepress/config.mjs`](https://github.com/loumalouomega/Flowgraph/blob/master/doc/.vitepress/config.mjs).
- Static assets (including screenshots) live under `doc/public/` and are referenced with an absolute
  path, e.g. `/screenshots/editor-overview.png`.

## Regenerating screenshots

Screenshots are produced by
[`scripts/screenshots/capture.spec.js`](https://github.com/loumalouomega/Flowgraph/blob/master/scripts/screenshots/capture.spec.js),
driven by [`playwright.config.js`](https://github.com/loumalouomega/Flowgraph/blob/master/playwright.config.js).

```sh
# One-time: install the browser Playwright uses
npx playwright install chromium

# Capture all screenshots into doc/public/screenshots/
npm run docs:screenshots
```

The Playwright config boots the Flowgraph server (`node app.js`) automatically via its `webServer`
option, so you don't need to start it yourself. The script:

1. opens the editor,
2. clears the canvas before each scenario,
3. adds/connects nodes programmatically through `window.graph` / `window.LiteGraph`,
4. writes PNGs to `doc/public/screenshots/`.

Current screenshots:

| File | Scenario |
| --- | --- |
| `editor-overview.png` | Empty editor + toolbar. |
| `add-node-menu.png` | Categorized "Add Node" menu. |
| `material-node.png` | A constitutive-law node with dynamic widgets. |
| `connected-graph.png` | A small wired structural graph. |
| `json-viewer.png` | ProblemData → JSON Viewer with the side panel open. |

Because the images are **committed**, the documentation build never needs to launch the app — the
[docs deploy workflow](/development/publishing#docs-deploy) simply builds the static site.

## When to update

Update the docs and (if the UI changed) regenerate screenshots **in the same change** as any new
feature or node. This is enforced by convention — see the note in
[Adding a Node](/development/adding-a-node#_4-update-the-docs-required) and the sync clause in
`CLAUDE.md`.
