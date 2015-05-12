'use strict';

var prBodyElement = document.getElementById('pull_request_body');

var enabled = true;

chrome.runtime.onMessage.addListener(function(request){
  enabled = request.enabled;
  if(enabled){
    chrome.storage.local.get('prTemplate', function(item){
      prBodyElement.value = item.prTemplate;
    });
  }
  else{
    prBodyElement.value = '';
  }
});

if(prBodyElement){
  chrome.extension.sendRequest('showAction');
  if(enabled){
    chrome.storage.local.get('prTemplate', function(item){
      prBodyElement.value = item.prTemplate;
    });
  }
}
