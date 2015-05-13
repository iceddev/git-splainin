'use strict';

var prBodyElement = document.getElementById('pull_request_body');

chrome.runtime.onMessage.addListener(function(request){
  if(request.fillPR){
    chrome.storage.sync.get('prTemplate', function(item){
      prBodyElement.value = item.prTemplate;
    });
  }
});

if(prBodyElement){
  chrome.extension.sendRequest('showAction');
  chrome.storage.sync.get('autoFill', function(res){
    if(res.autoFill){
      chrome.storage.sync.get('prTemplate', function(item){
        prBodyElement.value = item.prTemplate;
      });
    }
  });
}
