'use strict';

var rest = require('rest');
var errorCode = require('rest/interceptor/errorCode');

var client = rest
  .wrap(errorCode);

module.exports = client;
