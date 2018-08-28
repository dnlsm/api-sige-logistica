const express = require('express')
var router = express.Router()


// TODO router.use('authentication-middleware')


var inner_api_router = require('./inner-api-router')

router.use('/inner', inner_api_router)
router.get('/', (req,res)=>res.send('Hello World!'))



module.exports = router