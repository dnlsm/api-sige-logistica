//
const express = require('express')
var router = express.Router()


router.get('/', (req,res)=>{
	res.end('user-api-router')
})


var new_user_api_router = require('./new-user-api-router')
var list_user_api_router = require('./list-user-api-router')
var delete_user_api_router = require('./delete-user-api-router')
var update_user_api_router = require('./update-user-api-router')


router.use('/new',new_user_api_router)
router.use('/list',list_user_api_router)
router.use('/delete',delete_user_api_router)
router.use('/update',update_user_api_router)


module.exports = router