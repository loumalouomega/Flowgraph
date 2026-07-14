import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Kratos FlowGraph',
  description: 'A node editor for configuring KratosMultiphysics simulations',
  lang: 'en-US',

  // Deployed to GitHub Pages as a project site: https://loumalouomega.github.io/Flowgraph/
  base: '/Flowgraph/',

  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', href: '/Flowgraph/favicon.ico' }],
  ],

  themeConfig: {
    logo: undefined,

    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Node Reference', link: '/nodes/overview' },
      { text: 'Development', link: '/development/architecture' },
      {
        text: 'Links',
        items: [
          { text: 'NPM package', link: 'https://www.npmjs.com/package/@kratos-flowgraph/flowgraph' },
          { text: 'KratosMultiphysics', link: 'https://github.com/KratosMultiphysics/Kratos' },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is FlowGraph?', link: '/guide/introduction' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Getting Started', link: '/guide/getting-started' },
          ],
        },
        {
          text: 'Using the Editor',
          items: [
            { text: 'The Toolbar', link: '/guide/toolbar' },
            { text: 'Importing ProjectParameters', link: '/guide/importing-project-parameters' },
            { text: 'Exporting a Case', link: '/guide/exporting' },
          ],
        },
      ],
      '/nodes/': [
        {
          text: 'Node Reference',
          items: [
            { text: 'Overview', link: '/nodes/overview' },
            { text: 'Analysis Stages & Orchestrators', link: '/nodes/analysis-stages' },
            { text: 'Solvers', link: '/nodes/solvers' },
            { text: 'Materials & Constitutive Laws', link: '/nodes/materials' },
            { text: 'Processes', link: '/nodes/processes' },
            { text: 'Model Parts & Modelers', link: '/nodes/modelparts' },
            { text: 'IO, Lists & Utilities', link: '/nodes/io-and-utilities' },
          ],
        },
      ],
      '/development/': [
        {
          text: 'Development',
          items: [
            { text: 'Architecture', link: '/development/architecture' },
            { text: 'Adding a Node', link: '/development/adding-a-node' },
            { text: 'Documentation & Screenshots', link: '/development/documentation' },
            { text: 'Publishing', link: '/development/publishing' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/loumalouomega/Flowgraph' },
    ],

    search: {
      provider: 'local',
    },

    editLink: {
      pattern: 'https://github.com/loumalouomega/Flowgraph/edit/master/doc/:path',
      text: 'Edit this page on GitHub',
    },

    footer: {
      message: 'Released under the AGPL-3.0-or-later License.',
      copyright: 'Copyright © KratosMultiphysics',
    },
  },
});
