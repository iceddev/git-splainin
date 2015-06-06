'use strict';

chrome.runtime.onMessage.addListener(function(request){
  const prBodyElement = document.getElementById('pull_request_body');
  if(prBodyElement){
    chrome.storage.sync.get('prTemplate', function({ prTemplate }){
      if(request.fillPR){
        if(!prBodyElement.value.includes(prTemplate)){
          if(prBodyElement.value){
            prBodyElement.value += '\n';
          }
          prBodyElement.value = prBodyElement.value + prTemplate;
        } else {
          prBodyElement.value = prBodyElement.value.replace(prTemplate, '');
        }
      }
      if(request.autoFill){
        if(!prBodyElement.value){
          prBodyElement.value = prTemplate;
        }
      }
      if(request.replaceTemplate){
        prBodyElement.value = prBodyElement.value.replace(request.replaceTemplate, prTemplate);
      }
    });
  }
});
