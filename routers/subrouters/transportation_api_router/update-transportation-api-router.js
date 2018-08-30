// Rota /api/inner/transportation/update
// importação do router
const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
	res.end('update-transportation-api-router')
})


module.exports = router