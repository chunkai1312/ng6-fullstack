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

  jwt: {
    secret: '5XXBf2oyNnN7nZ00H0d3SJmt6nciRpCA',
    options: {
      algorithm: 'HS256',
      expiresIn: 3600,
    },
  },

  oauth: {
    google: {
      clientID: '',
      clientSecret: '',
      callbackURL: '',
    },
    facebook: {
      clientID: '1507896599439986',
      clientSecret: 'beb9fe3a0a8e5e1ccaeaeb7905515b5e',
      callbackURL: '',
    },
    twitter: {
      clientID: '',
      clientSecret: '',
      callbackURL: '',
    },
  },
};
