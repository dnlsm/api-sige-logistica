// Rota /api/inner/user/update
// importação do router
const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
	res.end('update-user-api-router')
})


module.exports = router