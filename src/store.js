'use strict';

const { combineReducers, createStore } = require('redux');

const reducer = combineReducers(require('./reducers'));

const store = createStore(reducer);

module.exports = store;
