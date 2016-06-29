'use strict';

const http = require('http');
const express = require('express');
const config = require('./config');

const app = express();

require('./config/passport')();
require('./config/mongoose')();
require('./config/express')(app, config);
require('./config/routes')(app, config);

http.createServer(app).listen(config.port, config.ip, () => {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

module.exports = app;
