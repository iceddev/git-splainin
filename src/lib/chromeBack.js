'use strict';

const _ = require('lodash');

function buildApi(newApi, chromeApi){
  // Recursively goes down the chrome Api
  // First we get all the keys for the level we're on
  const keys = _.keysIn(chromeApi);

  _.forEach(keys, function(key){
    // then we loop over them and assign them
    // this first one is just a safety in case of non-objects.
    newApi[key] = chromeApi[key];

    if(_.isObject(chromeApi[key])){
      // If we hit an object we want to go down inside of it
      // Cloning it so we recursively call the function again
      newApi[key] = buildApi({}, chromeApi[key]);
    }

    if(_.isFunction(chromeApi[key])){
      // Aha! A function here the real fun begins
      newApi[key] = function(...args){
        const lastElement = args[args.length - 1];

        if(_.isFunction(lastElement)){
          // If the last element of the arguments array is a function we assume it's a callback and remove it
          const callback = lastElement;
          args.pop();

          chromeApi[key](...args, function(...res){
            // Then we replace it with our own function which handles the error cases
            // and calls the original function like a node style callback
            if(chrome.runtime.lastError){
              return callback(chrome.runtime.lastError);
            } else {
              return callback(null, ...res);
            }
          });
        } else {
          // Callbacks are optional in a lot of cases. If we weren't given one we just call the api normally.
          return chromeApi[key](...args);
        }
      };
    }
  });

  return newApi;
}

const createdApi = buildApi({}, chrome);

module.exports = createdApi;
