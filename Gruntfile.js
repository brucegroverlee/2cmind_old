module.exports = function (grunt) {

  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 9000,
          base: 'src/frontend/'
        }
      }
    },
    watch: {
      project: {
        files: ['src/frontend/**/*.js', 'src/frontend/**/*.html', 'src/frontend/**/*.json', 'src/frontend/**/*.css'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['connect', 'watch']);

};
