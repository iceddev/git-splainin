'use strict';

const React = require('react');
const { Provider } = require('react-redux');

const store = require('./store');
const Layout = require('./components/layout');

React.render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.getElementById('root')
);
