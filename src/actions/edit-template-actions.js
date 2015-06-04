'use strict';

const alt = require('../alt');

class EditTemplateActions {
  cancelChanges(){
    this.dispatch();
  }

  setDeltaTemplate(newTemplate){
    this.dispatch(newTemplate);
  }

  setDeltaUrl(newUrl){
    this.dispatch(newUrl);
  }
}

module.exports = alt.createActions(EditTemplateActions);
