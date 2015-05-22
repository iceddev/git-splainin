'use strict';

const _ = require('lodash');
const React = require('react');

const client = require('../lib/client');
const Button = require('../primed/button');
const chromeApi = require('chromeback');
const getErrorMessage = require('../lib/getErrorMessage');

class TemplateTab extends React.Component {
  constructor(...args){
    super(...args);
    this.state = {
      templateUrl: '',
      deltaUrl: '',
      prTemplate: '',
      deltaTemplate: '',
      disableCancel: true,
      disableSubmit: true,
      errorMessage: ''
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTemplateChange = this.handleTemplateChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
  }
  componentDidMount(){
    chromeApi.storage.sync.get(['templateUrl', 'prTemplate'], (err, res)=>{
      if(err){
        this.handleError(err);
      } else {
        this.setState({
          templateUrl: res.templateUrl,
          deltaUrl: res.templateUrl,
          prTemplate: res.prTemplate,
          deltaTemplate: res.prTemplate
        });
      }
    });
  }
  handleCancel(){
    this.setState({
      deltaUrl: this.state.templateUrl,
      deltaTemplate: this.state.prTemplate,
      disableCancel: true,
      disableSubmit: true,
      errorMessage: ''
    });
  }
  handleError(err){
    const errorMessage = getErrorMessage(err);

    this.setState({
      errorMessage: errorMessage
    });
  }
  handleLoad(){
    const { deltaUrl, prTemplate, templateUrl } = this.state;

    client(deltaUrl)
      .then((response)=>{
        this.setState({
          deltaTemplate: response.entity,
          errorMessage: ''
        });
        if(response.entity === prTemplate){
          this.setState({ disableSubmit: true });
          if(this.state.deltaUrl === templateUrl){
            this.setState({ disableCancel: true });
          }
        } else {
          this.setState({ disableSubmit: false });
        }
      })
      .otherwise((err)=>{
        this.handleError(err);
      });
  }
  handleUrlChange(){
    this.setState({
      deltaUrl: event.target.value
    });

    if(event.target.value !== this.state.templateUrl){
      this.setState({
        disableCancel: false
      });
    }
  }
  handleSubmit(){
    const { deltaUrl, deltaTemplate, prTemplate } = this.state;

    this.setState({
      templateUrl: deltaUrl,
      prTemplate: deltaTemplate,
      disableCancel: true,
      disableSubmit: true,
      errorMessage: ''
    });

    chromeApi.storage.sync.set({
      prTemplate: deltaTemplate,
      templateUrl: deltaUrl
    }, (err)=>{
      if(err){
        this.handleError(err);
      } else {
        chromeApi.tabs.query({ url: 'https://github.com/*/*' }, function(tabs){
          // If the message doesn't go to the tabs we silently error
          _.forEach(tabs, function(tab){
            chromeApi.tabs.sendMessage(tab.id, { replaceTemplate: prTemplate });
          });
        });
      }
    });
  }
  handleTemplateChange(){
    this.setState({
      deltaTemplate: event.target.value,
      disableCancel: false,
      disableSubmit: false
    });
  }
  renderError(){
    if(this.state.errorMessage){
      return (
        <div className="flash flash-error">
          {this.state.errorMessage}
        </div>
       );
    }
  }
  render(){
    const { deltaUrl, deltaTemplate } = this.state;

    return (
      <div className="four-fifths column">
        {this.renderError()}
        <dl className='form'>
          <dt>
            <label htmlFor='template'>Template:</label>
          </dt>
          <dd>
            <textarea id='template' onChange={this.handleTemplateChange} value={deltaTemplate}/>
          </dd>
        </dl>
        <dl className='form'>
          <dt>
            <label htmlFor='url'>Template URL:</label>
          </dt>
          <dd>
            <div className='input-group'>
              <input className='long' id='url' type='text' name='url' onChange={this.handleUrlChange} value={deltaUrl} />
              <span className='input-group-button'>
                <Button onClick={this.handleLoad}>
                  Load <span className='octicon octicon-cloud-download'></span>
                </Button>
              </span>
            </div>
          </dd>
        </dl>
        <div className="form-actions">
          <Button primary onClick={this.handleSubmit} disabled={this.state.disableSubmit}>Save Changes</Button>
          <Button onClick={this.handleCancel} disabled={this.state.disableCancel}>Cancel</Button>
        </div>
      </div>
    );
  }
}

module.exports = TemplateTab;
