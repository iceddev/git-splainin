'use strict';

function toggle(){
  var toggleEnabled = document.getElementById('disable');
  if(toggleEnabled.innerHTML === 'Disable'){
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, { enabled: false });
    });
    chrome.storage.sync.set({ toggleEnabledState: 'Enable' });
    toggleEnabled.innerHTML = 'Enable';
  }
  else{
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, { enabled: true });
    });
    chrome.storage.sync.set({ toggleEnabledState: 'Disable' });
    toggleEnabled.innerHTML = 'Disable';
  }
}

chrome.storage.sync.get('toggleEnabledState', function(res){
  document.getElementById('disable').innerHTML = res.toggleEnabledState;
});

document.getElementById('disable').addEventListener('click', toggle);
document.getElementById('options').addEventListener('click', chrome.runtime.openOptionsPage);
