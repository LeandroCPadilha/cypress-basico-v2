const { defineConfig } = require("cypress");

module.exports = defineConfig({

  projectId: "gtzs47",

  e2e: {
    video: false,
    //viewportWidth: 1280,
    //viewportHeight: 880,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
