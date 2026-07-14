# Adding a Node

Adding a node to FlowGraph is deliberately low-friction: **drop a `.js` file in the right place and
it is registered automatically** — there is no manifest to edit.

## 1. Create the file

Add a module under `public/js/nodes/<category>/`. The directory path becomes the category shown in
the **Add Node** menu. For example, a new structural process would live in
`public/js/nodes/processes/structural_mechanics/`.

## 2. Define the node class and register it

A minimal node defines its slots and widgets in the constructor, assembles its output in
`onExecute()`, and calls `LiteGraph.registerNodeType`:

```js
class MyProcess {
  constructor() {
    // Inputs (left) and outputs (right); the second argument is the slot TYPE.
    this.addInput("model_part_name", "string");
    this.addOutput("Process", "process");

    // Editable properties.
    this.value = this.addWidget("number", "VALUE", 0.0, { step: 1 });
  }

  onExecute() {
    const output = {
      python_module: "my_process",
      kratos_module: "KratosMultiphysics",
      Parameters: {
        model_part_name: this.getInputData(0),
        value: this.value.value,
      },
    };
    this.setOutputData(0, output);
  }
}

MyProcess.title = "My Process";
MyProcess.desc = "Short description shown as a tooltip.";

LiteGraph.registerNodeType("Processes/Structural mechanics/MyProcess", MyProcess);
```

Key points:

- The **registered type path** (`"Category/Sub/Name"`) drives the context-menu hierarchy.
- Slot **types** (the second argument to `addInput`/`addOutput`) determine which connections are
  allowed. Reuse existing types (`string`, `number`, `material`, `process_list`, `solver_settings`,
  `stage_flow`, …) so your node connects to the rest of the library.
- Extend a base class where one exists (e.g. `Material`, `AnalysisStage`, `Process`) to inherit
  shared behaviour.

## 3. That's it — auto-discovery

On the next server render, `src/module_importer.js` walks `public/js/nodes`, finds your file and
injects it as a `<script type="module">`. Reload the page (or rely on `nodemon` in
`npm run devstart`) and the node appears in the menu.

## 4. Update the docs — required

::: danger Documentation is part of "done"
Whenever you add a new node, feature, or user-facing change you **must** update, in the same change:

- `CLAUDE.md`
- `README.md`
- the `doc/` VitePress documentation (this site)

If the change alters the UI, regenerate the screenshots with `npm run docs:screenshots`.

A feature is **not complete** until the documentation reflects it. See
[Documentation & Screenshots](/development/documentation).
:::

## Tips

- Look at a similar existing node before writing a new one — the `materials/structural_mechanics/`
  laws are good examples of dynamic widgets, and the `processes/` folder shows the process pattern.
- Use `console.log` sparingly for debugging; several nodes log on registration.
- Keep the emitted JSON aligned with the Kratos schema for the concept you are modelling, and link
  the relevant Kratos docs via a `doc_ref` on the class where helpful.
