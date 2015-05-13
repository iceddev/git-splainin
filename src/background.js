'use strict';

var rest = require('rest');

chrome.storage.sync.set({
  toggleEnabledState: 'Disable',
  templateUrl: 'https://raw.githubusercontent.com/iceddev/getting-started/master/pr-template.md'
});

function getContent(){
  chrome.storage.sync.get('templateUrl', function(res){
    return rest(res.templateUrl)
      .then(function(response){
        chrome.storage.sync.set({ 'prTemplate': response.prTemplate });
      });
  });
}

getContent();

chrome.extension.onRequest.addListener(function(message){
  if(message === 'showAction'){
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
      chrome.pageAction.show(tabs[0].id);
    });
  }
});


