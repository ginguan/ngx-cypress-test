const { defineConfig } = require('cypress')

module.exports = defineConfig({
  // Viewport
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    baseUrl: 'http://localhost:4200',
    // https://docs.cypress.io/guides/references/configuration#e2e 
    // default specPattern: cypress/e2e/**/*.cy.{js,jsx,ts,tsx} 
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    // ignore
    excludeSpecPattern: ['**/1-getting-started', '**/2-advanced-examples'],

  },
})