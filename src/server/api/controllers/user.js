'use strict';

const wrap = require('co-express');
const error = require('http-errors');
const User = require('../models/user');

module.exports = {

  /**
   * Responds to requests to GET /users
   */
  index: wrap(function* (req, res) {
    const users = yield User.find();
    res.status(200).json(users);
  }),

  /**
   * Responds to requests to POST /users
   */
  create: wrap(function* (req, res) {
    let user;
    user = yield User.getByUsername(req.body.username);
    if (user) throw error(406);
    user = yield User.getByEmail(req.body.email);
    if (user) throw error(406);

    user = yield User.create(Object.assign(req.body, { provider: req.authInfo.client }));
    res.status(201).json(user);
  }),

  /**
   * Responds to requests to GET /users/me
   */
  me: wrap(function* (req, res) {
    const user = yield User.getById(req.user.id);
    if (!user) throw error(404);
    res.status(200).json(user);
  }),

  /**
   * Responds to requests to GET /users/:id
   */
  show: wrap(function* (req, res) {
    const user = yield User.findById(req.params.id);
    if (!user) throw error(404);
    res.status(200).json(user);
  }),

  /**
   * Responds to requests to PUT /users/:id
   */
  update: wrap(function* update(req, res) {
    const user = yield User.findById(req.params.id);
    if (!user) throw error(404);
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    yield user.save();
    res.status(200).json(user);
  }),

  destroy: wrap(function* (req, res) {
    const user = yield User.findByIdAndRemove(req.params.id);
    if (!user) throw error(404);
    res.status(204).end();
  }),

  /**
   * Responds to requests to POST /users/:id/change_password
   */
  changePassword: wrap(function* (req, res) {
    const user = yield User.findById(req.params.id);
    if (!user) throw error(404);
    const isAuthenticated = yield user.authenticate(req.body.oldPassword);
    if (!isAuthenticated) throw error(400);
    user.password = req.body.newPassword;
    yield user.save();
    res.status(204).end();
  }),

};
