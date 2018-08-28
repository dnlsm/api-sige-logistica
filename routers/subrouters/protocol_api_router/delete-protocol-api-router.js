const express = require('express')
var router = express.Router()


router.get('/', (req,res)=>{
	res.end('delete-protocol-api-router')
})


module.exports = router