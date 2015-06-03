'use strict';

const alt = require('../alt');

class configActions {
  fetchConfig(settings){
    this.dispatch(settings);
  }

  setConfig(settings){
    this.dispatch(settings);
  }
}

module.exports = alt.createActions(configActions);
