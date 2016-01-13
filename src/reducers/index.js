'use strict';

const { combineReducers } = require('redux');

const reducers = {
  config: require('./config'),
  template: require('./template')
};

module.exports = combineReducers(reducers);
