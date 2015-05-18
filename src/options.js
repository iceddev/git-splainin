'use strict';

const _ = require('lodash');
const React = require('react');

const getContent = require('./getContent');
const style = require('../style/options.js');

const EditUrl = React.createClass({
  getInitialState: function(){
    return {
      templateUrl: '',
      deltaUrl: '',
      displayUrl: 'block',
      editUrl: 'none'
    };
  },
  handleUrlChange: function(){
    this.setState({ deltaUrl: event.target.value });
  },
  handleEdit: function(){
    this.setState({ displayUrl: 'none' });
    this.setState({ editUrl: 'block' });
  },
  handleSubmit: function(){
    this.setState({ displayUrl: 'block' });
    this.setState({ editUrl: 'none' });
    this.setState({ templateUrl: this.state.deltaUrl });
    chrome.storage.sync.set({ templateUrl: this.state.deltaUrl});
    getContent();
  },
  render: function(){
    let url = this.state.templateUrl;
    return (
      <section styles={[style.options_list]}>
        <h2>Template URL:</h2>
        <p styles={[{display: this.state.displayUrl}]}>
          <a href={this.state.templateUrl}>{url}</a>
          <img src='../img/edit.png' onClick={this.handleEdit} styles={[style.selectable, style.edit_icon]}></img>
        </p>
        <p styles={[{display: this.state.editUrl}]}>
          <input type='text' name='url' onChange={this.handleUrlChange}></input>
          <input type='submit' value='Save' onClick={this.handleSubmit}></input>
        </p>
      </section>
    );
  }
});

const EditAutoFill = React.createClass({
  getInitialState: function(){
    let initialAutoFill;
    chrome.storage.sync.get('autoFill', function(res){
      initialAutoFill = res.autoFill;
    });
    return { autoFill: initialAutoFill };
  },
  toggle: function(){
    this.setState({ autoFill: event.target.checked });
    chrome.storage.sync.set({ autoFill: event.target.checked });
    if(event.target.checked){
      chrome.tabs.query({ url: 'https://github.com/*/*' }, function(tabs){
        _.forEach(tabs, function(tab){
          chrome.tabs.sendMessage(tab.id, { fillPR: true });
        });
      });
    }
  },
  render: function(){
    return (
      <section styles={[style.options_list]}>
        <h2>Auto-fill:</h2>
        <input type={"checkbox"} checked={this.state.autoFill} onChange={this.toggle}>Enable auto-fill</input>
      </section>
    );
  }
});

const Wrapper = React.createClass({
  render: function(){
    return (
      <main styles={[style.options_menu]}>
        <h1>Git-Splainin Options</h1>
        <EditUrl />
        <EditAutoFill />
      </main>
    );
  }
});

React.render(<Wrapper/>, document.getElementById('list'));
