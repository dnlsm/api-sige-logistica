// Rota /api/inner/item/update
// importação do router
const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
	res.end('update-item-api-router')
})


module.exports = router