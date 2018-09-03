// Rota /api/inner/item/list
// importação do router
const express = require('express')
const router = express.Router()

// importando utilitários
const {SELECT, INSERT_INTO} = require('../../../../utils/db-connect')
const {MISSING_PARAMETERS,INTERNAL_SERVER_ERROR,NO_MOVEMENTS_FOUND} = require('../../../../utils/error-messages')


router.get('/', (req,res)=>{

	SELECT('*', 'TRANSPORTATION_MOVEMENT')
	.exec()
	.onAny((result)=>{
			res.json({
					msg: "Movements found",
					status_code: 200,
					return: result.map((el)=>({
							 						type: 'Movement',
													delivery: el.movement_delivery_timestamp,
													receipt: el.movement_receipt_timestamp,
													deliverer_user: el.fk_movement_deliverer_user_login,
													receiver_user: el.fk_movement_receiver_user_login,
													transportation_code: el.fk_movement_transportation_code,
													item_code: el.fk_movement_item_code
					}))
			})
	})
	.onZero(()=>
			res.json(NO_MOVEMENTS_FOUND)
	)
	.error(()=> res.json(INTERNAL_SERVER_ERROR))


})


module.exports = router
