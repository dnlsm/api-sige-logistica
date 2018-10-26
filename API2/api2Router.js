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