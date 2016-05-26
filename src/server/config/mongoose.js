'use strict';

const mongoose = require('mongoose');

module.exports = function (config) {
  mongoose.connect(config.mongoDB.uri, config.mongoDB.options);
  mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ' + ${err}`);
    process.exit(-1);
  });
};
