'use strict';

chrome.runtime.onMessage.addListener(function(request){
  const prBodyElement = document.getElementById('pull_request_body');
  if(request.fillPR && prBodyElement){
    chrome.storage.sync.get('prTemplate', function({ prTemplate }){
      let prBody = prBodyElement.value.replace(prTemplate, '');

      if(prBody){
        prBodyElement.value = prBody + '\n' + prTemplate;
      } else {
        prBodyElement.value = prTemplate;
      }
    });
  }
});
