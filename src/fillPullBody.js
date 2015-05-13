'use strict';

chrome.runtime.onMessage.addListener(function(request){
  const prBodyElement = document.getElementById('pull_request_body');
  if(request.fillPR && prBodyElement){
    chrome.storage.sync.get('prTemplate', function(item){
      prBodyElement.value = item.prTemplate;
    });
  }
});
