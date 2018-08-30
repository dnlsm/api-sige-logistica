// Rota /api/inner/protocol/new
// importação do router
const express = require('express')
const router = express.Router()

const {SELECT} = require('../../../utils/db-connect')
const {MISSING_PARAMETERS,INTERNAL_SERVER_ERROR} = require('../../../utils/error-messages')


router.get('/', (req,res)=>{
	var code 			= req.query.code
	var name 			= req.query.name
	var client 			= req.query.client
	var glab_code 		= req.query.glab_code
	var sq_code 		= req.query.sq_code
	var cpqdic_code 	= req.query.cpqdic_code
	var photos_url 		= req.query.photos_url
	var invoice 		= req.query.invoice
	var invoice_folder 	= req.query.invoice_folder
	var notes 			= req.query.notes

	if(!code || !name || !client)
		return res.json(MISSING_PARAMETERS)

	SELECT('*', 'PROTOCOL', [['protocol_code',code]])
	.exec()
	.onZero(/*#TODO*/)
	.onAny(/*#TODO*/)
	.error(()=>req.json(INTERNAL_SERVER_ERROR))
})


module.exports = router