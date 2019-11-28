'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './client/app.js'
  },
  output: {
    path: __dirname + '/wwwroot/dist',
    publicPath: '/dist/'
  },
  resolve: {
    modules: [ 'client', 'node_modules' ],
    extensions: [ '.js', '.jsx' ]
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: [ MiniCssExtractPlugin.loader, 'css-loader?minimize' ] },
      { test: /\.svg$/, use: 'svg-url-loader?noquotes=true' },
      { test: /\.(png|jpg|jpeg|gif)$/, use: 'url-loader?limit=25000' }
    ]
  },
  plugins: [ new MiniCssExtractPlugin() ]
};
