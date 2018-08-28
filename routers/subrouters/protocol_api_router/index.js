const express = require('express')
var router = express.Router()


router.get('/', (req,res)=>{
	res.end('protocol-api-router')
})

var new_protocol_api_router = require('./new-protocol-api-router')
var list_protocol_api_router = require('./list-protocol-api-router')
var delete_protocol_api_router = require('./delete-protocol-api-router')
var update_protocol_api_router = require('./update-protocol-api-router')


router.use('/new',new_protocol_api_router)
router.use('/list',list_protocol_api_router)
router.use('/delete',delete_protocol_api_router)
router.use('/update',update_protocol_api_router)

module.exports = router