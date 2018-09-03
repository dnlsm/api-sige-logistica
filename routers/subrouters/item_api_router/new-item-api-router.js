// Rota /api/inner/item/new
// importação do router
const express = require('express')
const router = express.Router()

// importando utilitários
const {SELECT, INSERT_INTO} = require('../../../utils/db-connect')
const {MISSING_PARAMETERS,INTERNAL_SERVER_ERROR,ITEM_NOT_FOUND,ITEM_ALREADY_EXISTS,PROTOCOL_NOT_FOUND} = require('../../../utils/error-messages')


router.get('/', (req,res)=>{

	var item_code = req.query.item_code
	var item_name = req.query.item_name
	var item_protocol = req.query.item_protoc
	var category = req.user_credentials.a_user_category

	switch(category){

		case 'ROOT':
		case 'LOGISTIC':
					if(item_code == null || item_name == null || item_protocol == null)
						return res.json(MISSING_PARAMETERS)

					SELECT ('*', 'PROTOCOL', [
								["protocol_code", item_protocol]
							])
							.exec()
							.onAny((result)=>{
										result = result[0]
										SELECT ('*', 'ITEM',[
											["item_code", item_code]
										]
									)
									.exec()
									.onAny((result)=>
													res.json(ITEM_ALREADY_EXISTS)
												)
												.onZero((result)=>
													INSERT_INTO('ITEM', [
														['item_code', item_code],
														['item_name', item_name],
														['fk_item_protocol_code', item_protocol]
													])
													.exec()
													.then((results, fields)=>{
															res.json({
																	msg : 'Item created successfully',
																	status_code : 200
														})
													})

												)
												.error(()=> res.json(INTERNAL_SERVER_ERROR))
							})
							.onZero(()=>
								res.json(PROTOCOL_NOT_FOUND)
							)
						  .error(()=> res.json(INTERNAL_SERVER_ERROR))

					break;
		case 'LABORATORY':
		case 'ADMINISTRATIVE':
					res.json({
						msg : "Forbidden",
						status_code : 403
					})
					break;
	}

})


module.exports = router
