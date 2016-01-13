'use strict';

const thunk = require('redux-thunk');
const { createStore, applyMiddleware } = require('redux');

const reducers = require('./reducers');

const middleware = applyMiddleware(thunk)(createStore);

const store = middleware(reducers);

module.exports = store;
