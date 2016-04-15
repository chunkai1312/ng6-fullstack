'use strict';

const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const favicon = require('serve-favicon');
const path = require('path');

module.exports = function (app, config) {
  app.use(compression());
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(methodOverride());

  if (app.get('env') === 'development') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackDevConfig = require('../../webpack.config');
    const ProgressPlugin = require('webpack/lib/ProgressPlugin');

    const compiler = webpack(webpackDevConfig);
    app.use(webpackDevMiddleware(compiler, {
      publicPath: webpackDevConfig.output.publicPath,
      noInfo: true,
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false,
      },
    }));
    app.use(webpackHotMiddleware(compiler));
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', path.join(config.root, 'client'));
  }

  if (app.get('env') === 'test') {
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', path.join(config.root, 'client'));
  }

  if (app.get('env') === 'production') {
    // app.use(favicon(path.join(config.serverPath, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.serverPath, 'public')));
    app.set('appPath', path.join(config.serverPath, 'public'));
  }
};
