'use strict';

const co = require('co');
const User = require('../api/models/user');

module.exports = {

  /**
   * Clear database before populating.
   */
  clear: co.wrap(function* () {
    return yield User.remove();
  }),

  /**
   * Populate seed data.
   */
  populate: co.wrap(function* () {
    const administrator = yield User.create({
      email: 'admin@example.com',
      password: 'admin',
      firstName: 'Web',
      lastName: 'Administrator',
    });
    return administrator;
  }),

  /**
   * Run this script.
   */
  run: co.wrap(function* () {
    yield this.clear();
    yield this.populate();
  }),

};
