// Rota /api/inner/user/delete
// importação do router
const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
	res.end('delete-user-api-router')
})


module.exports = router