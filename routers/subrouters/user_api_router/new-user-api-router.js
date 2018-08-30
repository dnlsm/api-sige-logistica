// Rota /api/inner/user/new
// importação do router
const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
	res.end('new-user-api-router')
})


module.exports = router