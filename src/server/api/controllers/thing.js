'use strict';

const wrap = require('co-express');
const error = require('http-errors');
const Thing = require('../models/thing');

module.exports = {
  index: wrap(index),
  create: wrap(create),
  show: wrap(show),
  update: wrap(update),
  destroy: wrap(destroy),
};

function* index(req, res, next) {
  try {
    let things = yield Thing.find();
    res.status(200).json(things);
  } catch (err) {
    next(err);
  }
}

function* create(req, res, next) {
  try {
    let thing = yield Thing.create(req.body);
    res.status(201).json(thing);
  } catch (err) {
    next(err);
  }
}

function* show(req, res, next) {
  try {
    let thing = yield Thing.findById(req.params.id);
    if (!thing) throw error(404);
    res.status(200).json(thing);
  } catch (err) {
    next(err);
  }
}

function* update(req, res, next) {
  try {
    let thing = yield Thing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!thing) throw error(404);
    res.status(200).json(thing);
  } catch (err) {
    next(err);
  }
}

function* destroy(req, res, next) {
  try {
    let thing = yield Thing.findByIdAndRemove(req.params.id);
    if (!thing) throw error(404);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
