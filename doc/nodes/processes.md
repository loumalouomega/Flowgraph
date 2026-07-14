# Processes

Process nodes describe Kratos processes — the operations that assign boundary conditions, initial
values and flags to model parts during a simulation. They are collected into a
**[List of Processes](/nodes/io-and-utilities)** which feeds an analysis stage's `Processes` input,
ending up under `processes.boundary_conditions_process_list`.

Directory: `public/js/nodes/processes/`

## Generic assignment processes

| Node | Type |
| --- | --- |
| Assign Scalar Variable | `Processes/AssignScalarVariableProcess` |
| Assign Scalar Variable To Conditions | `Processes/AssignScalarVariableToConditionsProcess` |
| Assign Vector Variable | `Processes/AssignVectorVariableProcess` |
| Assign Vector Variable To Conditions | `Processes/AssignVectorVariableToConditionsProcess` |
| Assign Vector By Direction | `Processes/AssignVectorByDirectionProcess` |
| Assign Vector By Direction To Condition | `Processes/AssignVectorByDirectionToConditionProcess` |
| Assign Flag | `Processes/AssignFlagProcess` |

## Fluid dynamics

Directory: `processes/fluid_dynamics/`

| Node | Type |
| --- | --- |
| Apply Inlet | `Processes/Fluid dynamics/ApplyInletProcess` |
| Apply Outlet | `Processes/Fluid dynamics/ApplyOutletProcess` |
| Apply No-Slip | `Processes/Fluid dynamics/ApplyNo-SlipProcess` |
| Apply Slip | `Processes/Fluid dynamics/ApplySlipProcess` |
| Apply Wall Law | `Processes/Fluid dynamics/ApplyWallLawProcess` |

## Potential flow

Directory: `processes/potential_flow/`

| Node | Type |
| --- | --- |
| Apply Far Field | `Processes/Potential flow/ApplyFarFieldProcess` |
| Define Wake Process 2D | `Processes/Potential flow/DefineWakeProcess2D` |

## Convection–diffusion

Directory: `processes/convection_diffusion/`

| Node | Type |
| --- | --- |
| Apply Thermal Face | `Processes/ApplyThermalFaceProcess` |

Each process node exposes the parameters of the corresponding Kratos process (variable name, model
part, value, interval, etc.) as widgets, and emits the process settings object. Connect several
processes into a **List of Processes** node to build the boundary-condition list for a stage.

## Selectors & databases

Some process parameters reference Kratos elements/conditions. The **[selector nodes](/nodes/io-and-utilities)**
(`Elem & Cond/Elements`, `Elem & Cond/Conditions`) are backed by the databases in
`public/js/db/elements.js` and `public/js/db/conditions.js`.
