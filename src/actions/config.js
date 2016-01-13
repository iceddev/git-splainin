'use strict';

const { SET_CONFIG } = require('./types');

module.exports = {
  setConfig(settings){
    return {
      type: SET_CONFIG,
      settings
    };
  }
}
