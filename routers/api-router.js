const express = require('express')
var router = express.Router()


// TODO router.use('authentication-middleware')

router.get('/', (req,res)=>{
	res.end('api-router')
})

var inner_api_router = require('./inner-api-router')
router.use('/inner', inner_api_router)

var auth_api_router = require('./auth-api-router')
router.use('/auth', auth_api_router)

module.exports = router