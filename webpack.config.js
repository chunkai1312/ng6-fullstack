const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devtool: 'sourcemap',
  entry: {
    app: [
      'webpack-hot-middleware/client?reload=true',
      path.join(__dirname, 'client', 'app', 'app.js'),
    ],
    vendor: [
      'angular',
      'angular-material',
      'ngcomponentrouter',
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'client'),
    publicPath: '/',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'ng-annotate!babel', exclude: /node_modules/ },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.css$/, loader: 'style!css!postcss' },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url?limit=10000' },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new HtmlWebpackPlugin({ template: 'client/index.html', inject: 'body', hash: true }),
  ],
};

