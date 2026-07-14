# Importing a ProjectParameters.json

FlowGraph can work in both directions. Besides *generating* a Kratos `ProjectParameters.json` from a
graph, it can **reconstruct a graph from an existing** `ProjectParameters.json` — useful for
inspecting, editing or documenting cases you already have.

This is handled by the "from-JSON converter" in
[`public/js/extensions/load_project_parameters.js`](https://github.com/loumalouomega/Flowgraph/blob/master/public/js/extensions/load_project_parameters.js),
which adds `LGraph.prototype.configure_project_parameters()` and a `KratosProblemParametersBuilder`
class.

## How it works

When you load a Kratos `ProjectParameters.json`, the builder:

1. **Detects node types from the JSON structure.** Well-known keys map to nodes — `problem_data`,
   `solver_settings`, `linear_solver_settings`, `model_import_settings`, the orchestrator and the
   analysis `stages` each become the corresponding FlowGraph node.
2. **Recreates each node** with its widget values populated from the JSON (problem name, parallel
   type, echo level, solver options, linear-solver parameters, and so on).
3. **Auto-positions** the reconstructed nodes into columns so the graph is readable immediately.
4. **Auto-connects** the nodes to reflect the references in the original file (solver → linear
   solver, stage → solver → problem data, etc.).

The result is a graph equivalent to the input case, which you can then edit visually and re-export.

## Typical workflow

1. Open FlowGraph.
2. Load your existing `ProjectParameters.json` through the import entry point.
3. Review the reconstructed graph, adjust widgets or connections as needed.
4. Click **Generate** and open the **Viewer** to confirm the regenerated JSON.
5. [Export a case](/guide/exporting) to produce an updated, runnable bundle.

::: tip Round-tripping
Because import and export are symmetric, FlowGraph is a convenient editor for cases authored by
hand or by other tools — import, tweak visually, and export back to JSON.
:::

## Related

- [Exporting a Case](/guide/exporting) — the reverse direction.
- [Analysis Stages & Orchestrators](/nodes/analysis-stages) — the top-level structure the importer
  reconstructs.
