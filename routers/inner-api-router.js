// Rota /api/inner
// importação do router
const express = require('express')
const router = express.Router()


router.get('/', (req,res)=>{

	res.status(200).json({
				msg	: "Valid token",
				status_code	: 200,
				return :		{
									type: 			"CURRENT_USER",
									login: 			req['user_credentials']['a_user_login'],
									full_name: 		req['user_credentials']['a_user_full_name'],
									category: 		req['user_credentials']['a_user_category'],
									place: 			req['user_credentials']['a_user_place'],
									place_location: req['user_credentials']['a_user_place_location'],
									token:	{
												type: 		"CURRENT_SESSION",
												value: 		req['user_credentials']['a_token']['value'],
												creation: 	req['user_credentials']['a_token']['creation'],
												expiration: req['user_credentials']['a_token']['expiration']
											}
						}
			})
})


var user_api_router = require('./subrouters/user_api_router')
router.use('/user',user_api_router)

var protocol_api_router = require('./subrouters/protocol_api_router')
router.use('/protocol',protocol_api_router)

var transportation_api_router = require('./subrouters/transportation_api_router')
router.use('/transportation',transportation_api_router)

var item_api_router = require('./subrouters/item_api_router')
router.use('/item', item_api_router)

module.exports = router