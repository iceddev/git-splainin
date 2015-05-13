'use strict';

function openOptions(){
  chrome.runtime.openOptionsPage();
}

function fillPR(){
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, { fillPR: true });
  });
}

document.getElementById('fill_PR').addEventListener('click', fillPR);
document.getElementById('options').addEventListener('click', openOptions);
