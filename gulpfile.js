'use strict';

var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');

var webpackConfig = require('./webpack.config');

function bundle(callback){
  webpack(webpackConfig, function(err){
    gutil.log('Webpack bundle complete!');
    callback(err);
  });
}

function postInstall(callback){
  del('node_modules/**/*.pem', callback);
}

gulp.task(postInstall);
gulp.task('default', gulp.parallel(bundle));
