const express = require('express')
var router = express.Router()


router.get('/', (req,res)=>{
	res.end('update-item-api-router')
})


module.exports = router