'use strict';

const _ = require('lodash');
const chromeApi = require('chromeback')(chrome);

const alt = require('../alt');
const getErrorMessage = require('../lib/getErrorMessage');
const actions = require('../actions/configActions');

class configStore {
  constructor(){
    this.state = {
      autoFill: null,
      errorMessage: null
    };

    this.bindListeners({
      handleFetchConfig: actions.FETCH_CONFIG,
      handleSetConfig: actions.SET_CONFIG
    });
  }

  handleFetchConfig(settings){
    chromeApi.storage.sync.get(settings, (err, res)=>{
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

configStore.config = {
  stateKey: 'state'
};

module.exports = alt.createStore(configStore, 'configStore');
