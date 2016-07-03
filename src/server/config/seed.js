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
    return yield User.create({
      email: 'admin@example.com',
      password: 'admin',
      role: 'admin',
      profile: {
        firstName: 'Web',
        lastName: 'Administrator',
      },
    }, {
      email: 'user@example.com',
      password: 'user',
      role: 'user',
      profile: {
        firstName: 'General',
        lastName: 'User',
      },
    });
  }),

  /**
   * Run this script.
   */
  run: co.wrap(function* () {
    yield this.clear();
    yield this.populate();
  }),

};
