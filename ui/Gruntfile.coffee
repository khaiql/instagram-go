module.exports = (grunt) ->
  grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-uglify'

  grunt.initConfig
    compass:
      dist:
        options:
          config: 'config.rb'
      clean:
        options:
          clean: true
    
    coffee:
      default:
        options:
          bare: false
          join: true
          sourceMap: true
          sourceMapDir: 'dist/js/'
        files:
          'dist/js/scripts.js': 'src/coffee/**/*.coffee'
    
    watch:
      scss:
        files: ['src/scss/**/*.scss']
        tasks: ['compass:dist']
      coffee:
        files: ['src/coffee/**/*.coffee']
        tasks: ['coffee']

    uglify:
      vendor:
        options:
          # prevent changes to your variable and function names.
          mangle: false
        files:
          'dist/js/vendor.js': [
            'bower_components/angular/angular.min.js'
            'bower_components/jquery/dist/jquery.min.js'
          ]

  grunt.registerTask(
    'css',
    [
      'compass:clean'
      'watch:scss'
    ]
  )

  grunt.registerTask(
    'js',
    [
      'watch:coffee'
    ]
  )

  grunt.registerTask(
    'vendor', [
      'uglify:vendor'
    ]
  )