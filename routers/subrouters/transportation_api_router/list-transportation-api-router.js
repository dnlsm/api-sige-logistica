// Rota /api/inner/transportation/list
// importação do router
const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{
	res.end('list-transportation-api-router')
})


module.exports = router