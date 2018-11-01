'use strict';

module.exports = {
	mode: 'development',
	entry: { bundle: './src/app.js' },
	output: {
		path: __dirname + '/wwwroot',
		publicPath: '/'
	},
	resolve: {
		modules: [ 'client', 'node_modules' ]
	},
	module: {
		rules: [ { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ } ]
	}
};
