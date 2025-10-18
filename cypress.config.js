const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'zp96gc',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
