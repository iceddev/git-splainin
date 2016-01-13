'use strict';

const React = require('react');
const { connect } = require('react-redux');

const { saveConfig, getConfig } = require('../actions');
const Checkbox = require('../primed/checkbox');

class ConfigTab extends React.Component {
  constructor(...args){
    super(...args);
  }
  config(event){
    const { dispatch } = this.props;
    dispatch(saveConfig({ autoFill: event.target.checked }));
  }
  renderError(){
    const { configError } = this.props;

    if(configError){
      return (
        <div className="flash flash-error">
          {configError}
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

function select({ config }){
  return {
    config
  };
}

module.exports = connect(select)(ConfigTab);
