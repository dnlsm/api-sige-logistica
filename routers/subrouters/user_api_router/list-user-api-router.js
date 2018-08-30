// Rota /api/inner/user/list
// importação do router
const express = require('express')
const router = express.Router()

// importando utilitários
const {SELECT} = require('../../../utils/db-connect')
const {USER_NOT_FOUND,MISSING_PARAMETERS,INTERNAL_SERVER_ERROR} = require('../../../utils/error-messages')

router.get('/', (req,res)=>{
	SELECT('*', ['USER INNER JOIN PLACE ON fk_user_place_name = place_name'])
	.exec()
	.onAny((results)=>{
			res.json({
						msg	: "User found",
						status_code	: 200,
						return:	
							results.map((el)=>(
									{
										type: "USER",
										login: el['user_login'],
										full_name: el['user_full_name'],
										category: el['user_category'],
										place: 	{
													type: "PLACE",
													name: el['place_name'],
													location: el['place_location']
												}
									}
								))
					}
		)
	})
	.onZero(()=> res.json(USER_NOT_FOUND))
	.error(()=> res.json(INTERNAL_SERVER_ERROR))
})


module.exports = router