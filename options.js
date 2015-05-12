'use strict';

var bg = chrome.extension.getBackgroundPage();

function submitUrl(){
  var newUrl = document.getElementById('url_field').value;
  bg.templateUrl = newUrl;
  var urlHTML = '<a href="' + newUrl + '">' + newUrl + '</a>';
  document.getElementById('template_field').innerHTML = urlHTML;
}

function editUrl(){
  var urlField = '<input id="url_field" type="text" name="url"><input id="submit_url" type="submit" value="Submit">';
  document.getElementById('template_field').innerHTML = urlField;
  document.getElementById('submit_url').addEventListener('click', submitUrl);
}

var url = document.getElementById('template_url');
url.innerHTML = bg.templateUrl;
url.href = bg.templateUrl;

document.getElementById('edit_icon').addEventListener('click', editUrl);
