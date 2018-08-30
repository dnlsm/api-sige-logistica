// Rota /api/inner/user
// importação do router
const express = require('express')
const router = express.Router()

// importando utilitários
const {SELECT} = require('../../../utils/db-connect')
const {USER_NOT_FOUND,MISSING_PARAMETERS,INTERNAL_SERVER_ERROR} = require('../../../utils/error-messages')

router.get('/', (req,res)=>{
	var user_name =	req.query.name

	if(!name)
		return res.json(MISSING_PARAMETERS)

	SELECT('*', ['USER INNER JOIN PLACE ON fk_user_place_name = place_name'], [['user_login',user_name]])
	.exec()
	.onOne((results)=>{
		results = results[0]
		res.json(	{
						msg	: "User found",
						status_code	: 200,
						return:	{
									type: "USER",
									login: results['user_login'],
									full_name: results['user_full_name'],
									category: results['user_category'],
									place: 	{
												type: "PLACE",
												name: results['place_name'],
												location: results['place_location']
											}
								}
					}
				)
	})
	.onZero(()=> res.json(USER_NOT_FOUND))
	.error(()=> res.json(INTERNAL_SERVER_ERROR))
})


var new_user_api_router = require('./new-user-api-router')
router.use('/new',new_user_api_router)

var list_user_api_router = require('./list-user-api-router')
router.use('/list',list_user_api_router)

var delete_user_api_router = require('./delete-user-api-router')
router.use('/delete',delete_user_api_router)

var update_user_api_router = require('./update-user-api-router')
router.use('/update',update_user_api_router)

module.exports = router