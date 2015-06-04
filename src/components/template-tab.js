'use strict';

const React = require('react');
const { createContainer } = require('sovereign');

const Button = require('../primed/button');
const templateStore = require('../stores/template');
const { fetchNewTemplate, submitTemplate } = require('../actions/sync-template');
const { cancelChanges, setDeltaUrl, setDeltaTemplate } = require('../actions/edit-template');

class TemplateTab extends React.Component {
  constructor(...args){
    super(...args);
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
  templateChange(event){
    setDeltaTemplate(event.target.value);
  }
  urlChange(event){
    setDeltaUrl(event.target.value);
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
            <textarea id='template' onChange={this.templateChange} value={deltaTemplate}/>
          </dd>
        </dl>
        <dl className='form'>
          <dt>
            <label htmlFor='url'>Template URL:</label>
          </dt>
          <dd>
            <div className='input-group'>
              <input className='long' id='url' type='text' name='url' onChange={this.urlChange} value={deltaUrl} />
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

module.exports = createContainer(TemplateTab, {
  getStores(){
    return {
      template: templateStore
    };
  },

  getPropsFromStores(){
    return templateStore.getState();
  }
});
