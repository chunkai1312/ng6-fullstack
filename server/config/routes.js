'use strict';

const api = require('../api');
const path = require('path');
const errorhandler = require('api-error-handler');

module.exports = function (app, config) {
  app.use('/api', api);
  app.get('/*', (req, res) => { res.sendFile(path.join(app.get('appPath'), 'index.html')); });
  app.use(errorhandler());
};
