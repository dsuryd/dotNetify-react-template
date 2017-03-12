"use strict";

module.exports = {
   entry: "./src/app.js",
   output: {
      filename: "./wwwroot/bundle.js"
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