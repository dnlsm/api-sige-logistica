// Rota /api/inner/protocol/new
// importação do router
const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
	res.end('new-protocol-api-router')
})


module.exports = router