// Karma configuration
// Generated on Sun Nov 06 2016 13:00:48 GMT-0800 (PST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'qunit'],

    plugins: ['karma-qunit', 'karma-browserify', 'karma-chrome-launcher'],

    // list of files / patterns to load in the browser
    files: [
      'app/scripts/modules/*.js',
      'app/test/modules/*.js'
    ],

    // list of files to exclude
    exclude: [
      'app/test/modules/payment-tests.js' /* for now */
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/test/modules/*.js': ['browserify'],
      'app/scripts/modules/*.js': ['browserify']
    },

    browserify: {
      debug: true,
      transform: [['babelify', {presets: ['es2015']}]],
      paths: ['app/scripts/modules/', 'test/modules/',
              'node_modules/sinon/pkg/', 'node_modules/']
    },

    client: {
      clearContext: false,
      qunit: {
        showUI: true,
        testTimeout: 5000
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  })
}
