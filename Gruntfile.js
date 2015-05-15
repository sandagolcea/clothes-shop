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
  watch: {
    protractor: {
      files: ['js/**/*.js', 'e2e/*.js'],
      tasks: ['protractor:e2e']
    }
  }
});

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-protractor-runner');

  grunt.registerTask('e2e', ['protractor:e2e', 'watch:protractor']);
  grunt.registerTask('default', ['protractor:e2e', 'watch:protractor']);
};
