// importing webpack
const webpack = require('webpack')

// importing plugins
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const startServerPlugin = require('start-server-webpack-plugin')
// importing utilities
const path = require("path");

// initializing paths
var DIST_DIR   = path.join(__dirname, "dist"),
    CLIENT_DIR = path.join(__dirname, "src");
    MAIN_DIR   = path.join(__dirname, "..")

module.exports =
{
	mode : "development",
	devtool: "eval",
	entry: 	[
				"webpack-hot-middleware/client?path=http://localhost:8080/__webpack_hmr&timeout=20000",
				path.join(CLIENT_DIR, "index.js")
			],
	resolve: {
		alias: {
			"vue": __dirname +'/src/vue/vue.js',
			"vue-router": __dirname +'/src/vue/vue-router.js'
		}
	},
	output: {
		path: DIST_DIR,
		filename: "build.js",
		publicPath: '/dist/'
	},
	// devServer: {
	// 	hot: true,
	// 	historyApiFallback: {
	// 		index: '/client/index.html'
	// 	}
	// },
	module: {
		rules: [
			// ... other rules
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options :{
						hotReload: true // disables Hot Reload
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: [
						'vue-style-loader',
						'css-loader'
					]
			},
			{
				test: /\.scss$/,
				use: [
						'style-loader',
						'css-loader',
						'sass-loader',
						'bulma-loader'
					]
			}
		]
	},
	plugins: [
		//new startServerPlugin(path.join(MAIN_DIR, "index.js")),
		// make sure to include the plugin!
		// plugin used to load .vue single file components
		new VueLoaderPlugin(),

		// OccurenceOrderPlugin is needed for webpack 1.x only
		//new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		// Use NoErrorsPlugin for webpack 1.x
		new webpack.NoEmitOnErrorsPlugin()
	]
}