# Exporting a Case

FlowGraph offers three complementary ways to get data out of the editor, depending on whether you
want to persist your work, reuse a sub-graph, or produce a runnable Kratos case.

## 1. Save / Load the full graph

**Save** downloads the complete editor state as `graph.json` and **Load** restores it. This is the
FlowGraph-native format: it preserves nodes, widget values, positions and links exactly, but it is
*not* a Kratos case. Use it to checkpoint work-in-progress. See [The Toolbar](/guide/toolbar#save-load).

## 2. Export / Import a selection

**Export** writes only the selected nodes and their internal links to `selection.json`; **Import**
loads such a file back, remapping IDs so it never clashes with existing nodes. Use selections to
build a personal library of pre-wired blocks (a configured solver stack, a standard set of boundary
conditions, …). See [The Toolbar](/guide/toolbar#export-import-selections).

## 3. Export a runnable Kratos case

To produce something Kratos can actually run, use an **Export case files** node
(`IO/DownloadProblem`), implemented in
[`public/js/nodes/IO/export_case.js`](https://github.com/loumalouomega/Flowgraph/blob/master/public/js/nodes/IO/export_case.js).

Connect the output of your top-level analysis/orchestrator graph into the node's `data` input, then
trigger its **Download** button. The node uses [JSZip](https://stuk.github.io/jszip/) to bundle:

- `ProjectParameters.json` — the generated Kratos configuration, and
- each material JSON file referenced by the graph.

into a single `case.zip`.

### Steps

1. Build and wire your graph (see [Getting Started](/guide/getting-started)).
2. Add an **Export case files** node and connect the final analysis output into it.
3. Click **Generate** to compute the JSON.
4. Press the node's **Download** button to save `case.zip`.
5. Unzip it into your Kratos working directory and run as usual (e.g. `python MainKratos.py`).

## Running from the backend (optional)

If FlowGraph is running on a machine with a local Kratos build, the backend also exposes a
`run_simulation` route that writes `ProjectParameters.json` into the configured `working_dir` and
launches `MainKratos.py`, streaming the output back. This requires the `kratos_root`, `working_dir`
and `python_binary` settings described in [Configuration](/guide/installation#configuration).
