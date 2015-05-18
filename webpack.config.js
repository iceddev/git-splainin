'use strict';

module.exports = {
  entry: {
    background: './src/background.js',
    options: './src/options.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname
  },
  module: {
    loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  }
};
