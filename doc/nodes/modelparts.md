# Model Parts & Modelers

These nodes bring the mesh/geometry into the case and build or transform the Kratos model. Model
data propagates along connections so downstream nodes know which model parts are available — see
[`model_manager.js`](https://github.com/loumalouomega/Flowgraph/blob/master/public/js/model_manager.js)
and [`problem_manager.js`](https://github.com/loumalouomega/Flowgraph/blob/master/public/js/problem_manager.js).

## Model parts

Directory: `public/js/nodes/modelparts/`

| Node | Type | Purpose |
| --- | --- | --- |
| Read Mdpa | `ModelParts/Read Mdpa` | Read a Kratos `.mdpa` mesh file and expose its (sub-)model parts. |
| Read Med | `ModelParts/Read Med` | Read a Salome `.med` mesh. |
| Model Inspector | `ModelParts/Model Inspector` | Inspect the model parts flowing through a connection. |

Example meshes ship under `resources/mdpa/` (`small.mdpa`, `medium.mdpa`) for experimenting.

## Modelers

Directory: `public/js/nodes/modelers/`

Modelers correspond to Kratos "modeler" operations that construct or modify the model at import
time. They can be collected into a **Modelers List**.

| Node | Type | Purpose |
| --- | --- | --- |
| Import MDPA | `Modelers/Import MDPA` | Import-MDPA modeler. |
| Create Entities From Geometries | `Modelers/Create entities from geometries` | Generate elements/conditions from geometries. |
| Assign Entity To ModelPart | `Modelers/AssignEntityToModelPart` | Assign entities to a (sub-)model part. |
| Delete Model Part | `Modelers/Delete model part` | Remove a model part. |
| Modelers List | `Modelers/ModelersList` | Collect modelers into an ordered list. |
| Modeler (base) | `Modelers/Base/Modeler` | Base class for modeler nodes. |

## How model data flows

When you connect a mesh-reading node into the rest of the graph, FlowGraph tracks the model parts it
exposes and propagates that list downstream. Nodes that need to reference a specific sub-model part
(processes, material assignment, output) can then present the available names, reducing typos and
keeping the generated case consistent.
