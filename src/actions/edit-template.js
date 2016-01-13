'use strict';

const { CANCEL_CHANGES, SET_DELTA_TEMPLATE, SET_DELTA_URL } = require('./types');

module.exports = {
  cancelChanges(){
    return {
      type: CANCEL_CHANGES,
    };
  }

  setDeltaTemplate(deltaTemplate){
    return {
      type: SET_DELTA_TEMPLATE,
      deltaTemplate
    };
  }

  setDeltaUrl(deltaUrl){
    return {
      type: SET_DELTA_URL,
      deltaUrl
    };
  }
}
