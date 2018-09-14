/**
 *
 *  Web Starter Kit
 *  Copyright 2018 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

// jshint esversion: 6
// jshint strict: global

'use strict';

// This gulpfile makes use of new JavaScript features.
// Babel handles this without us having to do anything. It just works.
// You can read more about the new JavaScript features here:
// https://babeljs.io/docs/learn-es2015/

import path from 'path';
import gulp from 'gulp';
import del from 'del';
import {Server} from 'karma';
import runSequence from 'run-sequence';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import browserSync from 'browser-sync';
import nodemon from 'gulp-nodemon';
import gulpLoadPlugins from 'gulp-load-plugins';
import workboxBuild from 'workbox-build';

const $ = gulpLoadPlugins();
const bs = browserSync.create();

// Inject a precache manifest into the service worker
function buildSw() {
  return workboxBuild.injectManifest({
    swSrc: 'app/sw.js',
    swDest: 'dist/sw.js',
    globDirectory: 'dist',
    globPatterns: [
      'index.html',
      'scripts/main.min.js',
      'styles/main.css',
      'images/*',
      'images/touch/*'
    ]
  }).catch(err => {
    console.log('Uh oh 😬', err);
  });
}

gulp.task('buildSw', buildSw);

// Optimize images
function images() {
  return gulp.src('app/images/**/*')
    .pipe($.imagemin({ // DEBUG removed $.cache( before imagemin
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({title: 'images'}));
}

function thirdPartyImages() {
  return gulp.src('../third_party/images/**/*')
    .pipe($.imagemin({ // DEBUG removed $.cache( before imagemin
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({title: 'product images'}));
}

gulp.task('images', gulp.parallel(images, thirdPartyImages));

// Copy all files at the root level (app)
function copy() {
  return gulp.src([
    'app/*',
    '!app/*.html',
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'))
    .pipe($.size({title: 'copy'}));
}

gulp.task('copy', copy);

// Compile and automatically prefix stylesheets
function styles() {
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
    'app/styles/**/*.scss',
    'app/styles/**/*.css'
  ])
    .pipe($.newer('.tmp/styles'))
    .pipe($.sourcemaps.init())
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp/styles'))
    // Concatenate and minify styles
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.size({title: 'styles'}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('dist/styles'));
}

gulp.task('styles', styles);

function scripts() {
  return browserify([
    './app/scripts/main.js'
  ], {debug: true, paths: ['app/scripts/modules/']})
    .transform(babelify, {presets: ['env']})
    .bundle()
    .pipe(source('main.min.js'))
    .on('error', err => {
      console.log('ERROR:', err.message);
    })
    .pipe(gulp.dest('dist/scripts/'));
}

gulp.task('scripts', scripts);

// Scan your HTML for assets & optimize them
function html() {
  return gulp.src('app/**/*.html')
    .pipe($.useref({
      searchPath: '{.tmp,app}',
      noAssets: true
    }))

    // Output files
    .pipe($.if('*.html', $.size({title: 'html', showFiles: true})))
    .pipe(gulp.dest('dist'));
}

gulp.task('html', html);

// Clean output directory
gulp.task('clean', () => del(['.tmp', 'dist/*', '!dist/.git'], {dot: true}));

// Run unit tests
function test(done) {
  return new Server({
    configFile: path.join(__dirname, '/test-all.conf.js'),
    singleRun: true
  }, done).start();
}

gulp.task('test', test);

function nodeMon(cb) {
  let started = false;
  return nodemon({
    script: './server.js',
    watch: ['app/**/*.js'],
    tasks: 'default'
  }).on('start', () => {
    if (!started) {
      cb();
      started = true;
    }
  }).on('restart', () => {
    bs.reload();
  });
}

// browserSync
function serve() {
  return bs.init({
    proxy: 'http://localhost:8081',
    port: '8080',
    open: false
  });
}

// Build production files, the default task
gulp.task('default',
  gulp.series(
    'clean',
    styles,
    gulp.parallel(html, scripts, 'images', copy),
    buildSw
  )
);

gulp.task('nodemon', gulp.series('default', nodeMon));
gulp.task('serve', gulp.series('nodemon', serve));
