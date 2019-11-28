'use strict';

const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'development',
  entry: {
    app: './client/index.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/wwwroot/dist',
    publicPath: '/dist/',
    libraryTarget: 'umd'
  },
  resolve: {
    modules: [ 'client', 'node_modules' ],
    alias: { vue$: 'vue/dist/vue.esm.js' }
  },
  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.js?$/, loader: 'babel-loader', query: { presets: [ 'env' ] } },
      { test: /\.scss$/, use: [ 'vue-style-loader', 'css-loader', 'sass-loader' ] },
      { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader' }
    ]
  },
  externals: {
    'dotnetify-elements': 'dotNetifyElements'
  },
  devtool: 'source-map',
  plugins: [
    new VueLoaderPlugin(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new CopyPlugin([
      { from: 'node_modules/dotnetify/dist/dotnetify-vue.min.js' },
      { from: 'node_modules/dotnetify-elements/lib/basic-web-components.bundle.js' }
    ])
  ]
};
