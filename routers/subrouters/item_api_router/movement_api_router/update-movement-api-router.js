// Rota /api/inner/item/movement/update
// importação do router
const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
	res.end('update-movement-api-router')
})


module.exports = router