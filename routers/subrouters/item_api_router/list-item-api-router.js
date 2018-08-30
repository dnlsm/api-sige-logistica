// Rota /api/inner/item/list
// importação do router
const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
	res.end('list-item-api-router')
})


module.exports = router