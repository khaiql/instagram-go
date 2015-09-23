module.exports = (grunt) ->
  grunt.loadNpmTasks 'grunt-contrib-compass'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-browserify'

  grunt.initConfig
    compass:
      dist:
        options:
          config: 'config.rb'
      clean:
        options:
          clean: true
    
    browserify:
      app:
        options:
          debug: true
          transform: ['babelify']
          extension: ['.jsx']
        files:
          'dist/js/app.js': ['src/app/app.jsx']

    watch:
      scss:
        files: ['src/scss/**/*.scss']
        tasks: ['compass:dist']
      app:
        files: ['src/app/**/*.jsx']
        tasks: ['browserify:app']

    uglify:
      vendor:
        options:
          # prevent changes to your variable and function names.
          mangle: false
        files:
          'dist/js/vendor.js': [
            # 'bower_components/angular/angular.min.js'
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
    'app',
    [
      'watch:app'
    ]
  )

  grunt.registerTask(
    'vendor', [
      'uglify:vendor'
    ]
  )

  grunt.registerTask(
    'default', [
      'compass:clean'
      'compass:dist'
      'browserify:app'
    ]
  )