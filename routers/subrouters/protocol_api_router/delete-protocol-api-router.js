// Rota /api/inner/protocol/delete
// importação do router
const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
	res.end('delete-protocol-api-router')
})


module.exports = router