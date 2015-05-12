'use strict';

function getContent(){
  var url = 'https://raw.githubusercontent.com/iceddev/getting-started/master/pr-template.md';
  var x = new XMLHttpRequest();
  x.open('GET', url);

  x.onload = function(){
    chrome.storage.local.set({ 'prTemplate': x.response});
  };

  x.onerror = function(){
    console.log('noooo', x.response);
  };

  x.send();
}

getContent();

chrome.extension.onRequest.addListener(function(message){
  if(message === 'showAction'){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.pageAction.show(tabs[0].id);
    });
  }
});
