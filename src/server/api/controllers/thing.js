'use strict';

const wrap = require('co-express');
const error = require('http-errors');
const Thing = require('../models/thing');

module.exports = {
  index: wrap(function* (req, res) {
    const things = yield Thing.find();
    res.status(200).json(things);
  }),

  create: wrap(function* (req, res) {
    const thing = yield Thing.create(req.body);
    res.status(201).json(thing);
  }),

  show: wrap(function* (req, res) {
    const thing = yield Thing.findById(req.params.id);
    if (!thing) throw error(404);
    res.status(200).json(thing);
  }),

  update: wrap(function* (req, res) {
    const thing = yield Thing.findById(req.params.id);
    if (!thing) throw error(404);
    res.status(200).json(thing);
  }),

  destroy: wrap(function* (req, res) {
    const thing = yield Thing.findByIdAndRemove(req.params.id);
    if (!thing) throw error(404);
    res.status(204).end();
  }),
};
