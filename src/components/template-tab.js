'use strict';

const React = require('react');
const { connect } = require('react-redux');

const Button = require('../primed/button');
const {
  fetchNewTemplate,
  submitTemplate,
  cancelChanges,
  setDeltaUrl,
  setDeltaTemplate
} = require('../actions');

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
    const { dispatch } = this.props;
    dispatch(setDeltaTemplate(event.target.value));
  }
  urlChange(event){
    const { dispatch } = this.props;
    dispatch(setDeltaUrl(event.target.value));
  }
  submitTemplate(event){
    const { dispatch } = this.props;
    dispatch(submitTemplate(event));
  }
  cancelChanges(event){
    const { dispatch } = this.props;
    dispatch(cancelChanges(event))
  }
  fetchNewTemplate(event){
    const { dispatch } = this.props;
    dispatch(fetchNewTemplate(event));
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
                <Button onClick={this.fetchNewTemplate}>
                  Load <span className='octicon octicon-cloud-download'></span>
                </Button>
              </span>
            </div>
          </dd>
        </dl>
        <div className="form-actions">
          <Button primary onClick={this.submitTemplate} disabled={disableSubmit}>Save Changes</Button>
          <Button onClick={this.cancelChanges} disabled={disableCancel}>Cancel</Button>
        </div>
      </div>
    );
  }
}

function select({ deltaUrl, deltaTemplate, disableSubmit, disableCancel, errorMessage }){
  return {
    deltaUrl,
    deltaTemplate,
    disableSubmit,
    disableCancel,
    errorMessage
  };
}

module.exports = connect(select)(TemplateTab);
