'use strict';

module.exports = {
  entry: {
    background: './src/background.js',
    options: './src/options.js',
    fillPullBody: './src/fillPullBody.js',
    popup: './src/popup.js'
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
          'babel-loader?optional=runtime'
        ]
      }
    ]
  },
  bail: true
};
