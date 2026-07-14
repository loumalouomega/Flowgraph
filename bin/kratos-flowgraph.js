#!/usr/bin/env node

/**
 * kratos-flowgraph CLI launcher.
 *
 * The application resolves several paths relative to the current working
 * directory:
 *   - `src/module_importer.js` walks `./public/js/nodes` and
 *     `./public/js/widgets` to auto-discover node/widget files.
 *   - the `config` package reads configuration from `./config`.
 *
 * When the package is installed globally or run through `npx` from an
 * arbitrary directory, that CWD is not the package root, so those lookups
 * would fail. We therefore change into the package root before importing
 * the Express app.
 */

import { fileURLToPath } from 'url';
import path from 'path';

const packageRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
process.chdir(packageRoot);

await import('../app.js');
