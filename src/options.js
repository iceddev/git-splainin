'use strict';

const _ = require('lodash');
const React = require('react');

const getContent = require('./getContent');

class EditUrl extends React.Component {
  constructor(){
    super();
    this.state = {
      templateUrl: '',
      deltaUrl: '',
      displayUrl: 'block',
      editUrl: 'none'
    };
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    chrome.storage.sync.get('templateUrl', (res)=>{
      this.setState({
        templateUrl: res.templateUrl,
        deltaUrl: res.templateUrl
      });
    });
  }
  handleUrlChange(){
    this.setState({ deltaUrl: event.target.value });
  }
  handleEdit(){
    this.setState({
      displayUrl: 'none',
      editUrl: 'block'
    });
  }
  handleSubmit(){
    this.setState({
      displayUrl: 'block',
      editUrl: 'none',
      templateUrl: this.state.deltaUrl
    });

    chrome.storage.sync.set({ templateUrl: this.state.deltaUrl});
    getContent();
  }
  render(){
    return (
      <section className='columns'>
        <h2>Template URL:</h2>
        <p style={{display: this.state.displayUrl}}>
          <a href={this.state.templateUrl}>{this.state.templateUrl}</a>
          <img src='../img/edit.png' className='url_edit_action' onClick={this.handleEdit}></img>
        </p>
        <p style={{display: this.state.editUrl}}>
          <input type='text' name='url' onChange={this.handleUrlChange} value={this.state.deltaUrl}></input>
          <button type='submit' className='btn url_submit_action' onClick={this.handleSubmit}>Save</button>
        </p>
      </section>
    );
  }
}

class EditAutoFill extends React.Component {
  constructor(){
    super();
    this.state = { autoFill: false };
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount(){
    chrome.storage.sync.get('autoFill', (res)=>{
      this.setState({ autoFill: res.autoFill });
    });
  }
  toggle(){
    this.setState({ autoFill: event.target.checked });
    chrome.storage.sync.set({ autoFill: event.target.checked });
    if(event.target.checked){
      chrome.tabs.query({ url: 'https://github.com/*/*' }, function(tabs){
        _.forEach(tabs, function(tab){
          chrome.tabs.sendMessage(tab.id, { fillPR: true });
        });
      });
    }
  }
  render(){
    let { autoFill } = this.state;
    return (
      <section className='columns'>
        <h2>Auto-fill:</h2>
        <input type="checkbox" checked={autoFill} onChange={this.toggle}>Enable auto-fill</input>
      </section>
    );
  }
}

class Wrapper extends React.Component {
  render(){
    return (
      <main>
        <h1>Git-Splainin Options</h1>
        <EditUrl />
        <EditAutoFill />
      </main>
    );
  }
}

React.render(<Wrapper />, document.getElementById('list'));
