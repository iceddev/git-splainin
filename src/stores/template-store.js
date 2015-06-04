'use strict';

const _ = require('lodash');
const chromeApi = require('chromeback')(chrome);

const alt = require('../alt');
const client = require('../lib/client');
const getErrorMessage = require('../lib/get-error-message');
const { fetchNewTemplate, submitTemplate } = require('../actions/sync-template-actions');
const { cancelChanges, setDeltaTemplate, setDeltaUrl } = require('../actions/edit-template-actions');

class TemplateStore {
  constructor(){
    this.state = {
      prTemplate: null,
      templateUrl: null,
      errorMessage: null,
      deltaUrl: null,
      deltaTemplate: null,
      disableCancel: true,
      disableSubmit: true
    };

    this.bindListeners({
      handleCancelChanges: cancelChanges,
      handleFetchNewTemplate: fetchNewTemplate,
      handleSetDeltaTemplate: setDeltaTemplate,
      handleSetDeltaUrl: setDeltaUrl,
      handleSubmitTemplate: submitTemplate
    });

    chromeApi.storage.sync.get(['templateUrl', 'prTemplate'], (err, res)=>{
      if(err){
        this.setState({ errorMessage: getErrorMessage(err) });
      } else {
        this.setState({
          prTemplate: res.prTemplate,
          templateUrl: res.templateUrl,
          deltaUrl: res.templateUrl,
          deltaTemplate: res.prTemplate
        });
      }
    });
  }

  handleCancelChanges(){
    this.setState({
      deltaUrl: this.state.templateUrl,
      deltaTemplate: this.state.prTemplate,
      disableCancel: true,
      disableSubmit: true,
      errorMessage: ''
    });
  }

  handleFetchNewTemplate(){
    const { deltaUrl, prTemplate, templateUrl } = this.state;
    client(deltaUrl)
      .then(({ entity })=>{
        this.setState({
          deltaTemplate: entity,
          errorMessage: ''
        });
        if(entity === prTemplate){
          this.setState({ disableSubmit: true });
          if(deltaUrl === templateUrl){
            this.setState({ disableCancel: true });
          }
        } else {
          this.setState({
            disableSubmit: false,
            disableCancel: false
          });
        }
      })
      .otherwise((err)=>{
        this.setState({
          errorMessage: getErrorMessage(err),
          disableSubmit: true
        });
      });
  }

  handleSetDeltaTemplate(newTemplate){
    this.setState({
      deltaTemplate: newTemplate,
      disableSubmit: false,
      disableCancel: false
    });
  }

  handleSetDeltaUrl(newUrl){
    this.setState({ deltaUrl: newUrl });
    if(newUrl !== this.state.templateUrl){
      this.setState({ disableCancel: false });
    }
  }

  handleSubmitTemplate(){
    const { deltaUrl, deltaTemplate, prTemplate } = this.state;
    chromeApi.storage.sync.set({
      prTemplate: deltaTemplate,
      templateUrl: deltaUrl
    }, (err)=>{
      if(err){
        this.setState({ errorMessage: getErrorMessage(err) });
      } else {
        chromeApi.tabs.query({ url: 'https://github.com/*/*' }, function(tabs){
          // If the message doesn't go to the tabs we silently error
          _.forEach(tabs, function(tab){
            chromeApi.tabs.sendMessage(tab.id, { replaceTemplate: prTemplate });
          });
        });
        this.setState({
          templateUrl: deltaUrl,
          prTemplate: deltaTemplate,
          disableCancel: true,
          disableSubmit: true,
          errorMessage: ''
        });
      }
    });
  }
}

TemplateStore.config = {
  stateKey: 'state'
};

module.exports = alt.createStore(TemplateStore);
