'use strict';
module.exports = function(grunt) {
  require('load-grunt-config')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('build', ['stylus', 'browserify']);
  grunt.registerTask('dev', ['stylus', 'browserify', 'watch']);
}
