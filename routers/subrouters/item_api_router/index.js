// Rota /api/inner/item
// importação do router
const express = require('express')
const router = express.Router()


// importando utilitários
const {SELECT, INSERT_INTO} = require('../../../utils/db-connect')
const {MISSING_PARAMETERS,INTERNAL_SERVER_ERROR,ITEM_NOT_FOUND} = require('../../../utils/error-messages')


router.get('/', (req,res)=>{
	// Obtem os parâmetros ad url ?item=
	var item = req.query.item

	// res.json retorna um json para ao usuário
	if(!item)
		res.json(MISSING_PARAMETERS)
	else  // SELECT * FROM ITEM WHERE item_code = "item"
		SELECT('*', 'ITEM', [
								["item_code", item],
							]
		)
		.exec()
		.onOne((result)=>{
			result = result[0]
					res.json(	{
									msg	: "Login successful",
									status_code	: 200,
									return	:	{ type: 'ITEM',
															code: result.item_code,
															name: result.item_name,
															protocol: result.fk_item_protocol_code
														}
								}
							)
				})
				.onZero(()=>
					res.json(ITEM_NOT_FOUND)
				)
				.error(()=> res.json(INTERNAL_SERVER_ERROR)	)
})


var new_item_api_router = require('./new-item-api-router')
router.use('/new',new_item_api_router)

var list_item_api_router = require('./list-item-api-router')
router.use('/list',list_item_api_router)

var delete_item_api_router = require('./delete-item-api-router')
router.use('/delete',delete_item_api_router)

var update_item_api_router = require('./update-item-api-router')
router.use('/update',update_item_api_router)




var movement_item_api_router = require('./movement_api_router')
router.use('/movement',movement_item_api_router)


module.exports = router
