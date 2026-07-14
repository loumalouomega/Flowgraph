# Architecture

FlowGraph is intentionally simple: a small Node/Express server that serves a single canvas page plus
a large library of plain-ESM node modules. **There is no bundler and no build step for the app.**

## High-level flow

```
Browser  ──GET /──►  Express (app.js)
                        │  renders views/index.ejs
                        │  injecting <script type="module"> tags for every
                        │  node discovered by src/module_importer.js
                        ▼
              litegraph canvas (public/js/code.js bootstraps the editor)
                        │
        toolbar + nodes + extensions run entirely client-side
                        │
   optional ──POST /upload_json──►  writes ProjectParameters.json
   optional ──GET  /run_simulation──►  spawns python MainKratos.py (streamed)
```

## Key files

| Path | Role |
| --- | --- |
| [`app.js`](https://github.com/loumalouomega/Flowgraph/blob/master/app.js) | Express server. Serves `public/`, renders `index.ejs`, exposes `/upload_json` and `/run_simulation`. |
| [`bin/kratos-flowgraph.js`](https://github.com/loumalouomega/Flowgraph/blob/master/bin/kratos-flowgraph.js) | CLI entry point. `chdir`s to the package root, then launches `app.js`. |
| [`src/module_importer.js`](https://github.com/loumalouomega/Flowgraph/blob/master/src/module_importer.js) | Walks `public/js/nodes` & `public/js/widgets` and returns the file list injected into the page. |
| [`views/index.ejs`](https://github.com/loumalouomega/Flowgraph/blob/master/views/index.ejs) | The whole UI: toolbar, `<canvas class="graphcanvas">`, JSON side panel. |
| [`public/js/code.js`](https://github.com/loumalouomega/Flowgraph/blob/master/public/js/code.js) | Creates the litegraph `Editor`, exposes `window.graph`/`window.graphcanvas`, wires the toolbar. |
| [`public/js/litegraph/litegraph.core.js`](https://github.com/loumalouomega/Flowgraph/blob/master/public/js/litegraph/litegraph.core.js) | Vendored [litegraph.js](https://github.com/jagenjo/litegraph.js) engine. |
| `public/js/extensions/*.js` | Customisations of the core: categorized menu, custom drawing, node sizing, removal, selection import, ProjectParameters import. |
| `public/js/nodes/**` | The node library (see the [Node Reference](/nodes/overview)). |
| `public/js/model_manager.js`, `problem_manager.js` | Track model parts / global problem state across connected nodes. |
| `config/default.json` | Runtime configuration (port, Kratos paths). |

## Extensions layer

The files in `public/js/extensions/` are loaded after the core library and before the nodes. They
adapt vanilla litegraph to FlowGraph's needs:

| File | Responsibility |
| --- | --- |
| `extended_menu.js` | Hierarchical, category-based "Add Node" context menu. |
| `draw_node.js`, `draw_widget.js` | Custom node/widget rendering (glyphs, tooltips, error marks). |
| `compute_size.js` | Node auto-sizing with margins. |
| `remove_node.js`, `remove_widget.js` | Node/widget deletion. |
| `custom_node_panel.js` | Custom node properties panel. |
| `selection_import.js` | Selection export/import support. |
| `load_project_parameters.js` | The [from-JSON converter](/guide/importing-project-parameters). |

## Data flow inside the graph

Each node implements `onExecute()`. Clicking **Generate** calls `graph.runStep()`, which executes
nodes in dependency order: source nodes compute their JSON fragments and push them along the
connections, intermediate nodes assemble them, and sink nodes (JSON Viewer, Export case) consume the
final result. Slot **types** constrain which connections are legal, so an invalid case is hard to
build by accident.
