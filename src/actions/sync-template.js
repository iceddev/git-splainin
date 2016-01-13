'use strict';

const { FETCH_NEW_TEMPLATE, SUBMIT_TEMPLATE } = require('./types');

module.exports = {
  fetchNewTemplate(settings){
    return {
      type: FETCH_NEW_TEMPLATE,
      settings
    };
  }

  submitTemplate(){
    return {
      type: SUBMIT_TEMPLATE,
    };
  }
}
