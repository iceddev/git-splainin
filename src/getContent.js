'use strict';

var rest = require('rest');

function getContent(){
  chrome.storage.sync.get('templateUrl', function(res){
    return rest(res.templateUrl)
      .then(function(response){
        chrome.storage.sync.set({ 'prTemplate': response.entity });
      });
  });
}

module.exports = getContent;
