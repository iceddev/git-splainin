'use strict';

var getContent = require('./getContent');

chrome.storage.sync.set({
  templateUrl: 'https://raw.githubusercontent.com/iceddev/getting-started/master/pr-template.md',
  autoFill: false
});

getContent();

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  var regexUrl = /https:\/\/github\.com\/.*\/.*\/compare\/.*/;

  if(tab.url.match(regexUrl)){
    chrome.pageAction.show(tabId);
  }
  else{
    chrome.pageAction.hide(tabId);
  }
});
