// Karma configuration
// Generated on Sun Nov 06 2016 13:00:48 GMT-0800 (PST)

module.exports = function(config) {
  'use strict';
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: 'app/',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'mocha', 'fixture'],

    plugins: [
      'karma-mocha',
      'karma-browserify',
      'karma-chrome-launcher',
      'karma-fixture',
      'karma-html2js-preprocessor'
    ],

    // list of files / patterns to load in the browser
    files: [
      'scripts/modules/*.js',
      'test/modules/*.js',
      'test/fixtures/*.html'
    ],

    // list of files to exclude (for now)
    exclude: [
      /* temporary exclusions */
      'test/modules/payment-tests.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/modules/*.js': ['browserify'],
      'scripts/modules/*.js': ['browserify'],
      'test/fixtures/*.html': ['html2js']
    },

    browserify: {
      debug: true,
      transform: [['babelify', {presets: ['es2015']}]],
      paths: [
        'scripts/modules/',
        'test/modules/',
        '../node_modules/sinon/pkg/'
      ]
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
    // how many browsers should be started simultaneously
    concurrency: Infinity
  });
};
