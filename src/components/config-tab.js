'use strict';

const React = require('react');
const store = require('../stores/configStore');
const actions = require('../actions/configActions');

const Checkbox = require('../primed/checkbox');

class ConfigTab extends React.Component {
  constructor(...args){
    super(...args);
    this.state = {
      autoFill: false,
      errorMessage: ''
    };
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount(){
    store.listen((state)=>{
      this.setState(state);
    });
    actions.fetchConfig('autoFill');
  }
  componentWillUnmount(){
    store.unlisten();
  }
  toggle(){
    actions.setConfig({ autoFill: event.target.checked });
  }
  renderError(){
    if(this.state.errorMessage){
      return (
        <div className="flash flash-error">
          {this.state.errorMessage}
        </div>
       );
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
