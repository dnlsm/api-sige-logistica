//
const express = require('express')
var router = express.Router()


router.get('/', (req,res)=>{
	res.end('list-user-api-router')
})


module.exports = router