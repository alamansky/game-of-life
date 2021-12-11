/** @format */

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'), //default filename
		filename: 'main.js', //default path
	},
	module: {
		rules: [
			{ test: /\.js$/, use: ['babel-loader'] },
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							sourceMap: true, //change for production
						},
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true, //change for production
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true, //change for production
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: './index.html',
		}),
	],
	devtool: 'source-map', //change for production
};
