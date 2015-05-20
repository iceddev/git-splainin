'use strict';

var del = require('del');
var gulp = require('gulp');
var jscs = require('gulp-jscs');
var gutil = require('gulp-util');
var webpack = require('webpack');
var eslint = require('gulp-eslint');
var stylish = require('gulp-jscs-stylish');

var webpackConfig = require('./webpack.config');

function noop() {}
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
    .on('error', noop)
    .pipe(stylish());
}

function postInstall(callback){
  del('node_modules/**/*.pem', callback);
}

gulp.task(lint);
gulp.task(postInstall);
gulp.task('default', gulp.parallel(bundle));

