// Rota /api/inner/protocol/list
// importação do router
const express = require('express')
const router = express.Router()

// importando utilitários
const {SELECT} = require('../../../utils/db-connect')
const {PROTOCOL_NOT_FOUND,MISSING_PARAMETERS,INTERNAL_SERVER_ERROR} = require('../../../utils/error-messages')

router.get('/', (req,res)=>{
	SELECT('*', 'PROTOCOL')
	.exec()
	.onAny((results)=>{
		res.json(	{
						msg	: "Protocol found",
						status_code	: 200,
						return	:	results.map((el)=>(
										{
											type: 			"PROTOCOL",
											code: 			el['protocol_code'],
											name: 			el['protocol_name'],
											client: 		el['protocol_client'],
											glab_code: 		el['protocol_glab_code'],
											sq_code: 		el['protocol_sq_code'],
											cpqdic_code: 	el['protocol_cpqdic_code'],
											photos_url: 	el['protocol_photos_url'],
											invoice: 		el['protocol_invoice'],
											invoice_folder: el['protocol_invoice_folder'],
											notes: 			el['protocol_notes']
										}
									))
					}
			)
	})
	.onZero(()=>res.json(PROTOCOL_NOT_FOUND))
	.error(()=>res.json(INTERNAL_SERVER_ERROR))
})


module.exports = router