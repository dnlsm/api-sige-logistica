// Rota /api/inner/user/list
// importação do router
const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
	res.end('list-user-api-router')
})


module.exports = router