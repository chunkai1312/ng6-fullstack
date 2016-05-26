'use strict';

const path = require('path');
const fs = require('fs');
const _ = require('lodash');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 4000,
  ip: process.env.IP || '0.0.0.0',
  root: path.normalize(__dirname + '/../..'),
  serverPath: path.normalize(__dirname + '/..'),
};

module.exports = _.merge(config, require('./env/' + process.env.NODE_ENV));
