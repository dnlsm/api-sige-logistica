// Rota /api/inner/item/new
// importação do router
const express = require('express')
const router = express.Router()

// importando utilitários
const {SELECT, INSERT_INTO} = require('../../../utils/db-connect')
const {MISSING_PARAMETERS,INTERNAL_SERVER_ERROR,ITEM_NOT_FOUND} = require('../../../utils/error-messages')


router.post('/', (req,res)=>{

	var item_code = req.query.item_code
	var item_name = req.query.item_name
	var item_protocol = req.query.item_protoc
	var category = req.user_credentials.a_user_category

	switch(category){

		case 'ROOT':
		case 'LOGISTIC':
					if(item_code == null || item_name == null || item_protocol == null)
						return {
							msg : MISSING_PARAMETERS
							status_code: 400
						}
					else
							SELECT ('*', 'PROTOCOL', [
								["protocol_code", item_protocol]
							])
							.exec()
							.onAny((result)=>{
										result = result[0]
										SELECT ('*', 'ITEM',[
											["item_code", itemCode]
										]
							)
							.exec()
							.onAny((result)=>
										res.json(ITEM_ALREADY_EXISTS)
							)
							.onZero((result)=>


						)





							})
							.onZero(()=>
								res.json(PROTOCOL_NOT_FOUND)
						)
						.error(()=> res.json(INTERNAL_SERVER_ERROR))


					break;
		case 'LABORATORY':
		case 'ADMINISTRATIVE':


		break;
	}



})


module.exports = router
