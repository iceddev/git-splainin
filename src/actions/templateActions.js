'use strict';

const alt = require('../alt');

class templateActions {
  cancelChanges(){
    this.dispatch();
  }

  fetchNewTemplate(settings){
    this.dispatch(settings);
  }

  fetchStoredTemplate(settings){
    this.dispatch(settings);
  }

  setDeltaTemplate(newTemplate){
    this.dispatch(newTemplate);
  }

  setDeltaUrl(newUrl){
    this.dispatch(newUrl);
  }

  submitTemplate(){
    this.dispatch();
  }
}

module.exports = alt.createActions(templateActions);
