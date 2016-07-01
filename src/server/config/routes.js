'use strict';

const path = require('path');
const errorhandler = require('api-error-handler');
const api = require('../api');
const auth = require('../auth');

module.exports = function (app) {
  app.use('/api', api);
  app.use('/auth', auth);
  app.get('/*', (req, res) => { res.sendFile(path.join(app.get('appPath'), 'index.html')); });
  app.use(errorhandler());
};
