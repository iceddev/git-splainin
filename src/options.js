'use strict';

var getContent = require('./getContent');

var displayUrl = document.getElementById('display_url');
var editUrl = document.getElementById('edit_url');
var url = document.getElementById('template_url');
var urlInput = document.getElementById('url_input');

function showEdit(){
  displayUrl.style.display = 'none';
  editUrl.style.display = 'block';
}

function submitUrl(){
  var newUrl = urlInput.value;
  chrome.storage.sync.set({ templateUrl: newUrl });
  getContent();
  url.innerHTML = newUrl;
  url.href = newUrl;
  editUrl.style.display = 'none';
  displayUrl.style.display = 'block';
}

chrome.storage.sync.get('templateUrl', function(res){
  urlInput.value = res.templateUrl;
  url.innerHTML = res.templateUrl;
  url.href = res.templateUrl;
});

document.getElementById('url_edit_action').addEventListener('click', showEdit);
document.getElementById('url_submit_action').addEventListener('click', submitUrl);
