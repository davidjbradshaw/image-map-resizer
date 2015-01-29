/*global module:false*/
module.exports = function(grunt) {

  // show elapsed time at the end
  require('time-grunt')(grunt);

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    meta: {
      banner: '/*! Image Map Resizer (imageMapResizer.min.js ) - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' *  Desc: Resize HTML imageMap to scaled image.\n' +
        ' *  Copyright: (c) <%= grunt.template.today("yyyy") %> David J. Bradshaw - dave@bradshaw.net\n' +
        ' *  License: MIT\n */\n',
 
    },

    qunit: {
      files: ['test/*.html']
    },

    jshint: {
      options: {
          globals: {
          jQuery:false,
          require:true,
          process:true
        },
      },
      gruntfile: {
        src: 'gruntfile.js'
      },
      code: {
        src: ['js/imageMapResizer.js']
      },
    },

    uglify: {
      options: {
        sourceMap:true,
        report:'gzip',
      },
      main: {
        options:{
          banner:'<%= meta.banner %>',
          sourceMapName: 'js/imageMapResizer.map'
        },
        src: ['js/imageMapResizer.js'],
        dest: 'js/imageMapResizer.min.js',
      },
      ie8: {
        options:{
          sourceMapName: 'js/ie8.polyfil.map'
        },
        src: ['js/ie8.polyfil.js'],
        dest: 'js/ie8.polyfil.min.js',
      }
    },

    watch: {
      files: ['js/**/*'],
      tasks: 'default'
    },

    bump: {
      options: {
        files: ['package.json','bower.json','imageMapResizer.jquery.json'],
        updateConfigs: ['pkg'],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['-a'], // '-a' for all files
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
      }
    },

    shell: {
      options:{
        stdout: true,
        stderr: true,
        failOnError: true
      },
      deployExample: {
        command: function(){

          var
            retStr = '',
            fs = require('fs');

          if (fs.existsSync('bin')) {
              retStr = 'bin/deploy.sh';
          }

          return retStr;
        }
      },
      npm:{
        command: 'npm publish'
      }
    }

  });

  grunt.registerTask('default', ['notest']);
  grunt.registerTask('notest',  ['jshint','uglify']);
  grunt.registerTask('test',    ['jshint','qunit']);

  grunt.registerTask('postBump',['git bump-commit','shell']);
  grunt.registerTask('patch',   ['default','bump-only:patch','postBump']);
  grunt.registerTask('minor',   ['default','bump-only:minor','postBump']);
  grunt.registerTask('major',   ['default','bump-only:major','postBump']);

};
