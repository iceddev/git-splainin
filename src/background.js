'use strict';

const getContent = require('./lib/getContent');

const chromeApi = require('./lib/chromeBack');

chromeApi.storage.sync.get(['templateUrl', 'prTemplate', 'autoFill'], function(err, {templateUrl, prTemplate, autoFill}){
  if(!prTemplate){
    if(!templateUrl){
      chromeApi.storage.sync.set({
        templateUrl: 'http://cdn.rawgit.com/iceddev/getting-started/master/pr-template.md'
      }, getContent);
    } else {
      getContent();
    }
  }
  if(autoFill === undefined){
    chromeApi.storage.sync.set({ autoFill: false });
  }
});

chromeApi.pageAction.onClicked.addListener(function(){
  chromeApi.tabs.query({ active: true, currentWindow: true }, function(tabs){
    chromeApi.tabs.sendMessage(tabs[0].id, { fillPR: true });
  });
});

chromeApi.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  const regexUrl = /https:\/\/github\.com\/.*\/.*\/compare\/.*/;
  if(tab.url.match(regexUrl)){
    chromeApi.pageAction.show(tabId);
    chromeApi.storage.sync.get('autoFill', function(res){
      if(res.autoFill){
        chromeApi.tabs.sendMessage(tabId, { fillPR: true });
      }
    });
  } else {
    chromeApi.pageAction.hide(tabId);
  }
});
