'use strict';

const alt = require('../alt');

class ConfigActions {
  setConfig(settings){
    this.dispatch(settings);
  }
}

module.exports = alt.createActions(ConfigActions);
