// Rota /api/inner/protocol/update
// importação do router
const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
	res.end('update-protocol-api-router')
})


module.exports = router