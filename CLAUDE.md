# CLAUDE.md

Guidance for Claude Code (and other AI assistants) working in this repository.

## Project overview

**Kratos FlowGraph** is a browser-based, node-graph editor for configuring
[KratosMultiphysics](https://github.com/KratosMultiphysics/Kratos) simulations. Users wire nodes
(analysis stages, solvers, materials, processes, model parts, outputs) on a canvas, and FlowGraph
generates the Kratos `ProjectParameters.json` (and material files).

It is **not** a bundled SPA. It is:

- a small **Express + EJS** server (`app.js`) that serves a single canvas page and optionally
  launches Kratos, plus
- a large library of plain-ESM **[litegraph.js](https://github.com/jagenjo/litegraph.js)** node
  modules served statically from `public/js/nodes/`.

There is **no build step** for the application itself. The published NPM package is
`kratos-flowgraph`, exposed as a runnable CLI.

## Run / develop

```sh
npm install
npm start        # node app.js — serves the editor on http://localhost:8182
npm run devstart # nodemon app.js — auto-reload during development
```

- Port and Kratos paths come from `config/default.json` (via the `config` package). Switch config
  files with `NODE_ENV` (e.g. `NODE_ENV=debug` → `config/debug.json`).
- The CLI entry point is `bin/kratos-flowgraph.js`; it `chdir`s to the package root (so
  CWD-relative lookups in `src/module_importer.js` and `config` work) and then imports `app.js`.
- The editor UI needs **no Kratos install**; `kratos_root` / `working_dir` / `python_binary` are
  only used by the optional `/run_simulation` route.

## Architecture map

| Path | Role |
| --- | --- |
| `app.js` | Express server: serves `public/`, renders `views/index.ejs`, routes `/upload_json`, `/run_simulation`. |
| `bin/kratos-flowgraph.js` | CLI launcher (chdir to package root, then run app). |
| `src/module_importer.js` | Auto-discovers node/widget files under `public/js/nodes` & `public/js/widgets`. |
| `views/index.ejs` | The entire UI: toolbar, `<canvas class="graphcanvas">`, JSON side panel. |
| `public/js/code.js` | Bootstraps the litegraph editor; wires the toolbar; exposes `window.graph`/`window.graphcanvas`. |
| `public/js/side.js` | Side panel toggle (`openNav`), `addViewerNode`, experimental LLM hook. |
| `public/js/litegraph/litegraph.core.js` | Vendored litegraph engine. |
| `public/js/extensions/*.js` | Core customisations: `extended_menu` (categorized add-node menu), `draw_node`/`draw_widget`, `compute_size`, `remove_node`/`remove_widget`, `custom_node_panel`, `selection_import`, `load_project_parameters` (import ProjectParameters → graph). |
| `public/js/nodes/**` | The node library, organized by Kratos domain (see the docs Node Reference). |
| `public/js/model_manager.js`, `problem_manager.js` | Track model parts / global problem state across connections. |
| `config/default.json` | Runtime config (host, port, kratos_root, working_dir, python_binary). |
| `doc/` | VitePress documentation (see below). |
| `scripts/screenshots/capture.spec.js` | Playwright screenshot capture for the docs. |

## Adding a node

Drop a `.js` file under `public/js/nodes/<category>/` that defines a class and calls
`LiteGraph.registerNodeType("Category/Sub/Name", Class)`. It is **auto-discovered** — no manifest to
edit. The registered type path drives the context-menu category. Reuse existing slot types so the
node connects to the rest of the library. See `doc/development/adding-a-node.md` for a template.

## Documentation & screenshots

The docs live in `doc/` (VitePress) with screenshots under `doc/public/screenshots/`.

```sh
npm run docs:dev          # local docs dev server
npm run docs:build        # build static docs into doc/.vitepress/dist
npm run docs:screenshots  # Playwright: boot the app, capture UI screenshots (needs `npx playwright install chromium` once)
```

## Publishing

- **NPM**: bump `version` in `package.json`, push, then create a **GitHub Release**. The
  `.github/workflows/publish.yml` workflow publishes `kratos-flowgraph` using the `NPM_TOKEN` secret.
  Verify the tarball with `npm pack --dry-run`.
- **Docs**: pushing to `master` triggers `.github/workflows/docs.yml`, which builds and deploys the
  VitePress site to GitHub Pages (requires Pages source = "GitHub Actions", one-time).

## ⚠️ Mandatory documentation sync clause

> **Whenever a new feature, node, or user-facing change is added, you MUST update `CLAUDE.md`,
> `README.md`, and the `doc/` VitePress documentation in the same change. If the change alters the
> UI, regenerate the Playwright screenshots with `npm run docs:screenshots`. A feature is NOT
> complete until these are updated.**

Concretely, when you change behaviour:

1. Update `CLAUDE.md` if the architecture, commands or workflow changed.
2. Update `README.md` if the quick-start, features or install steps changed.
3. Update the relevant page(s) under `doc/` (guide, node reference, or development).
4. Re-run `npm run docs:screenshots` if the UI changed, and commit the updated images.

## Conventions & notes

- Node names, slot types and emitted JSON should match the Kratos schema for the concept modelled.
- Runtime dependencies (`express`, `cors`, `ejs`, `config`) live under `dependencies` — do **not**
  move them back to `devDependencies`, or the published CLI will not run.
- `package-lock.json` is gitignored; there is no committed lockfile.
- Prefer extending existing base classes (`Material`, `AnalysisStage`, `Process`, …) for new nodes.
