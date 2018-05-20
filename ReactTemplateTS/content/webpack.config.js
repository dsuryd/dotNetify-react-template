"use strict";

const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: "./client/app.tsx"
    },
    devtool: 'inline-source-map',
    output: {
        filename: './wwwroot/dist/bundle.js',
        publicPath: 'dist/'
    },
    resolve: {
        modules: ["client", "node_modules"],
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
        rules: [
            { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.tsx?$/, use: 'awesome-typescript-loader?silent=true' },
            { test: /\.css$/, use: ExtractTextPlugin.extract({ use: 'css-loader?minimize' }) },
            { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('./wwwroot/dist/app.css')
    ]
};