'use strict';

const del = require('del');
const gulp = require('gulp');
const zip = require('gulp-zip');
const jscs = require('gulp-jscs');
const gutil = require('gulp-util');
const webpack = require('webpack');
const eslint = require('gulp-eslint');

const webpackConfig = require('./webpack.config');

const files = {
  release: [
    'manifest.json',
    'options.js',
    'fill-pull-body.js',
    'background.js',
    'html/**',
    'img/**',
    'style/**',
    'vendor/**'
  ]
};

function bundle(callback){
  webpack(webpackConfig, function(err){
    gutil.log('Webpack bundle complete!');
    callback(err);
  });
}

function lint(){
  return gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(jscs())
    .pipe(eslint.failAfterError());
}

function postinstall(callback){
  del('node_modules/**/*.pem', callback);
}

function release(){
  return gulp.src(files.release, { base: __dirname })
    .pipe(zip('git-splainin.zip'))
    .pipe(gulp.dest('dist'));
}

gulp.task(lint);
gulp.task(postinstall);
gulp.task('release', gulp.series(bundle, release));
gulp.task('default', gulp.parallel(bundle));

