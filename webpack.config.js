const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		index: './src/index.js',
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	devServer: {
		https: true,
		host: '0.0.0.0',
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 8081,
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	plugins: [
		new ESLintPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new CopyPlugin({
			patterns: [
				{ from: 'src/assets', to: 'assets' },
			],
		}),
	],
	devtool: 'source-map',
};
