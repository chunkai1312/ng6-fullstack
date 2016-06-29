const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devtool: 'sourcemap',
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:4000',
    path.join(__dirname, 'src', 'client', 'app', 'app.js'),
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'src', 'client'),
    publicPath: '/',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'ng-annotate!babel', exclude: /node_modules/ },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.css$/, loader: 'style!css!postcss' },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url?limit=10000' },
      { test: /\.json$/, loader: 'json' },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks(module) {
        return module.resource && module.resource.indexOf(path.join(__dirname, 'src', 'client')) === -1;
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/client/index.html',
      inject: 'body',
      hash: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
    }),
  ],
};
