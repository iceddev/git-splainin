'use strict';

const _ = require('lodash');
const React = require('react');

const Checkbox = require('../primed/checkbox');

class ConfigTab extends React.Component {
  constructor(...args){
    super(...args);
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
    const { autoFill } = this.state;

    const note = (
      <span>This will cause every <strong>Pull Request</strong> to be populated automatically.</span>
    );

    return (
      <section className='column'>
        <dl className='form'>
          <dt>
            <label htmlFor='auto-fill'>Auto-fill:</label>
          </dt>
          <dd>
            <Checkbox id='auto-fill' checked={autoFill} onChange={this.toggle} note={note}>
              Enable auto-fill
            </Checkbox>
          </dd>
        </dl>
      </section>
    );
  }
}

module.exports = ConfigTab;
