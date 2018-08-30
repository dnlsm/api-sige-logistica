// Rota /api/inner/item/new
// importação do router
const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
	res.end('new-item-api-router')
})


module.exports = router