'use strict';

var rest = require('rest');

function getContent(){
  var url = 'https://raw.githubusercontent.com/iceddev/getting-started/master/pr-template.md';

  return rest(url)
    .then(function(response){
      chrome.storage.local.set({ 'prTemplate': response.entity });
    });
}

getContent();

chrome.extension.onRequest.addListener(function(message){
  if(message === 'showAction'){
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
      chrome.pageAction.show(tabs[0].id);
    });
  }
});
