'use strict';

const _ = require('lodash');
const alt = require('../alt');
const chromeApi = require('chromeback')(chrome);

class configActions {
  configError(err){
    this.dispatch(err);
  }

  fetchConfig(settings){
    chromeApi.storage.sync.get(settings, (err, res)=>{
      if(err){
        this.actions.configError(err);
      } else {
        this.actions.updateConfig(res);
      }
    });
  }

  setConfig(settings){
    chromeApi.storage.sync.set(settings, (err)=>{
      if(err){
        this.actions.setConfigError(err);
      } else {
        this.dispatch(settings);
        if(settings.autoFill){
          chrome.tabs.query({ url: 'https://github.com/*/*' }, function(tabs){
            _.forEach(tabs, function(tab){
              chrome.tabs.sendMessage(tab.id, { fillPR: true });
            });
          });
        }
      }
    });
  }

  updateConfig(config){
    this.dispatch(config);
  }
}

module.exports = alt.createActions(configActions);
