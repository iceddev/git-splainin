'use strict';

const _ = require('lodash');
const rest = require('rest');
const React = require('react');

const Button = require('../primed/button');

class TemplateTab extends React.Component {
  constructor(...args){
    super(...args);
    this.state = {
      templateUrl: '',
      deltaUrl: '',
      prTemplate: '',
      deltaTemplate: '',
      disableCancel: true,
      disableSubmit: true
    };
    this.handleTemplateChange = this.handleTemplateChange.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    chrome.storage.sync.get(['templateUrl', 'prTemplate'], (res)=>{
      this.setState({
        templateUrl: res.templateUrl,
        deltaUrl: res.templateUrl,
        prTemplate: res.prTemplate,
        deltaTemplate: res.prTemplate
      });
    });
  }
  handleTemplateChange(){
    this.setState({
      deltaTemplate: event.target.value,
      disableCancel: false,
      disableSubmit: false
    });
  }
  handleLoad(){
    rest(this.state.deltaUrl)
      .then((response)=>{
        this.setState({
          deltaTemplate: response.entity
        });
        if(response.entity === this.state.prTemplate){
          this.setState({ disableSubmit: true });
          if(this.state.deltaUrl === this.state.templateUrl){
            this.setState({ disableCancel: true });
          }
        } else {
          this.setState({ disableSubmit: false });
        }
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
  handleCancel(){
    this.setState({
      deltaUrl: this.state.templateUrl,
      deltaTemplate: this.state.prTemplate,
      disableCancel: true,
      disableSubmit: true
    });
  }
  handleSubmit(){
    const { deltaUrl, deltaTemplate, prTemplate } = this.state;

    this.setState({
      templateUrl: deltaUrl,
      prTemplate: deltaTemplate,
      disableCancel: true,
      disableSubmit: true
    });

    chrome.storage.sync.set({
      prTemplate: deltaTemplate,
      templateUrl: deltaUrl
    }, function(){
      chrome.tabs.query({ url: 'https://github.com/*/*' }, function(tabs){
        _.forEach(tabs, function(tab){
          chrome.tabs.sendMessage(tab.id, { replaceTemplate: prTemplate });
        });
      });
    });
  }
  render(){
    const { deltaUrl, deltaTemplate } = this.state;

    return (
      <div className="four-fifths column">
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
