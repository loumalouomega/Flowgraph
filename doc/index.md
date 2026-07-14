---
layout: home

hero:
  name: "Kratos FlowGraph"
  text: "A visual node editor for KratosMultiphysics"
  tagline: Wire together solvers, materials, processes and outputs on a canvas, then generate a ready-to-run Kratos ProjectParameters.json — no hand-editing JSON.
  image:
    src: /screenshots/editor-overview.png
    alt: Kratos FlowGraph editor
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Installation
      link: /guide/installation
    - theme: alt
      text: View on GitHub
      link: https://github.com/KratosMultiphysics/Flowgraph

features:
  - icon: 🧩
    title: Visual, node-based configuration
    details: Build a Kratos simulation by connecting nodes on an infinite canvas. The graph is the configuration — every node maps to a block of the resulting ProjectParameters.json.
    link: /guide/getting-started
    linkText: First graph walkthrough
  - icon: ⚙️
    title: Rich Kratos node library
    details: Analysis stages, orchestrators, fluid/structural/thermal/potential-flow solvers, serial & MPI linear solvers, constitutive laws, boundary-condition processes, modelers and output processes.
    link: /nodes/overview
    linkText: Browse the node reference
  - icon: 🔁
    title: Round-trip with existing cases
    details: Import an existing ProjectParameters.json and FlowGraph reconstructs the node graph automatically, or export the current graph as a zipped, ready-to-run case.
    link: /guide/importing-project-parameters
    linkText: Import & export
  - icon: 🚀
    title: Runs anywhere Node runs
    details: Ship as an NPM package. Launch the editor instantly with a single command — no build step, no bundler.
    link: /guide/installation
    linkText: Install it
---

## Quick start

```sh
npx kratos-flowgraph
```

Then open <http://localhost:8182> in your browser.

FlowGraph is a browser-based editor served by a small Node/Express backend. It targets
[KratosMultiphysics](https://github.com/KratosMultiphysics/Kratos) "Problemtypes": instead of
writing `ProjectParameters.json` by hand, you assemble it visually and let FlowGraph produce the
JSON (and material files) for you.
