// Rota /api/inner/item/movement/list
// importação do router
const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
	res.end('list-movement-api-router')
})


module.exports = router