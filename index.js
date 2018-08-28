const express = require('express')
const app = express()


var api_router = require('./routers/api-router')

app.use('/api', api_router)


app.listen(80, function(){
	console.log('Server running at port 80')
})
