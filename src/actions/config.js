'use strict';

const { SET_CONFIG, CONFIG_ERROR } = require('./types');

const chromeApi = require('chromeback')(chrome);
const getErrorMessage = require('../lib/get-error-message');

function setConfig(settings){
  return {
    type: SET_CONFIG,
    settings
  };
}

module.exports = {
  getConfig(){
    return function(dispatch){
      return chromeApi.storage.sync.get('autoFill', (err, { autoFill })=>{
        if(err){
          dispatch ({
            type: SET_CONFIG,
            settings: { configError: getErrorMessage(err) }
          });
        } else {
          dispatch({
            type: SET_CONFIG,
            settings: { autoFill }
          });
        }
      });
    }
  },
  saveConfig(settings){
    return function(dispatch){
      return chromeApi.storage.sync.set(settings, (err)=>{
        if(err){
          dispatch ({
            type: SET_CONFIG,
            settings: { configError: getErrorMessage(err) }
          });
        } else {
          dispatch({
            type: SET_CONFIG,
            settings
          });
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
  }
}
