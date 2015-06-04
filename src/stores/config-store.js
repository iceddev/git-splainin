'use strict';

const _ = require('lodash');
const chromeApi = require('chromeback')(chrome);

const alt = require('../alt');
const getErrorMessage = require('../lib/get-error-message');
const { setConfig } = require('../actions/config-actions');

class ConfigStore {
  constructor(){
    this.state = {
      autoFill: null,
      errorMessage: null
    };

    this.bindListeners({
      handleSetConfig: setConfig
    });

    chromeApi.storage.sync.get('autoFill', (err, res)=>{
      if(err){
        this.setState({ errorMessage: getErrorMessage(err) });
      } else {
        this.setState({ autoFill: res.autoFill });
      }
    });
  }

  handleSetConfig(settings){
    chromeApi.storage.sync.set({ autoFill: settings }, (err)=>{
      if(err){
        this.setState({ errorMessage: getErrorMessage(err) });
      } else {
        this.setState({ autoFill: settings });
        if(settings){
          chrome.tabs.query({ url: 'https://github.com/*/*' }, function(tabs){
            _.forEach(tabs, function(tab){
              chrome.tabs.sendMessage(tab.id, { fillPR: true });
            });
          });
        }
      }
    });
  }
}

ConfigStore.config = {
  stateKey: 'state'
};

module.exports = alt.createStore(ConfigStore);
