// Rota /api/inner/transportation/list
// importação do router
const express = require('express')
const router = express.Router()

const {SELECT} = require('../../../utils/db-connect')
const {TRANSPORTATION_NOT_FOUND,MISSING_PARAMETERS,INTERNAL_SERVER_ERROR} = require('../../../utils/error-messages')


router.get('/', (req,res)=>{
	SELECT('*', 'TRANSPORTATION')
	.exec()
	.onAny((results)=>{
		res.json(	{
						msg	: "Transportation found",
						status_code	: 200,
						return	:	results.map((el)=>({
										type: "TRANSPORTATION",
										code: 			el['transportation_code'],
										date: 			el['transportation_date'],
										notes: 			el['transportation_notes'],
										is_active: 		el['transportation_is_active'],
										protocol: 		el['fk_transportation_protocol_code'],
										requester_user: el['fk_transportation_requester_user_login'],
										requested_user: el['fk_transportation_requested_user_login'],
										from: 			el['fk_transportation_from_place_name'],
										to: 			el['fk_transportation_to_place_name']
									}))
					})
	})
	.onZero(()=> res.json(TRANSPORTATION_NOT_FOUND))
	.error(()=> res.json(INTERNAL_SERVER_ERROR))
})


module.exports = router