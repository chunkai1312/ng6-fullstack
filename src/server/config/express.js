'use strict';

const path = require('path');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const morgan = require('morgan');
const config = require('../config');
const logger = require('./logger');

module.exports = function (app) {
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(methodOverride());
  app.use(passport.initialize());

  if (app.get('env') === 'development') {
    app.use(morgan('dev'));
    app.use(express.static(path.join(config.srcPath, 'client')));
    app.set('appPath', path.join(config.srcPath, 'client'));
  }

  if (app.get('env') === 'test') {
    app.use(morgan('dev', { stream: logger.stream }));
    app.use(express.static(path.join(config.serverPath, 'public')));
    app.set('appPath', path.join(config.serverPath, 'public'));
  }

  if (app.get('env') === 'production') {
    app.use(morgan('dev', { stream: logger.stream }));
    app.use(express.static(path.join(config.serverPath, 'public')));
    app.set('appPath', path.join(config.serverPath, 'public'));
  }
};
