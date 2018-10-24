// Rota /api
// importação do router
const express = require('express')
const router = express.Router()

// importando utilitários
const {SELECT, UPDATE} = require('../utils/api2-db_connector')
const {INVALID_TOKEN,MISSING_PARAMETERS,INTERNAL_SERVER_ERROR} = require('../utils/error-messages')

require('../utils/date-manipulation')

router.get('/', (req,res)=>{
	res.end('api-router')
})

//var auth_api_router = require('./auth-api-router')
//router.use('/auth', auth_api_router)

router.use((req,res,next)=>{
	var token = req.query.token

	if(!token)
		return res.status(401).json(INVALID_TOKEN)

	SELECT(	'*',
			'USER INNER JOIN SESSION ON fk_session_user_login = user_login INNER JOIN PLACE ON place_name = fk_user_place_name', 
			[
				['session_token', token],
				['session_is_active', 1],
				'session_creation < UTC_TIMESTAMP()',
				'session_expiration > UTC_TIMESTAMP()'
			]
	).exec()
	.onOne((results)=>{
		results = results[0]
		var user_credentials =	
			{
				a_user_login: 			results['user_login'],
				a_user_full_name: 		results['user_full_name'],
				a_user_category: 		results['user_category'],
				a_user_place: 			results['place_name'],
				a_user_place_location: 	results['place_location'],
				a_token: 	{
								value:		results['session_token'],
								creation:	results['session_creation'],
								expiration:	results['session_expiration']
							}
			}
		console.log(results)
		console.log(user_credentials)
		req.user_credentials = user_credentials

		var newExpiration = (new Date()).shift(3000000)

		UPDATE('SESSION', [['session_expiration',newExpiration.toMySQL()]],[['session_token', token]]).exec()
		.then(()=> next())
		.error(()=> res.status(500).json(INTERNAL_SERVER_ERROR))
	})
	.onZero(()=> res.status(401).json(INVALID_TOKEN))
	.error(()=> res.status(500).json(INTERNAL_SERVER_ERROR))
})


//var inner_api_router = require('./inner-api-router')
//router.use('/inner', inner_api_router)


module.exports = router