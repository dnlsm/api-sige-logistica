// importação de bibliotecas utilitárias
const path = require('path')

// importação e inicialização do express
const express = require('express')
const app = express()

// importação de biblioteca e configuração do Webpack
const webpack = require('webpack');
const webpackConfig = require('./www/webpack.config');
const compiler = webpack(webpackConfig);

// Definição de diretórios
var DIST_DIR = path.join(__dirname, "www/dist")
var STATIC_DIR = path.join(__dirname, "www/static")

// Importação de routers
var api_router = require('./routers/api-router')




	// Configura Middleware para webpack com hot-reload
	app.use(require("webpack-dev-middleware")(compiler, {
		logLevel: 'warn', publicPath: webpackConfig.output.publicPath
	}))
	app.use(require("webpack-hot-middleware")(compiler, {
		log: console.log, path: '/__webpack_hmr', heartbeat: 1 * 1000
	}))

	// Middleware para rota /api
	app.use('/api', api_router)


	// Serve arquivo build.js compilado do webpack
	app.use('/dist',express.static(DIST_DIR))

	// Serve arquivos estáticos
	app.use(express.static(STATIC_DIR))


// Inicia servidor
app.listen(8080, function(){
	console.log('Server running at port 8080')
})
