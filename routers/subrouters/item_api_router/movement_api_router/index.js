const express = require('express')
var router = express.Router()


router.get('/', (req,res)=>{
	res.end('movement-api-router')
})

var list_movement_api_router = require('./list-movement-api-router')
var update_movement_api_router = require('./update-movement-api-router')

router.use('/list',list_movement_api_router)
router.use('/update',update_movement_api_router)

module.exports = router