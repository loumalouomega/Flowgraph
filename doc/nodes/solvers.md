# Solvers

Solver nodes emit the `solver_settings` block of a stage. A solver typically consumes model-import
settings, material-import settings, a linear solver, a time-stepping scheme and (for fluids) a
formulation.

Directory: `public/js/nodes/solvers/`

## Physics solvers

| Node | Type |
| --- | --- |
| Structural Mechanics Solver | `Solvers/Structural mechanics/Structural Mechanics Solver` |
| Navier-Stokes Monolithic | `Solvers/Fluid dynamics/NavierStokesSolverMonolithic` |
| Navier-Stokes Fractional Step | `Solvers/Fluid dynamics/NavierStokesSolverFractionalStep` |
| Convection-Diffusion Solver | `Solvers/Convection-diffusion/ConvectionDiffusionSolver` |
| Potential Flow Solver | `Solvers/Potential flow/PotentialFlowSolver` |

A structural solver, for example, exposes `model_import_settings`, `model_part_name`,
`volume_model_part_name`, `skin_parts`, `no_skin_parts`, `linear_solver_settings`,
`material_import_settings` inputs and a `Domain Size` widget:

![A structural solver in a graph](/screenshots/connected-graph.png)

## Linear solvers

Directory: `public/js/nodes/solvers/linear_solvers/`

Connect a linear solver into a physics solver's `linear_solver_settings` input.

**Serial** (`Solvers/Linear Solvers/Serial/…`):

| Node | Type |
| --- | --- |
| AMGCL | `Solvers/Linear Solvers/Serial/AMGCL` |
| BICGSTAB | `Solvers/Linear Solvers/Serial/BICGSTAB` |
| CG | `Solvers/Linear Solvers/Serial/CG` |
| SparseLU | `Solvers/Linear Solvers/Serial/SparseLU` |

**MPI** (`Solvers/Linear Solvers/MPI/…`):

| Node | Type |
| --- | --- |
| AMGCL (MPI) | `Solvers/Linear Solvers/MPI/AMGCL` |
| Amesos | `Solvers/Linear Solvers/MPI/Amesos` |
| Aztec | `Solvers/Linear Solvers/MPI/Aztec` |
| Multi-Level (ML) | `Solvers/Linear Solvers/MPI/Multi-Level` |

The AMGCL serial solver exposes a rich set of widgets — max iterations, GMRES Krylov space
dimension, verbosity, tolerance, block size, coarsening thresholds, level counts and sweep counts.

## Time stepping & formulations

| Node | Type | Purpose |
| --- | --- | --- |
| Time Stepping | `Solvers/…/time_stepping` | Time-integration settings (fixed step or table-driven). |
| Monolithic formulation | `Solvers/Formulations/Monolithic` | Fluid monolithic formulation options. |
| Fractional Step formulation | `Solvers/Formulations/FractionalStep` | Fluid fractional-step formulation options. |

## Components

| Node | Type | Purpose |
| --- | --- | --- |
| Model Import Settings | `Solvers/Components/ModelImportSettings` | `model_import_settings` (input type, mesh file). |
| Material Import Settings | `Solvers/Components/MaterialImportSettings` | `material_import_settings` (materials file). |
