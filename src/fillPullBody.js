'use strict';

var prBodyElement = document.getElementById('pull_request_body');

chrome.runtime.onMessage.addListener(function(request){
  chrome.storage.sync.set({ enabled: request.enabled });
  if(request.enabled){
    chrome.storage.sync.get('prTemplate', function(item){
      prBodyElement.value = item.prTemplate;
    });
  }
  else{
    prBodyElement.value = '';
  }
});

if(prBodyElement){
  chrome.extension.sendRequest('showAction');
  chrome.storage.sync.get('enabled', function(res){
    if(res.enabled){
      chrome.storage.sync.get('prTemplate', function(item){
        prBodyElement.value = item.prTemplate;
      });
    }
  });
}
