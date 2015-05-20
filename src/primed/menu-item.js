'use strict';

const React = require('react');
const classnames = require('classnames');

class MenuItem extends React.Component {

  render(){
    const {
      className,
      href,
      selected,
      children
    } = this.props;

    const classes = classnames(className, {
      'menu-item': true,
      selected: selected
    });

    return (
      <a href={href} {...this.props} className={classes}>{children}</a>
    );
  }
}

module.exports = MenuItem;
