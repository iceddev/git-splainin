'use strict';

const React = require('react');

const getContent = require('../getContent');

const Button = require('../primed/button');

class TemplateTab extends React.Component {
  constructor(...args){
    super(...args);
    this.state = {
      templateUrl: '',
      deltaUrl: ''
    };
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    chrome.storage.sync.get('templateUrl', (res)=>{
      this.setState({
        templateUrl: res.templateUrl,
        deltaUrl: res.templateUrl
      });
    });
  }
  handleUrlChange(){
    this.setState({ deltaUrl: event.target.value });
  }
  handleSubmit(){
    this.setState({
      templateUrl: this.state.deltaUrl
    });

    chrome.storage.sync.set({ templateUrl: this.state.deltaUrl});
    getContent();
  }
  render(){
    const { deltaUrl } = this.state;

    return (
      <div className="four-fifths column">
        <dl className='form'>
          <dt>
            <label htmlFor='template'>Template:</label>
          </dt>
          <dd>
            <textarea id='template' />
          </dd>
        </dl>
        <dl className='form'>
          <dt>
            <label htmlFor='url'>Template URL:</label>
          </dt>
          <dd>
            <div className='input-group'>
              <input className='long' id='url' type='text' name='url' onChange={this.handleUrlChange} value={deltaUrl} />
              <span className='input-group-button'>
                <Button>
                  Load <span className='octicon octicon-cloud-download'></span>
                </Button>
              </span>
            </div>
          </dd>
        </dl>
        <div className="form-actions">
          <Button primary onClick={this.handleSubmit}>Save Changes</Button>
          <Button>Cancel</Button>
        </div>
      </div>
    );
  }
}

module.exports = TemplateTab;
