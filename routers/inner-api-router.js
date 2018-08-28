const express = require('express')
var router = express.Router()


router.get('/', (req,res)=>{
	res.end('inner-api-router')
})


var user_api_router = require('./subrouters/user_api_router')
router.use('/user',user_api_router)

var protocol_api_router = require('./subrouters/protocol_api_router')
router.use('/protocol',protocol_api_router)

var transportation_api_router = require('./subrouters/transportation_api_router')
router.use('/transportation',transportation_api_router)

var item_api_router = require('./subrouters/item_api_router')
router.use('/item', item_api_router)

module.exports = router