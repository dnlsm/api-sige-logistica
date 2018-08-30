// Rota /api/inner/item
// importação do router
const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
	res.end('item-api-router')
})


var new_item_api_router = require('./new-item-api-router')
router.use('/new',new_item_api_router)

var list_item_api_router = require('./list-item-api-router')
router.use('/list',list_item_api_router)

var delete_item_api_router = require('./delete-item-api-router')
router.use('/delete',delete_item_api_router)

var update_item_api_router = require('./update-item-api-router')
router.use('/update',update_item_api_router)




var movement_item_api_router = require('./movement_api_router')
router.use('/movement',movement_item_api_router)


module.exports = router