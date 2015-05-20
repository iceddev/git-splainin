'use strict';

const React = require('react');
const classnames = require('classnames');

const MenuItem = require('./menu-item');

class Menu extends React.Component {

  render(){
    const {
      className,
      selected,
      children
    } = this.props;

    const classes = classnames(className, {
      menu: true
    });

    const menuItems = React.Children.map(children, function(child, idx){
      if(selected == null){
        return child;
      }

      if(child.type !== MenuItem){
        return child;
      }

      return React.cloneElement(child, {
        selected: (idx === selected)
      });
    });

    return (
      <nav className={classes}>
        {menuItems}
      </nav>
    );
  }
}

module.exports = Menu;
