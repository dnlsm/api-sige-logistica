const express = require('express')
const app = express()
const path = require('path')

var api_router = require('./routers/api-router')

app.use('/api', api_router)


var webpack = require('webpack');
var webpackConfig = require('./www/webpack.config');
var compiler = webpack(webpackConfig);
 
app.use(require("webpack-dev-middleware")(compiler, {
	logLevel: 'warn', publicPath: webpackConfig.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler, {
	log: console.log, path: '/__webpack_hmr', heartbeat: 1 * 1000
}));



var DIST_DIR = path.join(__dirname, "www/dist")
var PUBLIC_DIR = path.join(__dirname, "www/public")

//app.use(express.static(DIST_DIR))
app.use('/dist',express.static(DIST_DIR))
app.use(express.static(PUBLIC_DIR))

app.listen(8080, function(){
	console.log('Server running at port 8080')
})
