'use strict';

const React = require('react');

const style = require('../style/popup.js');

const FillForm = React.createClass({
  handleClick: function(){
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, { fillPR: true });
    });
  },
  render: function(){
    return (<p onClick={this.handleClick} styles={[style.selectable]}>Fill Form</p>);
  }
});

const Options = React.createClass({
  handleClick: function(){
    chrome.runtime.openOptionsPage();
  },
  render: function(){
    return (<p onClick={this.handleClick} styles={[style.selectable]}>Options</p>);
  }
});

const Wrapper = React.createClass({
  render: function(){
    return (
      <div>
        <FillForm />
        <Options />
      </div>
      );
  }
});

React.render(<Wrapper/>, document.getElementById('list'));
