"use strict";

var webpack = require("webpack");
module.exports = {
   entry: "./src/app.js",
   output: {
      filename: "./wwwroot/bundle.js",
      publicPath: '/dist/'
   },
   resolve: {
      modules: ["src", "node_modules"]
   },
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            loader: "babel-loader",
            query: {
               presets: ["es2015", "react"]
            }
         }
      ]
   }
};