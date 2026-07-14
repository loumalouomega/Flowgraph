# What is FlowGraph?

**Kratos FlowGraph** is a browser-based, node-graph editor for configuring
[KratosMultiphysics](https://github.com/KratosMultiphysics/Kratos) simulations. Instead of
authoring a Kratos `ProjectParameters.json` by hand, you build the configuration visually: drop
nodes onto a canvas, wire their inputs and outputs together, and FlowGraph generates the JSON that
Kratos consumes.

![The FlowGraph editor](/screenshots/editor-overview.png)

## Why a node editor?

A Kratos case is a tree of interdependent settings — an analysis stage references a solver, the
solver references a linear solver, a time-stepping scheme, materials and a model part; processes
reference variables and sub-model parts; outputs reference the model. Expressing those
relationships as *connections between nodes* makes the structure visible and hard to get wrong:

- Each node corresponds to a concrete Kratos concept (a solver, a constitutive law, a process…).
- Connections express the "uses / is-configured-by" relationships between them.
- The generated JSON always reflects a valid wiring of those pieces.

## What it is (and isn't) under the hood

FlowGraph is **not** a bundled single-page app. It is:

- a small **Express + EJS** server ([`app.js`](https://github.com/loumalouomega/Flowgraph/blob/master/app.js)) that
  serves a single canvas page and (optionally) launches Kratos, and
- a large library of plain-ESM **[litegraph.js](https://github.com/jagenjo/litegraph.js)** node
  definitions served statically from `public/js/nodes/`.

There is no build step for the app. When the server renders the page it walks the node directory
([`src/module_importer.js`](https://github.com/loumalouomega/Flowgraph/blob/master/src/module_importer.js))
and injects every node file as a `<script type="module">`. **Adding a `.js` file under
`public/js/nodes/` registers a new node — no manifest to edit.**

## Core capabilities

| Capability | Description |
| --- | --- |
| Visual editing | Add, move, connect and configure nodes on an infinite, zoomable canvas. |
| Node library | ~85 node types spanning analysis stages, solvers, materials/constitutive laws, processes, modelers, model parts and outputs. |
| Live JSON viewer | A side panel and a `JSONView` node show the generated JSON as you build. |
| Import | Reconstruct a full node graph from an existing `ProjectParameters.json`. |
| Export | Save/load the graph, export/import selections, or download a zipped, ready-to-run case. |
| Run (optional) | With a local Kratos install, launch the simulation directly from the backend. |

Continue to [Installation](/guide/installation) to get it running, then walk through
[Getting Started](/guide/getting-started).
