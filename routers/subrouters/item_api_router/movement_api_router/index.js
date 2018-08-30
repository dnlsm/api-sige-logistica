// Rota /api/inner/item/movement
// importação do router
const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
	res.end('movement-api-router')
})

var list_movement_api_router = require('./list-movement-api-router')
router.use('/list',list_movement_api_router)

var update_movement_api_router = require('./update-movement-api-router')
router.use('/update',update_movement_api_router)


module.exports = router