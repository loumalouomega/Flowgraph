# Analysis Stages & Orchestrators

These nodes form the **top level** of a Kratos case. An orchestrator drives one or more analysis
stages, and each stage ties together the problem data, solver, processes and outputs for a single
physics.

## Orchestrators

Directory: `public/js/nodes/orchestrators/`

| Node | Type | Purpose |
| --- | --- | --- |
| Sequential Orchestrator | `Orchestrators/SequentialOrchestrator` | Runs stages one after another (`execution_list`). The default orchestrator injected by an analysis stage when none is connected. |
| Orchestrator (base) | `Orchestrators/Base/Orchestrator` | Base class for orchestrator nodes. |

An analysis stage that has no orchestrator input automatically emits a default
`SequentialOrchestrator` block, so a single stage is usable on its own.

## Analysis stages

Directory: `public/js/nodes/analysis_stages/`

The base **Analysis stage** node
([`base/analysis_stage.js`](https://github.com/KratosMultiphysics/Flowgraph/blob/master/public/js/nodes/analysis_stages/base/analysis_stage.js))
defines the common inputs/outputs. Its inputs are:

| Input | Slot type | Feeds |
| --- | --- | --- |
| Stage | `stage_flow` | Chains additional stages into the same orchestrator. |
| Stage Pre | `stage_pre` | `stage_preprocess` block. |
| Stage Post | `stage_post` | `stage_postprocess` block. |
| Problem Data | `problem_data` | `problem_data` block. |
| Solver Settings | `solver_settings` | `solver_settings` block. |
| Processes | `process_list` | `processes.boundary_conditions_process_list`. |
| Output Processes | `output_process_list` | `output_processes.output_process_list`. |

Outputs: **Stage** (`stage_flow`) and **Name** (`string`). On execute it builds the
`stages.<stage_name>` entry and appends the stage to the orchestrator's `execution_list`.

### Concrete stages

| Node | Type |
| --- | --- |
| Structural Mechanics Analysis | `Analysis stages/StructuralMechanicsAnalysis` |
| Fluid Dynamics Analysis | `Analysis stages/FluidDynamicsAnalysis` |
| Convection Diffusion Analysis | `Analysis stages/ConvectionDiffusionAnalysis` |
| Potential Flow Analysis | `Analysis stages/PotentialFlowAnalysis` |
| FSI Analysis | `Analysis stages/FsiAnalysis` |

Each sets its `analysis_stage` type string to the corresponding Kratos application module.

### Components

| Node | Type | Purpose |
| --- | --- | --- |
| Problem Data | `Analysis stages/Components/ProblemData` | Emits the `problem_data` block: problem name, parallel type (OpenMP/MPI), echo level, start/end time. |
| Preprocess | `Analysis stages/Components/Preprocess` | `stage_preprocess` operations/modelers. |
| PostProcess | `Analysis stages/Components/PostProcess` | `stage_postprocess` operations. |

The **Problem Data** node is the simplest way to see the tool in action — connect it to a JSON
Viewer to inspect its output:

![Problem Data feeding the JSON viewer](/screenshots/json-viewer.png)

> 📖 Kratos reference:
> [AnalysisStage](https://kratosmultiphysics.github.io/Kratos/pages/Kratos/Sequence_Diagrams/General/AnalysisStage.html)
