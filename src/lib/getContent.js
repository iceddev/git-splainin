'use strict';

const client = require('./client');
const chromeApi = require('../chromed/');

function getContent(){
  chromeApi.storage.sync.get('templateUrl', function(res){
    return client(res.templateUrl)
      .then(function(response){
        chromeApi.storage.sync.set({ prTemplate: response.entity });
      });
  });
}

module.exports = getContent;
