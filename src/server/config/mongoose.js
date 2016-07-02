'use strict';

const mongoose = require('mongoose');
const config = require('../config');
const seed = require('./seed');
mongoose.Promise = global.Promise;

module.exports = function () {
  mongoose.connect(config.mongoDB.uri, config.mongoDB.options);
  mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
  });
  if (config.seedDB) seed.run().then(() => console.log('finished seeding data'));
};
