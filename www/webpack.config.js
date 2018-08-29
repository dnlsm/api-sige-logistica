var path = require("path");

const VueLoaderPlugin = require('vue-loader/lib/plugin')

var webpack = require('webpack')

var DIST_DIR   = path.join(__dirname, "dist"),
    CLIENT_DIR = path.join(__dirname, "src");
    //LIB_DIR	   = path.join(__dirname, "")
module.exports =
{
	mode : "development",
	devtool: "eval",
	entry: [
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
				test: /\.sass$/,
				use: [
						'style-loader',
						'css-loader',
						'sass-loader',
						'bulma-loader'
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
		// make sure to include the plugin!
		new VueLoaderPlugin(),

			// OccurenceOrderPlugin is needed for webpack 1.x only
			//new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.HotModuleReplacementPlugin(),
			// Use NoErrorsPlugin for webpack 1.x
			new webpack.NoEmitOnErrorsPlugin()
	]
}