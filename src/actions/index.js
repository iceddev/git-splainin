'use strict';

const types = require('./types');
const config = require('./config');
const editTemplate = require('./edit-template');
const syncTemplate = require('./sync-template');

module.exports = {
  ...types,
  ...config,
  ...editTemplate,
  ...syncTemplate
};
