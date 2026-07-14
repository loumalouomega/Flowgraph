# Installation

FlowGraph runs on [Node.js](https://nodejs.org/) **18 or newer**. It has no build step — the
editor is served directly by a small Express backend.

## Run it instantly (recommended)

The fastest way to try FlowGraph is with `npx`, which downloads and runs the package without a
global install:

```sh
npx @kratos-flowgraph/flowgraph
```

Then open <http://localhost:8182> in your browser.

## Global install

To install the CLI permanently:

```sh
npm install -g @kratos-flowgraph/flowgraph
kratos-flowgraph
```

The `kratos-flowgraph` command starts the editor server on port **8182** (see
[Configuration](#configuration) to change it).

## From source

Clone the repository if you want to modify FlowGraph or contribute:

```sh
git clone https://github.com/loumalouomega/Flowgraph.git
cd Flowgraph
npm install
```

Then run:

```sh
npm start        # node app.js
```

or, for development with auto-reload:

```sh
npm run devstart # nodemon app.js
```

## Configuration

Configuration is provided by the [`config`](https://www.npmjs.com/package/config) package and
lives in `config/default.json`:

```json
{
    "host" : "127.0.0.1",
    "port" : "8182",
    "kratos_root": "/path/to/Kratos/bin/Release",
    "working_dir": "/path/to/working_dir",
    "python_binary": "python3"
}
```

| Key | Purpose |
| --- | --- |
| `host` / `port` | Address the editor server binds to. |
| `kratos_root` | Path to a local Kratos build — only needed to **run** simulations from the backend. |
| `working_dir` | Where the generated `ProjectParameters.json` is written and the run is launched. |
| `python_binary` | Python interpreter used to launch `MainKratos.py`. |

You can switch configuration files with the `NODE_ENV` environment variable. For example, creating
`config/debug.json` and running:

```sh
NODE_ENV=debug npm start
```

will load `config/debug.json` instead of `config/default.json`.

::: tip
The editor UI itself needs **no Kratos installation**. `kratos_root`, `working_dir` and
`python_binary` are only used by the optional "run simulation" backend route. You can build and
export cases on any machine with Node.js.
:::

Next: the [Getting Started](/guide/getting-started) walkthrough.
