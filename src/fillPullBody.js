'use strict';

chrome.runtime.onMessage.addListener(function(request){
  const prBodyElement = document.getElementById('pull_request_body');
  if(request.fillPR && prBodyElement){
    chrome.storage.sync.get('prTemplate', function(item){
      if(prBodyElement.value){
        prBodyElement.value += '\n' + item.prTemplate;
      } else {
        prBodyElement.value = item.prTemplate;
      }
    });
  }
});
