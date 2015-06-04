'use strict';

const React = require('react');
const { createContainer } = require('sovereign');

const Checkbox = require('../primed/checkbox');
const configStore = require('../stores/config-store');
const { setConfig } = require('../actions/config-actions');

class ConfigTab extends React.Component {
  constructor(...args){
    super(...args);
  }
  config(event){
    setConfig(event.target.checked);
  }
  renderError(){
    const { errorMessage } = this.props;

    if(errorMessage){
      return (
        <div className="flash flash-error">
          {errorMessage}
        </div>
       );
    }
  }
  render(){
    const { autoFill } = this.props;

    const note = (
      <span>This will cause every <strong>Pull Request</strong> to be populated automatically.</span>
    );

    return (
      <section className='column'>
        {this.renderError()}
        <dl className='form'>
          <dt>
            <label htmlFor='auto-fill'>Auto-fill:</label>
          </dt>
          <dd>
            <Checkbox id='auto-fill' checked={autoFill} onChange={this.config} note={note}>
              Enable auto-fill
            </Checkbox>
          </dd>
        </dl>
      </section>
    );
  }
}

module.exports = createContainer(ConfigTab, {
  getStores(){
    return {
      config: configStore
    };
  },

  getPropsFromStores(){
    return configStore.getState();
  }
});
