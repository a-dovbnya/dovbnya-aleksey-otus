const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
	mode: 'development',
	context: path.join(__dirname, 'src'),
	entry: './entry.ts',

	output: {
		path: path.join(__dirname, './dist'),
		filename: 'bundle.js',
	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				use: ['ts-loader'],
				exclude: [
					/node_modules/
				]
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			}
		]
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},

	plugins: [
		new HTMLWebpackPlugin({
			template: './index.html'
		}),
	],
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    },
};