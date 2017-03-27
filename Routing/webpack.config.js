"use strict";

var webpack = require("webpack");
module.exports = {
   entry: "./src/app.js",
   output: {
      filename: "./wwwroot/bundle.js",
      library: "bundle"
   },
   resolve: {
      modules: ["src", "node_modules"]
   },
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            loader: "babel-loader",
            query: { presets: ["es2015", "react"] }
         }
      ]
   },
   plugins: [
      new webpack.ProvidePlugin({ "window.jQuery": "jquery" })
   ]
};