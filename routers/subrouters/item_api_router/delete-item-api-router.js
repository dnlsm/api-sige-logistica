const express = require('express')
var router = express.Router()


router.get('/', (req,res)=>{
	res.end('delete-item-api-router')
})


module.exports = router