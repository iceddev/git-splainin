'use strict';

const getContent = require('./getContent');

chrome.storage.sync.set({
  templateUrl: 'https://raw.githubusercontent.com/iceddev/getting-started/master/pr-template.md',
  autoFill: false
});

getContent();

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  const regexUrl = /https:\/\/github\.com\/.*\/.*\/compare\/.*/;
  if(tab.url.match(regexUrl)){
    chrome.pageAction.show(tabId);
    chrome.storage.sync.get('autoFill', function(res){
      if(res.autoFill){
        chrome.tabs.sendMessage(tabId, { fillPR: true });
      }
    });
  }
  else{
    chrome.pageAction.hide(tabId);
  }
});
