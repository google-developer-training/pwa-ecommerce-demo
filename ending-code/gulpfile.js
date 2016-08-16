(function() {
  'use strict';

  var gulp = require('gulp');

  // required for the clean task
  var del = require('del');

  // required for build task
  var sequence = require('gulp-run-sequence');

  // Imports required for sw-precache
  var path = require('path');
  var swPrecache = require('sw-precache');

  // required for processCSS task
  var sourcemaps = require('gulp-sourcemaps');
  var autoprefixer = require('gulp-autoprefixer');

  // required for lint task
  var eslint = require('gulp-eslint');

  // required for server task
  var browserSync = require('browser-sync').create();

  var paths = {
    src: 'app/',
    dest: 'dist/'
  };

  gulp.task('processCSS', function() {
    return gulp.src(paths.src + 'css/**/*.css')
      .pipe(sourcemaps.init())
      .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
          }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.dest + 'css'));
  });

  gulp.task('serviceWorker', function(callback) {
    swPrecache.write(path.join(paths.dest, 'service-worker.js'), {
      staticFileGlobs: [
        paths.dest + 'index.html',
        paths.dest + 'js/main.js',
        paths.dest + 'js/jquery-1.11.2.min.js',
        paths.dest + 'css/main.css'
      ],

      importScripts: [
         'js/sw-toolbox.js',
         'js/toolbox-scripts.js'
      ],
      stripPrefix: paths.dest
    }, callback);
  });

  gulp.task('copyAssets', function() {
    return gulp.src([
      paths.src + '*.{html,xml,ico,txt,png}'
    ])
    .pipe(gulp.dest(paths.dest));
  });

  gulp.task('copyJS', function() {
    return gulp.src([
      paths.src + 'js/*.js',
      './node_modules/sw-toolbox/sw-toolbox.js'
    ])
    .pipe(gulp.dest(paths.dest + 'js'));
  });

  gulp.task('copyImages', function() {
    return gulp.src(
      paths.src + 'img/*.{svg,png,jpg,gif}'
    )
    .pipe(gulp.dest(paths.dest + 'img'));
  });

  gulp.task('clean', function() {
    return del([paths.dest]);
  });

  gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: paths.dest
          }
      });
  });

  gulp.task('prepare', function(callback) {
    sequence('clean',
      ['copyAssets', 'copyJS', 'copyImages'],
      ['processCSS'],
      'serviceWorker',
      'server',
      callback);
  });

  gulp.task('default', ['prepare']);

})();
