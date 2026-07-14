import { defineConfig } from '@playwright/test';

/**
 * Playwright configuration used to capture the documentation screenshots.
 *
 * `npm run docs:screenshots` boots the Flowgraph Express server, drives the
 * editor UI and writes PNGs into `doc/public/screenshots/`. Those images are
 * committed to the repository and referenced from the VitePress docs, so the
 * documentation build itself never needs to launch the app.
 */
export default defineConfig({
  testDir: './scripts/screenshots',
  timeout: 60 * 1000,
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:8182',
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  },
  webServer: {
    command: 'node app.js',
    url: 'http://localhost:8182',
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000,
  },
});
