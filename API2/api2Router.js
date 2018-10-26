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

router.get('/protocol/list', (req,res)=>{
	var hist = req.query.history

	SQL(`
			SELECT *
			FROM PROTOCOL p
			INNER JOIN INTENT i
				ON p.code = i.fkProtocolCode
		`)
	.exec()
	.onAny((protocolsAndIntents)=>{
		res.status(200).json(
			{
				msg: 	"OK",
				status_code: 200,
				return: 
						protocolsAndIntents
							.reduce((protocols, protocol)=>{
								if(protocols.some((ell)=> ell.code === protocol.code))
									return protocols
								return protocols.concat(protocol)
							},[])
							.map((protocol)=>{
								protocol.isFinished = 
									protocolsAndIntents
										.filter((intent)=> intent.fkProtocolCode == protocol.code)
										.reduce((acc, intent)=>{
											return acc ? acc : intent.isFinished
										}, false)
							})
							.filter((protocol)=> hist? !protocol.isFinished:true)
			}
		)
	})
	.onZero(()=> res.status(500).json(INTERNAL_SERVER_ERROR))
	.error(()=> res.status(500).json(INTERNAL_SERVER_ERROR))

})

router.get('/protocol/:id', (req,res)=>{
	var protocolId = req.params.id

	SQL(`
			SELECT *
			FROM PROTOCOL p

			WHERE p.code = "${protocolId}""
		`)
	.exec()
	.then((protocol)=>{
		protocol = protocol[0]

		SQL(`
				SELECT *
				FROM INTENT i 
				INNER JOIN INTENT_ITEM ii
					ON i.code = ii.fkIntent
				INNER JOIN ITEM it
					ON ii.fkItem = it.code

				WHERE i.fkProtocolCode = "${protocolId}""
			`)
		.exec()
		.then((intentsAndItems)=>{
			var toPlaces = intentsAndItems.reduce((acc,intent)=>{
						if(acc.some((toPlace)=> toPlace.place == intent.fkToPlace))
							return acc
						return acc.concat({
							place: intent.fkToPlace
						})
			},[])
			SQL(`
					SELECT it.*, tm.*, ii.fkToPlace
					FROM ITEM it
					INNER JOIN INTENT_ITEM ii
						ON it.code = ii.fkItem
					INNER JOIN INTENT i
						ON ii.fkIntent = i.code
					LEFT JOIN TRANSPORTATION_MOVEMENT tm
						ON ii.code = tm.fkIntentItem
					WHERE it.fkProtocolCode = "${protocolId}"
				`)
			.exec()
			.then((itemsAndMovements)=>{
				var protocolItems = itemsAndMovements.reduce((items, item)=>{
						if (items.some((ell)=> ell.code == item.code))
							return items
						return item.concat({
							code: item.code,
							name: item.name,
							location : item.currentLocation
						})
				},[])
				.map((item)=>{
					item.haveToGo = itemsAndMovements.filter((ell)=> ell.code == item.code)
													.filter((ell)=> ell.)
				})
			})


		})
	})
})

//var inner_api_router = require('./inner-api-router')
//router.use('/inner', inner_api_router)


module.exports = router