'use strict';

const path = require('path');

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4321,
  ip: process.env.IP || '127.0.0.1',
  root: path.normalize(`${__dirname}/../../..`),
  srcPath: path.normalize(`${__dirname}/../..`),
  serverPath: path.normalize(`${__dirname}/..`),

  devServer: {
    port: 4000,
    ip: '127.0.0.1',
  },

  oauth: {
    google: {
      clientID: '',
      clientSecret: '',
      callbackURL: '',
    },
    facebook: {
      clientID: '',
      clientSecret: '',
      callbackURL: '',
    },
    twitter: {
      clientID: '',
      clientSecret: '',
      callbackURL: '',
    },
};
