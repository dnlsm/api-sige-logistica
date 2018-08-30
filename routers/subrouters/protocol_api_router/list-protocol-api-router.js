// Rota /api/inner/protocol/list
// importação do router
const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
	res.end('list-protocol-api-router')
})


module.exports = router