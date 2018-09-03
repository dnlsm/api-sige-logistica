// Rota /api/inner/item/movement
// importação do router
const express = require('express')
const router = express.Router()

const {SELECT, INSERT_INTO} = require('../../../../utils/db-connect')
const {MISSING_PARAMETERS,INTERNAL_SERVER_ERROR,ITEM_NOT_FOUND,NO_MOVEMENTS_FOUND} = require('../../../../utils/error-messages')

router.get('/', (req,res)=>{

	var item_code = req.query.item_code

	SELECT('*', 'ITEM',[
			["item_code", item_code]
	])
	.exec()
	.oneOne((result)=>{
			SELECT('*', 'TRANSPORTATION_MOVEMENT',[
				["fk_movement_item_code", item_code]
			])
			.exec()
			.onAny((result)=>{
					res.json({
							msg: "Item movements found",
							status_code: 200,
							return:
							result.map((el)=>({
									type: "Movement",
									delivery: el.movement_delivery_timestamp,
									receipt: el.movement_receipt_timestamp,
									deliverer_user: el.fk_movement_deliverer_user_login,
									receiver_user: el.fk_movement_receiver_user_login,
									transportation_code: el.fk_movement_transportation_code,
									item_code: el.fk_movement_item_code
							}))
				})
			})
			.onZero(()=>res.json(NO_MOVEMENTS_FOUND))
			.error(()=> res.json(INTERNAL_SERVER_ERROR))
	})
	.onZero(()=>
			res.json(ITEM_NOT_FOUND)
	)
	.error(()=> res.json(INTERNAL_SERVER_ERROR))
})

var list_movement_api_router = require('./list-movement-api-router')
router.use('/list',list_movement_api_router)

var update_movement_api_router = require('./update-movement-api-router')
router.use('/update',update_movement_api_router)


module.exports = router
