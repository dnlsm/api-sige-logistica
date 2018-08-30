// Rota /api/inner/protocol
// importação do router
const express = require('express')
const router = express.Router()

// importando utilitários
const {SELECT} = require('../../../utils/db-connect')
const {PROTOCOL_NOT_FOUND,MISSING_PARAMETERS,INTERNAL_SERVER_ERROR} = require('../../../utils/error-messages')

router.get('/', (req,res)=>{
	var protocol = req.query.protocol

	if(!protocol)
		return res.json(MISSING_PARAMETERS)

	SELECT('*', 'PROTOCOL', [['protocol_code', protocol]])
	.exec()
	.onOne((results)=>{
		results = results[0]
		res.json(	{
						msg	: "Protocol found",
						status_code	: 200,
						return	:	{
										type: 			"PROTOCOL",
										code: 			results['protocol_code'],
										name: 			results['protocol_name'],
										client: 		results['protocol_client'],
										glab_code: 		results['protocol_glab_code'],
										sq_code: 		results['protocol_sq_code'],
										cpqdic_code: 	results['protocol_cpqdic_code'],
										photos_url: 	results['protocol_photos_url'],
										invoice: 		results['protocol_invoice'],
										invoice_folder: results['protocol_invoice_folder'],
										notes: 			results['protocol_notes']
									}
					}
			)
	})
	.onZero(()=>res.json(PROTOCOL_NOT_FOUND))
	.error(()=>res.json(INTERNAL_SERVER_ERROR))
})


var new_protocol_api_router = require('./new-protocol-api-router')
router.use('/new',new_protocol_api_router)

var list_protocol_api_router = require('./list-protocol-api-router')
router.use('/list',list_protocol_api_router)

var delete_protocol_api_router = require('./delete-protocol-api-router')
router.use('/delete',delete_protocol_api_router)

var update_protocol_api_router = require('./update-protocol-api-router')
router.use('/update',update_protocol_api_router)

module.exports = router