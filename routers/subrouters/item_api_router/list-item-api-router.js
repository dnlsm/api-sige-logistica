// Rota /api/inner/item/list
// importação do router
const express = require('express')
const router = express.Router()

// importando utilitários
const {SELECT, INSERT_INTO} = require('../../../utils/db-connect')
const {MISSING_PARAMETERS,INTERNAL_SERVER_ERROR,ITEM_NOT_FOUND,PROTOCOL_NOT_FOUND,NO_MOVEMENTS_FOUND} = require('../../../utils/error-messages')


router.get('/', (req,res)=>{


	SELECT('*', `ITEM 
					LEFT JOIN
						(SELECT * FROM
							(SELECT * FROM TRANSPORTATION transp 
								INNER JOIN TRANSPORTATION_MOVEMENT mov
								ON transp.transportation_code = mov.fk_movement_transportation_code
								WHERE
									mov.movement_delivery_timestamp IS NOT NULL 
									AND
									mov.movement_receipt_timestamp IS NOT NULL
								ORDER BY mov.movement_delivery_timestamp
								) intermediate
							GROUP BY intermediate.fk_movement_item_code) done_movements
					ON done_movements.fk_movement_item_code = ITEM.item_code`)
	.exec()
	.onAny((result)=>{
			res.json({
					msg: "Itens found",
					status_code: 200,
					return: result.map((el)=>({
							 						type: 'ITEM',
													code: el.item_code,
													name: el.item_name,
													protocol: el.fk_item_protocol_code,
													last_place: el.fk_transportation_to_place_name || 'Externo'
					}))
			})
	})
	.onZero(()=>
			res.json(ITEM_NOT_FOUND)
	)
	.error((err)=> {res.json(INTERNAL_SERVER_ERROR); console.log(err)})


})


module.exports = router
