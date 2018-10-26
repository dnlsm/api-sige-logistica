// Rota /api
// importação do router
const express = require('express')
const router = express.Router()

// importando utilitários
const {SELECT, UPDATE, SQL} = require('../utils/api2-db_connector')
const {
		INVALID_TOKEN,
		MISSING_PARAMETERS,
		INTERNAL_SERVER_ERROR,
		PASSWORD_CHANGED
	} = require('../utils/error-messages')

require('../utils/date-manipulation')

router.get('/', (req,res)=>{
	res.end('api-router')
})

//var auth_api_router = require('./auth-api-router')
//router.use('/auth', auth_api_router)

router.post('/password/change',(req,res)=>{
	var newPassword = req.body.pwd
	if(!newPassword)
		return res.status(401).json(MISSING_PARAMETERS)

	UPDATE('USER',
			[['password', newPassword]],
			[['login',re.user_credentials.a_user_login]])
	.exec()
	.onOne(()=> req.status(200).json(PASSWORD_CHANGED))
	.onZero(()=> res.status(500).json(INTERNAL_SERVER_ERROR))
	.error(()=> res.status(500).json(INTERNAL_SERVER_ERROR))
})

router.use((req,res,next)=>{
	var token = req.query.token

	if(!token)
		return res.status(401).json(INVALID_TOKEN)

	SELECT(	'*',

			'USER u INNER JOIN SESSION s ON s.fkUser = u.login', 
			[
				['token', token],
				['isActive', 1],
				'creation < UTC_TIMESTAMP()',
				'expiration > UTC_TIMESTAMP()'
			]
	).exec()
	.onOne((results)=>{
		results = results[0]
		var user_credentials =	
			{
				a_user_login: 			results['login'],
				a_user_full_name: 		results['fullName'],
				a_user_category: 		results['category'],
				a_token: 	{
								value:		results['token'],
								creation:	results['creation'],
								expiration:	results['expiration']
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

const bodyParser = require('body-parser')
router.user(bodyParser.json())
router.user(bodyParser.urlencoded({extended: true}))

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




router.get('/list/all/active',(req,res)=>{
	SQL(
		`
		SELECT *
		FROM
			PLACE p
			INNER JOIN ITEM i
				ON i.fkCurrentLocation = p.name
		WHERE
			p.name != "Externo"
		ORDER BY
			p.name, i.fkProtocolCode, i.code
		`)
	.exec()
	.onAny((placesAndItems)=>{
		SQL('*',
				`
				SELECT *
				FROM	TRANSPORTATION t
					INNER JOIN INTENT i
						ON t.fkIntent = i.code
				WHERE
					t.isFinished = false'
				`)
		.exec()
		.onAny((transpAndIntents)=>{
			ret = placesAndItems
					.reduce(
						(places, place)=>{
							if(places.some((el)=>el.name === place.name))
								return places
							return places
										.concat({
													name: place.name,
													description: place.description,
													items:[],
													transportation:[]
												})
						},
					[])
					.map((place)=>{
						place.items =
							placesAndItems
							.filter((item)=> item.fkCurrentLocation === place.name)
							.map((item)=>{
								return {
									code: item.code,
									name: item.name,
									protocol: item.fkProtocolCode
								}
							})
						place.transportation =
							transpAndIntents
							.filter((transp)=> transp.fkToPlace === place.name)
							.map((transp)=>{
								return {
									code: transp.code,
									notes: transp.notes,
									isFinished: false
								}
							})
						return place
					})
		})
		.onZero(()=> res.status(500).json(INTERNAL_SERVER_ERROR))
		.error(()=> res.status(500).json(INTERNAL_SERVER_ERROR))
	})
	.onZero(()=> res.status(500).json(INTERNAL_SERVER_ERROR))
	.error(()=> res.status(500).json(INTERNAL_SERVER_ERROR))
})

//var inner_api_router = require('./inner-api-router')
//router.use('/inner', inner_api_router)

module.exports = router