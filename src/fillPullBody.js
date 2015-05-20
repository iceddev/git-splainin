'use strict';

chrome.runtime.onMessage.addListener(function(request){
  const prBodyElement = document.getElementById('pull_request_body');
  if(request.fillPR && prBodyElement){
    chrome.storage.sync.get('prTemplate', function({ prTemplate }){
      if(!prBodyElement.value.includes(prTemplate)){
        if(prBodyElement.value){
          prBodyElement.value += '\n';
        }
        prBodyElement.value = prBodyElement.value + prTemplate;
      } else if(prBodyElement.value.includes(prTemplate)){
        prBodyElement.value = prBodyElement.value.replace(prTemplate, '');
      }
    });
  }
});
