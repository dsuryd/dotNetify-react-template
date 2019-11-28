'use strict';

const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

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
    extensions: [ '.js', '.jsx' ]
  },
  module: {
    rules: [
      { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: [ 'css-loader?minimize' ] },
      { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader' }
    ]
  },
  externals: {
    dotnetify: 'dotnetify',
    'dotnetify-elements': 'dotNetifyElements',
    'styled-components': 'styled'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new CopyPlugin([
      { from: 'node_modules/dotnetify/dist/dotnetify-react.min.js' },
      { from: 'node_modules/dotnetify-elements/lib/dotnetify-elements.bundle.js' },
      { from: 'node_modules/styled-components/dist/styled-components.min.js' }
    ])
  ]
};
