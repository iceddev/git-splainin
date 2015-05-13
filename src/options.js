'use strict';

const getContent = require('./getContent');

const displayUrl = document.getElementById('display_url');
const editUrl = document.getElementById('edit_url');
const url = document.getElementById('template_url');
const urlInput = document.getElementById('url_input');
const autoFill = document.getElementById('auto_fill');

function showEdit(){
  displayUrl.style.display = 'none';
  editUrl.style.display = 'block';
}

function submitUrl(){
  const newUrl = urlInput.value;
  chrome.storage.sync.set({ templateUrl: newUrl });
  getContent();
  url.innerHTML = newUrl;
  url.href = newUrl;
  editUrl.style.display = 'none';
  displayUrl.style.display = 'block';
}

function toggleAutoFill(){
  chrome.storage.sync.set({ autoFill: autoFill.checked });
  if(autoFill.checked){
    chrome.tabs.query({ url: 'https://github.com/*/*' }, function(tabs){
      for(let i = 0; i < tabs.length; i++) {
        chrome.tabs.sendMessage(tabs[i].id, { fillPR: true });
      }
    });
  }
}

chrome.storage.sync.get('templateUrl', function(res){
  urlInput.value = res.templateUrl;
  url.innerHTML = res.templateUrl;
  url.href = res.templateUrl;
});

chrome.storage.sync.get('autoFill', function(res){
  autoFill.checked = res.autoFill;
});

autoFill.addEventListener('click', toggleAutoFill);
document.getElementById('url_edit_action').addEventListener('click', showEdit);
document.getElementById('url_submit_action').addEventListener('click', submitUrl);
