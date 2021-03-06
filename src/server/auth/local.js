'use strict';

const wrap = require('co-express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../api/models/user');

module.exports = {

  /**
   * Responds to requests to POST /auth/signup
   */
  signup: wrap(function* (req, res) {
    const user = yield User.create({
      email: req.body.email,
      password: req.body.password,
      profile: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
    });
    const token = jwt.sign({ id: user.id, role: user.role }, config.jwt.secret, config.jwt.options);
    res.json({ token });
  }),

  /**
   * Responds to requests to POST /auth/login
   */
  login: [
    passport.authenticate('local'),
    wrap(function* (req, res) {
      const user = req.user;
      const token = jwt.sign({ id: user.id, role: user.role }, config.jwt.secret, config.jwt.options);
      res.json({ token });
    }),
  ],

};
