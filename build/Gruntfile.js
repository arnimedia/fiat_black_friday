// Project configuration.
module.exports = function( grunt )
{
  var set = grunt.option('set');
  var format = grunt.option('format');
  var cta = grunt.option('cta');
  var destinationFolder = set + "_" + format + "-" + cta;

  var grunt_configuration = {
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      js: {
        src: ['../lib/**/*.js', '../common-components/**/*.js', '../' + (set + "/" + format) + '/js/**/*.js'],
        dest: '../temp/js/script.js'
      },
      css: {
        src: ['../' + (set + "/" + format) + '/css/**/*.css'],
        dest: '../temp/css/style.css'
      }
    },
    uglify: {
      options: {
        compress: true
      },
      build: {
        files: {
          ['../dist/' + destinationFolder + '/js/script.min.js']: [ '../temp/js/script.js' ]
        }
      }
    },
    cssmin: {
      inline_import: {
        files: {
          ['../dist/' + destinationFolder + '/css/style.min.css']: [ '../temp/css/style.css' ]
        }
      }
    },
    copy: {
      copy_data: {
        files:[
          {
            expand: true,
            src: '../' + (set + "/" + format) + '/data/*',
            dest: '../dist/' + destinationFolder + '/data/',
            flatten: true
          }
        ]
      },
      copy_video: {
        files:[
          {
            expand: true,
            src: '../' + (set + "/" + format) + '/video/*',
            dest: '../dist/' + destinationFolder + '/video/',
            flatten: true
          }
        ]
      },
      copy_additional_assets: {
        files:[
          {
            expand: true,
            src: '../' + (set + "/" + format) + '/AdditionalAssets/*',
            dest: '../dist/' + destinationFolder + '/AdditionalAssets/',
            flatten: true
          }
        ]
      },

      copy_html: {
        files: [
          { src: [ '../' + (set + "/" + format) + '/index.html' ], dest: '../dist/' + destinationFolder + '/index.html' }
        ]
      },
      copy_backup_image: {
        files: [
          { src: [ '../' + (set + "/" + format) + '/backup.jpg' ], dest: '../dist/' + destinationFolder + '/backup.jpg' },
          { src: [ '../' + (set + "/" + format) + '/backup.gif' ], dest: '../dist/' + destinationFolder + '/backup.gif' }
        ]
      },
      copy_config: {
        files: [
          { src: [ '../' + (set + "/" + format) + '/config.js' ], dest: '../dist/' + destinationFolder + '/config.js' }
        ]
      },
      copy_fonts: {
        files:[
          {
            expand: true,
            src: '../' + (set + "/" + format) + '/fonts/*',
            dest: '../dist/' + destinationFolder + '/fonts/',
            flatten: true
          }
        ]
      }
    },
    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: grunt.option('level') || 7
        },
        files: [{
          expand: true,
          cwd: '../' + (set + "/" + format) + '/img/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: '../dist/' + destinationFolder + '/img/'
        }]
      }
    },
    processhtml: {
      build: {
        files: {
          ['../dist/' + destinationFolder + '/index.html'] : ['../dist/' + destinationFolder + '/index.html']
        }
      }
    },
    compress: {
      main: {
        options: {
          archive: '../dist/' + destinationFolder + '.zip'
        },
        files: [{
          expand: true,
          cwd: '../dist/' + destinationFolder + '/',
          src: '**'
        }]
      }
    },
    clean: {
      dist: {
        options:{
          force:true
        },
        src:['../dist/' + destinationFolder + '-' + cta]
      },
      temp: {
        options:{
          force:true
        },
        src:["../temp"]
      }
    }
  };


  console.log("BEGIN BUILD SET: " + set + " FORMAT: " + format + " cta: " + cta);


  grunt.initConfig( grunt_configuration );
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Default task(s).
  grunt.registerTask('build', ['clean:dist', 'concat','uglify','cssmin','copy','imagemin','processhtml', 'compress', 'clean:temp']);

};
