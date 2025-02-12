const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://zero.webappsecurity.com", 
    setupNodeEvents(on, config) {
    //
    },
  },
});