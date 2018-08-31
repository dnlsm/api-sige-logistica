// Rota /api/inner/transportation
// importação do router
const express = require('express')
const router = express.Router()

// importando utilitários
const {SELECT} = require('../../../utils/db-connect')
const {TRANSPORTATION_NOT_FOUND,MISSING_PARAMETERS,INTERNAL_SERVER_ERROR} = require('../../../utils/error-messages')

router.get('/', (req,res)=>{
	var transportation = req.query.transportation

	if(!transportation)
		return res.json(MISSING_PARAMETERS)

	SELECT('*', 'TRANSPORTATION', [['transportation_code', transportation]])
	.exec()
	.onOne((result)=>{
		result = result[0]

		res.json(	{
						msg	: "Transportation found",
						status_code	: 200,
						return	:	{
										type: "TRANSPORTATION",
										code: result['transportation_code'],
										date: result['transportation_date'],
										notes: result['transportation_notes'],
										is_active: result['transportation_is_active'],
										protocol: result['fk_transportation_protocol_code'],
										requester_user: result['fk_transportation_requester_user_login'],
										requested_user: result['fk_transportation_requested_user_login'],
										from: result['fk_transportation_from_place_name'],
										to: result['fk_transportation_to_place_name']
									}
					})
	})
	.onZero(()=> res.json(TRANSPORTATION_NOT_FOUND))
	.error(()=> res.json(INTERNAL_SERVER_ERROR))
})


var new_transportation_api_router = require('./new-transportation-api-router')
router.use('/new',new_transportation_api_router)

var list_transportation_api_router = require('./list-transportation-api-router')
router.use('/list',list_transportation_api_router)

var delete_transportation_api_router = require('./delete-transportation-api-router')
router.use('/delete',delete_transportation_api_router)

var update_transportation_api_router = require('./update-transportation-api-router')
router.use('/update',update_transportation_api_router)

module.exports = router