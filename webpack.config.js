'use strict';

var shouldWatch = (process.argv.indexOf('--watch') !== -1);

module.exports = {
  entry: {
    background: './src/background.js',
    options: './src/options.js',
    fillPullBody: './src/fillPullBody.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/
        ],
        loaders: [
          'babel-loader'
        ]
      }
    ]
  },
  bail: true,
  watch: shouldWatch
};
