const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'zp96gc',

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reporterEnabled: 'mochawesome',
    mochawesomeReporterOptions: {
      reportDir: 'cypress/reports/mocha', 
      quiet: true,
      overwrite: false,
      html: false, 
      json: true,  
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on, {
        jsonFolder: 'cypress/reports/mocha',
        reportDir: 'cypress/reports/html', 
        saveJson: true, 
      });
    },
  },
});