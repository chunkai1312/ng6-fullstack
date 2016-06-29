'use strict';

const nodemon = require('nodemon');
const path = require('path');
require('./bundler.js')();

nodemon({
  execMap: {
    js: 'node',
  },
  script: path.join(__dirname, 'server', 'app.js'),
  ignore: [],
  watch: path.join(__dirname, 'server'),
  ext: 'js',
}).on('restart', () => {
  console.log('Restart Express server...');
});
