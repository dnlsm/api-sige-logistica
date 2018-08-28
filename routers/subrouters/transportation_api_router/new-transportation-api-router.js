const express = require('express')
var router = express.Router()


router.get('/', (req,res)=>{
	res.end('new-transportation-api-router')
})


module.exports = router