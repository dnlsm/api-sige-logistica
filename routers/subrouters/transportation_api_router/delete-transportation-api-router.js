// Rota /api/inner/transportation/delete
// importação do router
const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
	res.end('delete-transportation-api-router')
})


module.exports = router