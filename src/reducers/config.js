'use strict';

const { assign } = require('lodash');

const { SET_CONFIG } = require('../actions/types');

function configReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CONFIG:
      return assign({}, state, action.settings)
    default:
      return state
  }
}

module.exports = configReducer;
