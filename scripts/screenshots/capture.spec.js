import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SHOT_DIR = path.resolve(__dirname, '../../doc/public/screenshots');

/**
 * Wait for the litegraph editor to have booted and exposed its globals, then
 * force a synchronous redraw so the canvas content is up to date before we
 * capture it.
 */
async function ready(page) {
  await page.waitForFunction(() => window.graph && window.graphcanvas);
  await page.waitForTimeout(400);
  await redraw(page);
}

async function redraw(page) {
  await page.evaluate(() => {
    window.graph.setDirtyCanvas(true, true);
    window.graphcanvas.setDirty(true, true);
    window.graphcanvas.draw(true, true);
  });
  await page.waitForTimeout(250);
}

/** Add a node of the given registered type at a position and return nothing. */
async function addNodes(page, specs) {
  await page.evaluate((specs) => {
    for (const s of specs) {
      const node = window.LiteGraph.createNode(s.type);
      if (!node) continue;
      node.pos = s.pos;
      if (s.title) node.title = s.title;
      window.graph.add(node);
    }
  }, specs);
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await ready(page);
  // Start each scenario from a clean canvas.
  await page.evaluate(() => window.graph.clear());
  await redraw(page);
});

test('01 - empty editor', async ({ page }) => {
  await page.screenshot({ path: path.join(SHOT_DIR, 'editor-overview.png'), fullPage: false });
});

test('02 - add-node context menu', async ({ page }) => {
  const canvas = page.locator('canvas.graphcanvas');
  const box = await canvas.boundingBox();
  // Right-click the canvas, then open "Add Node" to reveal the categorized
  // library submenu (Analysis stages, Solvers, Materials, Processes, ...).
  await page.mouse.click(box.x + box.width * 0.35, box.y + box.height * 0.3, { button: 'right' });
  await page.waitForTimeout(400);
  await page.locator('.litemenu-entry', { hasText: 'Add Node' }).first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(SHOT_DIR, 'add-node-menu.png'), fullPage: false });
});

test('03 - constitutive law material node', async ({ page }) => {
  await addNodes(page, [
    { type: 'Materials/StructuralMechanics/SmallStrainIsotropicDamage3D', pos: [420, 180] },
  ]);
  await redraw(page);
  await page.screenshot({ path: path.join(SHOT_DIR, 'material-node.png'), fullPage: false });
});

test('04 - connected graph', async ({ page }) => {
  await addNodes(page, [
    { type: 'Analysis stages/Components/ProblemData', pos: [120, 120] },
    { type: 'Solvers/Structural mechanics/Structural Mechanics Solver', pos: [120, 360] },
    { type: 'Solvers/Linear Solvers/Serial/AMGCL', pos: [120, 620] },
    { type: 'Lists/Processes', pos: [560, 120] },
    { type: 'Analysis stages/StructuralMechanicsAnalysis', pos: [880, 260] },
    { type: 'IO/DownloadProblem', pos: [1180, 260] },
  ]);
  await redraw(page);
  await page.screenshot({ path: path.join(SHOT_DIR, 'connected-graph.png'), fullPage: false });
});

test('05 - JSON side viewer', async ({ page }) => {
  // Wire ProblemData -> JSONView so the viewer shows a real generated block.
  await page.evaluate(() => {
    const source = window.LiteGraph.createNode('Analysis stages/Components/ProblemData');
    source.pos = [200, 220];
    window.graph.add(source);

    const viewer = window.LiteGraph.createNode('IO/JSONView');
    viewer.pos = [640, 220];
    window.graph.add(viewer);

    source.connect(0, viewer, 0);
  });
  await redraw(page);
  // Toggle the right-hand JSON viewer panel and run the graph once so it fills.
  await page.evaluate(() => {
    if (typeof window.openNav === 'function') window.openNav();
    window.graph.runStep();
  });
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(SHOT_DIR, 'json-viewer.png'), fullPage: false });
});
