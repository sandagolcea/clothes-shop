module.exports = function(grunt) {

  grunt.initConfig({
  protractor: {
    options: {
      configFile: "node_modules/protractor/example/conf.js",
      keepAlive: true, // keep grunt process alive after test fail
      noColor: false,
      args: {}
    },
    e2e: {
      options: {
        configFile: "e2e/conf.js",
        args: {}
      }
    },
  },
});

  grunt.loadNpmTasks('grunt-protractor-runner');

  grunt.registerTask('default', ['protractor:e2e']);
};
