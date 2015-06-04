'use strict';

const alt = require('../alt');

class SyncTemplateActions {
  fetchNewTemplate(settings){
    this.dispatch(settings);
  }

  submitTemplate(){
    this.dispatch();
  }
}

module.exports = alt.createActions(SyncTemplateActions);
