'use strict';

const wrap = require('co-express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {

  /**
   * Responds to requests to GET /auth/facebook
   */
  index: passport.authenticate('facebook', {
    authType: 'rerequest',
    scope: ['public_profile', 'email'],
  }),

  /**
   * Responds to requests to GET /auth/facebook/callback
   */
  callback: [
    passport.authenticate('facebook', {
      failureRedirect: config.baseUrl,
    }),
    wrap(function* callback(req, res) {
      const user = req.user;
      const token = jwt.sign({ id: user.id, role: user.role }, config.jwt.secret, config.jwt.options);
      res.cookie('token', token);
      res.redirect(`${config.baseUrl}#`);
    }),
  ],

};
