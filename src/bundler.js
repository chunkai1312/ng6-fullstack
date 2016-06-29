'use strict';  /* eslint no-param-reassign: 0 */

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('../webpack.dev.config.js');
const path = require('path');
const config = require('./server/config');

module.exports = function () {
  const compiler = webpack(webpackConfig);
  let bundleStart;

  compiler.plugin('compile', () => {
    console.log('Bundling...');
    bundleStart = Date.now();
  });

  compiler.plugin('done', () => {
    console.log(`Bundled in ${(Date.now() - bundleStart)} ms!`);
  });

  const bundler = new WebpackDevServer(compiler, {
    contentBase: path.join(__dirname, 'client'),
    publicPath: '/',
    proxy: {
      '/api/*': {
        target: `http://${config.ip}:${config.port}/api`,
        rewrite: (req) => {
          req.url = req.url.replace(/^\/api/, '');
        },
      },
      '/auth/*': {
        target: `http://${config.ip}:${config.port}/auth`,
        rewrite: (req) => {
          req.url = req.url.replace(/^\/auth/, '');
        },
      },
    },
    hot: true,
    quiet: false,
    noInfo: true,
    stats: {
      colors: true,
    },
  });

  bundler.listen(config.devServer.port, config.devServer.ip, () => {
    console.log('Webpack Dev Server listening on port %d', config.devServer.port);
    console.log('Bundling project, please wait...');
  });
};
