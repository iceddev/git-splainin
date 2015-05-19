'use strict';

const getContent = require('./getContent');

chrome.storage.sync.get(['templateUrl', 'autoFill'], function({templateUrl, autoFill}){
  if(!templateUrl){
    chrome.storage.sync.set({
      templateUrl: 'http://cdn.rawgit.com/iceddev/getting-started/master/pr-template.md'
    }, getContent);
  } else {
    getContent();
  }
  if(autoFill === undefined){
    chrome.storage.sync.set({ autoFill: false });
  }
});

chrome.pageAction.onClicked.addListener(function(){
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, { fillPR: true });
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  const regexUrl = /https:\/\/github\.com\/.*\/.*\/compare\/.*/;
  if(tab.url.match(regexUrl)){
    chrome.pageAction.show(tabId);
    chrome.storage.sync.get('autoFill', function(res){
      if(res.autoFill){
        chrome.tabs.sendMessage(tabId, { fillPR: true });
      }
    });
  } else {
    chrome.pageAction.hide(tabId);
  }
});
