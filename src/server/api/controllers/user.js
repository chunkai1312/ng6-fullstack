'use strict';

const wrap = require('co-express');
const error = require('http-errors');
const User = require('../models/user');

module.exports = {

  /**
   * Responds to requests to GET /api/users
   */
  index: wrap(function* (req, res) {
    const users = yield User.get(req.query);
    res.status(200).json(users);
  }),

  /**
   * Responds to requests to POST /api/users
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
   * Responds to requests to GET /api/users/me
   */
  me: wrap(function* (req, res) {
    const user = yield User.getById(req.user.id);
    if (!user) throw error(401);
    res.status(200).json(user);
  }),

  /**
   * Responds to requests to GET /api/users/:id
   */
  show: wrap(function* (req, res) {
    const user = yield User.findById(req.params.id);
    if (!user) throw error(404);
    res.status(200).json(user);
  }),

  /**
   * Responds to requests to PUT /api/users/:id
   */
  update: wrap(function* update(req, res) {
    const user = yield User.findById(req.params.id);
    if (!user) throw error(404);
    user.profile = req.body.profile;
    yield user.save();
    res.status(200).json(user);
  }),

  /**
   * Responds to requests to DELETE /api/users/:id
   */
  destroy: wrap(function* (req, res) {
    const user = yield User.findByIdAndRemove(req.params.id);
    if (!user) throw error(404);
    res.status(204).end();
  }),

  /**
   * Responds to requests to PUT /api/users/:id/password
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
