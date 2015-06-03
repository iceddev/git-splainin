'use strict';

const React = require('react');

const configStore = require('../stores/configStore');
const connectToStore = require('../connect-to-stores.js');
const {
  fetchConfig,
  setConfig
} = require('../actions/configActions');
const Checkbox = require('../primed/checkbox');

class ConfigTab extends React.Component {
  constructor(...args){
    super(...args);
  }
  componentDidMount(){
    fetchConfig('autoFill');
  }
  config(){
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

module.exports = connectToStore(ConfigTab, {
  getStores(){
    return {
      config: configStore
    };
  },

  getPropsFromStores(){
    return configStore.getState();
  }
});
