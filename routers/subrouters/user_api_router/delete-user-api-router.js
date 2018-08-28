//
const express = require('express')
var router = express.Router()


router.get('/', (req,res)=>{
	res.end('delete-user-api-router')
})


module.exports = router