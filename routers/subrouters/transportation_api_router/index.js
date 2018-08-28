const express = require('express')
var router = express.Router()


router.get('/', (req,res)=>{
	res.end('transportation-api-router')
})

var new_transportation_api_router = require('./new-transportation-api-router')
var list_transportation_api_router = require('./list-transportation-api-router')
var delete_transportation_api_router = require('./delete-transportation-api-router')
var update_transportation_api_router = require('./update-transportation-api-router')


router.use('/new',new_transportation_api_router)
router.use('/list',list_transportation_api_router)
router.use('/delete',delete_transportation_api_router)
router.use('/update',update_transportation_api_router)

module.exports = router