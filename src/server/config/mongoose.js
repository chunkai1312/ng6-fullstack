'use strict';

const mongoose = require('mongoose');
const config = require('../config');
mongoose.Promise = global.Promise;

module.exports = function () {
  mongoose.connect(config.mongoDB.uri, config.mongoDB.options);
  mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
  });
};
