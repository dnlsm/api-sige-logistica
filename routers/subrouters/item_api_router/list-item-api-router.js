// Rota /api/inner/item/list
// importação do router
const express = require('express')
const router = express.Router()

// importando utilitários
const {SELECT, INSERT_INTO} = require('../../../utils/db-connect')
const {MISSING_PARAMETERS,INTERNAL_SERVER_ERROR,ITEM_NOT_FOUND,PROTOCOL_NOT_FOUND,NO_MOVEMENTS_FOUND} = require('../../../utils/error-messages')


router.get('/', (req,res)=>{


	SELECT('*', 'ITEM')
	.exec()
	.onAny((result)=>{
			res.json({
					msg: "Itens found",
					status_code: 200,
					return: result.map((el)=>({
							 						type: 'ITEM',
													code: el.item_code,
													name: el.item_name,
													protocol: el.fk_item_protocol_code
					}))
			})
	})
	.onZero(()=>
			res.json(ITEM_NOT_FOUND)
	)
	.error(()=> res.json(INTERNAL_SERVER_ERROR))


})


module.exports = router
