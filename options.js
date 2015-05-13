'use strict';

var bg = chrome.extension.getBackgroundPage();

function editUrl(){
  document.getElementById('display_url').style.display = 'none';
  document.getElementById('edit_url').style.display = 'block';
}

function submitUrl(){
  var newUrl = document.getElementById('url_input').value;
  bg.templateUrl = newUrl;
  var link = document.getElementById('template_url');
  link.innerHTML = newUrl;
  link.href = newUrl;
  document.getElementById('edit_url').style.display = 'none';
  document.getElementById('display_url').style.display = 'block';
}

document.getElementById('url_input').value = bg.templateUrl;
var url = document.getElementById('template_url');
url.innerHTML = bg.templateUrl;
url.href = bg.templateUrl;

document.getElementById('edit_icon').addEventListener('click', editUrl);
document.getElementById('submit_url').addEventListener('click', submitUrl);
