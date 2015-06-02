'use strict';

const _ = require('lodash');
const React = require('react');

function connectToStores(Component, opts){

  class StoreWrapper extends React.Component {

    constructor(...args){
      super(...args);

      this.state = opts.getPropsFromStores(this.props);

      this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
      const stores = opts.getStores(this.props);
      _.forEach(stores, (store) => store.listen(this.onChange));
    }

    componentWillUnmount(){
      const stores = opts.getStores(this.props);
      _.forEach(stores, (store) => store.unlisten(this.onChange));
    }

    onChange(){
      this.setState(opts.getPropsFromStores(this.props));
    }

    render(){
      return (
        <Component {...this.props} {...this.state} />
      );
    }
  }

  return StoreWrapper;
}

module.exports = connectToStores;
