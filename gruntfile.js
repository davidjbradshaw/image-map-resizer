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
      banner: '/*! Image Map Resizer (jquery.imageMapResizer.min.js ) - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' *  Desc: Resize HTML imageMap to scalled image.\n' +
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
        src: ['js/**/*.js','!js/**/*.min.js']
      },
    },

    uglify: {
      options: {
        sourceMaps:true,
        sourceMapIncludeSources:true,
        report:'gzip',
      },
      main: {
        options:{
          banner:'<%= meta.banner %>',
          sourceMap: 'js/jquery.imageMapResizer.map'
        },
        src: ['js/jquery.imageMapResizer.js'],
        dest: 'js/jquery.imageMapResizer.min.js',
      }
    },

    watch: {
      files: ['js/**/*'],
      tasks: 'default'
    },

    replace: {
      min: {
        src: ['js/*.min.js'],
        overwrite: true,
        replacements: [{
          from: /sourceMappingURL=src\//g,
          to: 'sourceMappingURL=..\/src\/'
        }]
      },

      map: {
        src: ['src/*.map'],
        overwrite: true,
        replacements: [{
          from: /src\//g,
          to: ''
        }]
      }
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
      }
    }

  });

  grunt.registerTask('default', ['notest']);
  grunt.registerTask('notest',  ['jshint','uglify']);
  grunt.registerTask('test',    ['jshint','qunit']);

  grunt.registerTask('postBump',['uglify','bump-commit','shell']);
  grunt.registerTask('patch',   ['default','bump-only:patch','postBump']);
  grunt.registerTask('minor',   ['default','bump-only:minor','postBump']);
  grunt.registerTask('major',   ['default','bump-only:major','postBump']);

};
