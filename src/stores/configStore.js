'use strict';

const alt = require('../alt');
const getErrorMessage = require('../lib/getErrorMessage');
const actions = require('../actions/configActions');

class configStore {
  constructor(){
    this.autoFill = null;
    this.errorMessage = null;

    this.bindListeners({
      handleConfigUpdate: actions.UPDATE_CONFIG,
      handleConfigError: actions.CONFIG_ERROR,
      handleSetConfig: actions.SET_CONFIG
    });
  }

  handleConfigError(err){
    this.errorMessage = getErrorMessage(err);
  }

  handleConfigUpdate(autoFill){
    this.autoFill = autoFill.autoFill;
  }

  handleSetConfig(autoFill){
    this.autoFill = autoFill.autoFill;
  }
}

module.exports = alt.createStore(configStore, 'configStore');
