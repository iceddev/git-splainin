'use strict';

const _ = require('lodash');
const React = require('react');

class Checkbox extends React.Component {

  renderNote(){
    const { note } = this.props;

    if(note){
      return (
        <p className='note'>
          {note}
        </p>
      );
    }
  }

  render(){
    const { children } = this.props;

    const extraProps = _.omit(this.props, ['note', 'children']);

    return (
      <div className='form-checkbox'>
        <label>
          <input type='checkbox' {...extraProps} />
          {children}
        </label>
        {this.renderNote()}
      </div>
    );
  }
}

module.exports = Checkbox;
