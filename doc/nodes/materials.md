# Materials & Constitutive Laws

Material nodes emit Kratos material definitions — a `constitutive_law` name plus a `Variables` block
of material constants. They connect (via the `material` slot type) into lists and combiners that
ultimately feed the solver's material import.

Directory: `public/js/nodes/materials/`

## Fluids & helpers

| Node | Type | Purpose |
| --- | --- | --- |
| Newtonian | `Materials/Newtonian` | Newtonian fluid material. |
| Material (base) | — | Base class shared by material nodes. |
| Material Writer | `Materials/Material Writer` | Serialises the connected materials into the Kratos materials JSON. |

## Structural-mechanics constitutive laws

Directory: `public/js/nodes/materials/structural_mechanics/`

| Node | Type | Family |
| --- | --- | --- |
| Elastic Isotropic 3D | `Materials/StructuralMechanics/ElasticIsotropic3D` | Elastic |
| Linear Plane Strain | `Materials/StructuralMechanics/LinearPlaneStrain` | Elastic (2D) |
| Linear Plane Stress | `Materials/StructuralMechanics/LinearPlaneStress` | Elastic (2D) |
| Small Strain Isotropic Plasticity 3D | `Materials/StructuralMechanics/SmallStrainIsotropicPlasticity3D` | Plasticity |
| Finite Strain Isotropic Plasticity 3D | `Materials/StructuralMechanics/FiniteStrainIsotropicPlasticity3D` | Plasticity |
| Small Strain Isotropic Damage 3D | `Materials/StructuralMechanics/SmallStrainIsotropicDamage3D` | Damage |
| Small Strain Isotropic Damage Plane Strain | `Materials/StructuralMechanics/SmallStrainIsotropicDamagePlaneStrain` | Damage (2D) |
| Small Strain Isotropic Damage Plane Stress | `Materials/StructuralMechanics/SmallStrainIsotropicDamagePlaneStress` | Damage (2D) |

### Dynamic yield-surface properties

The plasticity and damage laws expose a **YieldSurface** combo, and the set of material-constant
widgets updates dynamically to match the chosen surface. For the damage/plasticity laws the
supported surfaces are `VonMises`, `Tresca`, `Rankine`, `MohrCoulomb`, `ModifiedMohrCoulomb`,
`DruckerPrager` and `SimoJu`. Selecting a surface shows exactly the constants it requires — for
example `DENSITY`, `YOUNG_MODULUS`, `POISSON_RATIO`, `YIELD_STRESS`, `FRACTURE_ENERGY`,
`SOFTENING_TYPE`, and (for the Coulomb/Drucker-Prager surfaces) additional
`YIELD_STRESS_COMPRESSION`, `FRICTION_ANGLE`, `COHESION`, `DILATANCY_ANGLE`.

![A Small strain isotropic damage 3D node with dynamic widgets](/screenshots/material-node.png)

On execute, the node emits:

```json
{
  "model_part_name": "…",
  "properties_id": 0,
  "Material": {
    "constitutive_law": { "name": "SmallStrainIsotropicDamage3D<YieldSurface>" },
    "Variables": { "DENSITY": 0, "YOUNG_MODULUS": 0, "…": 0 },
    "Tables": {}
  }
}
```

The `constitutive_law.name` is composed from the base law and the selected yield surface, matching
the Kratos constitutive-law naming convention.

## Wiring materials

Materials flow into a **[List of Materials](/nodes/io-and-utilities)** and are combined with model
parts via **Assign Material To ModelPart** / **Combine Materials & Modelparts** IO nodes before
reaching the solver's material import settings.
