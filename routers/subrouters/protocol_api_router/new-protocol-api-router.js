// Rota /api/inner/protocol/new
// importação do router
const express = require('express')
const router = express.Router()

const {SELECT,INSERT_INTO} = require('../../../utils/db-connect')
const {PROTOCOL_ALREADY_EXIST,MISSING_PARAMETERS,INTERNAL_SERVER_ERROR} = require('../../../utils/error-messages')


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
	.onZero(()=>{
		var fields = []

		fields.push(['protocol_code',code])
		fields.push(['protocol_name',name])
		fields.push(['protocol_client',client])

		if(glab_code)
			fields.push(['protocol_glab_code',glab_code])
		if(sq_code)
			fields.push(['protocol_sq_code',sq_code])
		if(cpqdic_code)
			fields.push(['protocol_cpqdic_code',cpqdic_code])
		if(photos_url)
			fields.push(['protocol_photos_url',photos_url])
		if(invoice)
			fields.push(['protocol_invoice',invoice])
		if(invoice_folder)
			fields.push(['protocol_invoice_folder',invoice_folder])
		if(notes)
			fields.push(['protocol_notes',notes])



		INSERT_INTO('PROTOCOL', fields)
		.exec()
		.then(()=>res.json({
				msg : "Protocol created",
				status_code: 200
			}))
		.error(()=>res.json(INTERNAL_SERVER_ERROR))
	})
	.onAny(()=>res.json(PROTOCOL_ALREADY_EXIST))
	.error(()=>res.json(INTERNAL_SERVER_ERROR))
})


module.exports = router