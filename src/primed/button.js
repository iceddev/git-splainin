'use strict';

const React = require('react');
const classnames = require('classnames');

class Button extends React.Component {

  render(){
    const {
      className,
      href,
      small,
      primary,
      danger,
      outline,
      disabled,
      block,
      children
    } = this.props;

    const classes = classnames(className, {
      btn: true,
      'btn-sm': small,
      'btn-primary': primary,
      'btn-danger': danger,
      'btn-outline': outline,
      disabled: (href && disabled),
      'btn-block': block
    });

    if(href){
      return (
        <a href={href} role='button' {...this.props} className={classes}>{children}</a>
      );
    } else {
      return (
        <button type='button' {...this.props} className={classes}>{children}</button>
      );
    }
  }
}

module.exports = Button;
