'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');

var webpackConfig = require('./webpack.config');

function bundle(callback){
  webpack(webpackConfig, function(err){
    gutil.log('Webpack bundle complete!');
    callback(err);
  });
};

gulp.task('default', gulp.parallel(bundle));
