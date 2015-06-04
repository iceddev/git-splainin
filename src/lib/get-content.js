'use strict';

const client = require('./client');

function getContent(){
  chrome.storage.sync.get('templateUrl', function(res){
    return client(res.templateUrl)
      .then(function(response){
        chrome.storage.sync.set({ prTemplate: response.entity });
      });
  });
}

module.exports = getContent;
