const express = require('express')
var router = express.Router()


router.get('/', (req,res)=>{
	res.end('list-movement-api-router')
})


module.exports = router