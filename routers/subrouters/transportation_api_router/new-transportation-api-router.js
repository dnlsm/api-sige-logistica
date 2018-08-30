// Rota /api/inner/transportation/new
// importação do router
const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
	res.end('new-transportation-api-router')
})


module.exports = router