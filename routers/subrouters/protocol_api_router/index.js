// Rota /api/inner/protocol
// importação do router
const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
	res.end('protocol-api-router')
})


var new_protocol_api_router = require('./new-protocol-api-router')
router.use('/new',new_protocol_api_router)

var list_protocol_api_router = require('./list-protocol-api-router')
router.use('/list',list_protocol_api_router)

var delete_protocol_api_router = require('./delete-protocol-api-router')
router.use('/delete',delete_protocol_api_router)

var update_protocol_api_router = require('./update-protocol-api-router')
router.use('/update',update_protocol_api_router)

module.exports = router