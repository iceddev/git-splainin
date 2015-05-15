'use strict';

var getContent = require('./getContent');

chrome.storage.sync.set({
  toggleEnabledState: 'Disable',
  templateUrl: 'https://raw.githubusercontent.com/iceddev/getting-started/master/pr-template.md',
  enabled: true
});

getContent();

chrome.extension.onRequest.addListener(function(message){
  if(message === 'showAction'){
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
      chrome.pageAction.show(tabs[0].id);
    });
  }
});


