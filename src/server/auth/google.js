'use strict';

const wrap = require('co-express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {

  /**
   * Responds to requests to GET /auth/google
   */
  index: passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),

  /**
   * Responds to requests to GET /auth/google/callback
   */
  callback: [
    passport.authenticate('google', {
      failureRedirect: config.baseUrl,
    }),
    wrap(function* callback(req, res) {
      const user = req.user;
      const token = jwt.sign({ id: user.id, role: user.role }, config.jwt.secret, config.jwt.options);
      res.cookie('token', token);
      res.redirect(config.baseUrl);
    }),
  ],

};
