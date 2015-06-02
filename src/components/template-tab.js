'use strict';

const React = require('react');

const Button = require('../primed/button');
const templateStore = require('../stores/templateStore');
const connectToStore = require('../connect-to-stores.js');
const {
  fetchStoredTemplate,
  cancelChanges,
  fetchNewTemplate,
  setDeltaUrl,
  submitTemplate,
  setDeltaTemplate
} = require('../actions/templateActions');

class TemplateTab extends React.Component {
  constructor(...args){
    super(...args);
  }
  componentDidMount(){
    fetchStoredTemplate(['templateUrl', 'prTemplate']);
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
    const { deltaUrl, deltaTemplate, disableSubmit, disableCancel } = this.props;

    return (
      <div className="four-fifths column">
        {this.renderError()}
        <dl className='form'>
          <dt>
            <label htmlFor='template'>Template:</label>
          </dt>
          <dd>
            <textarea id='template' onChange={setDeltaTemplate} value={deltaTemplate}/>
          </dd>
        </dl>
        <dl className='form'>
          <dt>
            <label htmlFor='url'>Template URL:</label>
          </dt>
          <dd>
            <div className='input-group'>
              <input className='long' id='url' type='text' name='url' onChange={setDeltaUrl} value={deltaUrl} />
              <span className='input-group-button'>
                <Button onClick={fetchNewTemplate}>
                  Load <span className='octicon octicon-cloud-download'></span>
                </Button>
              </span>
            </div>
          </dd>
        </dl>
        <div className="form-actions">
          <Button primary onClick={submitTemplate} disabled={disableSubmit}>Save Changes</Button>
          <Button onClick={cancelChanges} disabled={disableCancel}>Cancel</Button>
        </div>
      </div>
    );
  }
}

module.exports = connectToStore(TemplateTab, {
  getStores(){
    return {
      template: templateStore
    };
  },

  getPropsFromStores(){
    return templateStore.getState();
  }
});
