const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: path.join(__dirname, 'src', 'client', 'app', 'app.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist', 'public'),
    publicPath: '/',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'ng-annotate!babel', exclude: /node_modules/ },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.css$/, loader: 'style!css!postcss' },
      { test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, loader: 'url?limit=10000' },
      { test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, loader: 'url?limit=10000' },
      { test: /\.json$/, loader: 'json' },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks(module) {
        return module.resource && module.resource.indexOf(path.join(__dirname, 'src', 'client')) === -1;
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'client', 'index.html'),
      inject: 'body',
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
  ],
};
