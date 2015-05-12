'use strict';

var bg = chrome.extension.getBackgroundPage();

function toggle(){
  var toggleEnabled = document.getElementById('disable');
  if(toggleEnabled.innerHTML === 'Disable'){
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
      bg.disable(tabs[0].id);
    });
    bg.toggleState = 'Enable';
    toggleEnabled.innerHTML = 'Enable';
  }
  else{
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
      bg.enable(tabs[0].id);
    });
    bg.toggleState = 'Disable';
    toggleEnabled.innerHTML = 'Disable';
  }
}

document.getElementById('disable').innerHTML = bg.toggleState;
document.getElementById('disable').addEventListener('click', toggle);
document.getElementById('options').addEventListener('click', bg.openOptions);
