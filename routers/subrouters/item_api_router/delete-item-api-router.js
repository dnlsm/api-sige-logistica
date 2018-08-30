// Rota /api/inner/item/delete
// importação do router
const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
	res.end('delete-item-api-router')
})


module.exports = router