# IO, Lists & Utilities

This page collects the input/output nodes, the container nodes that group other nodes into lists and
maps, the element/condition selectors, and small helper nodes.

## IO

Directory: `public/js/nodes/IO/`

| Node | Type | Purpose |
| --- | --- | --- |
| Parse Modelpart | `IO/Parse Modelpart` | Parse a model-part file into model-part settings + sub-model-part lists. |
| Parse Materials | `IO/Parse Materials` | Parse a materials file into a list of materials. |
| Assign Material To ModelPart | `IO/AssignMaterialToModelPart` | Bind a material to a (sub-)model part. |
| Combine Materials & Modelparts | `IO/CombineMaterialsModelparts` | Merge material and model-part assignments. |
| Export case files | `IO/DownloadProblem` | Zip `ProjectParameters.json` + material files into `case.zip` ([details](/guide/exporting)). |
| JSON Viewer | `IO/JSONView` | Render the connected JSON in the side panel. |
| Run Problem | `IO/Run Problem` | Trigger a backend Kratos run (requires a local Kratos). |
| Key/Value | `IO/KeyValue` | A single key/value pair building block. |

The **JSON Viewer** node connected to a data source is the quickest way to inspect generated output:

![JSON Viewer showing a generated block](/screenshots/json-viewer.png)

## Lists & maps

Directory: `public/js/nodes/lists/`, `public/js/nodes/maps/`

Container nodes that aggregate their inputs into an array or object.

| Node | Type | Purpose |
| --- | --- | --- |
| Generic List | `Lists/Generic List` | Ordered list of arbitrary inputs. |
| List of Processes | `Lists/Processes` | Collect process nodes into the boundary-condition list. |
| List of Output processes | `Lists/Output processes` | Collect output-process nodes. |
| List of Materials | `Lists/Materials` | Collect material nodes. |
| List of Submodelparts | `Lists/Submodelparts` | Collect sub-model parts. |
| Map | `Lists/Map` | Key→value map of inputs. |

## Output processes

Directory: `public/js/nodes/output_processes/`

| Node | Type | Purpose |
| --- | --- | --- |
| GiD Output | `Output processes/GiD` | Configure GiD output. |
| Output Process (base) | — | Base class for output-process nodes. |

## Selectors

Directory: `public/js/nodes/selectors/`

| Node | Type | Purpose |
| --- | --- | --- |
| Elements | `Elem & Cond/Elements` | Pick a Kratos element type (backed by `db/elements.js`). |
| Conditions | `Elem & Cond/Conditions` | Pick a Kratos condition type (backed by `db/conditions.js`). |

## Utilities

Directory: `public/js/nodes/utilities/`

| Helper | File | Purpose |
| --- | --- | --- |
| Error Handler | `utilities/error_handler.js` | Draws error marks/tooltips on nodes with validation problems. |
| Key/Value | `utilities/key_value.js` | Key/value helper. |
| Process Parser | `utilities/process_parser.js` | Helpers for turning parsed Kratos processes into node data. |

Generic building blocks (constants, math, watch, console, JSON parse/merge, download) also come from
[`public/js/base.js`](https://github.com/loumalouomega/Flowgraph/blob/master/public/js/base.js).
