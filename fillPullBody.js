var prBodyElement = document.getElementById("pull_request_body");

if(prBodyElement){
  chrome.storage.local.get('prTemplate', function(item){
    prBodyElement.value = item.prTemplate;
  });
}
