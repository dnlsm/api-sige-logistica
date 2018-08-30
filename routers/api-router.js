// Rota /api
// importação do router
const express = require('express')
const router = express.Router()



router.get('/', (req,res)=>{
	res.end('api-router')
})

// TODO router.use('authentication-middleware')


var inner_api_router = require('./inner-api-router')
router.use('/inner', inner_api_router)

var auth_api_router = require('./auth-api-router')
router.use('/auth', auth_api_router)

module.exports = router