'use strict';

var React = require('react');
var style = require('./style/popup.js');

var FillForm = React.createClass({
  handleClick: function(){
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, { fillPR: true });
    });
  },
  render: function(){
    return (<p onClick={this.handleClick}>'Fill Form'</p>);
  }
});

var Options = React.createClass({
  handleClick: function(){
    chrome.runtime.openOptionsPage();
  },
  render: function(){
    return (<p onClick={this.handleClick}>'Options'</p>);
  }
});

var list = (
  <FillForm style.selectable />
  <Options style.selectable />
);

React.render(list, document.getElementById('options'));
