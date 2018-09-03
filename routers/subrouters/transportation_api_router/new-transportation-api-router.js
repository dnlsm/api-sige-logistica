// Rota /api/inner/transportation/new
// importação do router
const express = require('express')
const router = express.Router()

const {INSERT_INTO, SELECT} = require('../../../utils/db-connect')
const {	INTERNAL_SERVER_ERROR,
		PROTOCOL_NOT_FOUND,
		USER_NOT_FOUND,
		PLACE_NOT_FOUND,
		TRANSPORTATION_CREATED,
		FORBIDDEN} = require('../../../utils/error-messages')


router.get('/', (req,res)=>{
	var transportation_code 		= req.query.transportation_code
	var transportation_date 		= req.query.transportation_date
	var transportation_notes		= req.query.transportation_notes
	var transportation_is_active 	= req.query.transportation_is_active
	var transportation_protocol 	= req.query.transportation_protocol
	var transportation_requester	= req.query.transportation_requester
	var transportation_requested	= req.query.transportation_requested
	var transportation_from 		= req.query.transportation_from
	var transportation_to 			= req.query.transportation_to

	var category 					= req.user_credentials.a_user_category


	switch(category){

		case 'ROOT':
		case 'LOGISTIC':
		case 'LABORATORY':
			if(	   !transportation_code
				|| !transportation_date
				|| !transportation_is_active
				|| !transportation_protocol
				|| !transportation_requester
				|| !transportation_from
				|| !transportation_to)
				return res.json(MISSING_PARAMETERS)

			// Monta o array de Campos e Valores do registro
			var record = []
			record.push(['transportation_code', transportation_code])
			record.push(['transportation_date', transportation_code])
			record.push(['transportation_is_active', transportation_is_active])
			record.push(['fk_transportation_protocol_code', transportation_protocol])
			record.push(['fk_transportation_requester_user_login', transportation_requester])
			record.push(['fk_transportation_from_place_name', transportation_from])
			record.push(['fk_transportation_to_place_name', transportation_to])

			if (transportation_notes)
				record.push(['transportation_notes', transportation_notes])
			if (transportation_requested)
				record.push(['fk_transportation_requested_user_login', transportation_requested])

			// Verifica se Protocolo existe
			SELECT ('*', 'PROTOCOL', [["protocol_code", transportation_protocol]]).exec()
			.error(()=> res.json(INTERNAL_SERVER_ERROR))
			.onZero(()=>res.json(PROTOCOL_NOT_FOUND))
			.onOne((result)=>
				// Verifica se requisitante existe
				SELECT ('*', 'USER', [["user_login", item_code]]).exec()
				.error(()=> res.json(INTERNAL_SERVER_ERROR))
				.onZero((result)=> res.json(USER_NOT_FOUND))
				.onOne((result)=>
					//Verifica se 'From' existe
					SELECT ('*', 'PLACE', [["place_name", transportation_from]]).exec()
					.error(()=> res.json(INTERNAL_SERVER_ERROR))
					.onZero((result)=> res.json(PLACE_NOT_FOUND))
					.onOne((result)=>
						//Verifica se 'To' existe
						SELECT ('*', 'PLACE', [["place_name", transportation_to]]).exec()
						.error(()=> res.json(INTERNAL_SERVER_ERROR))
						.onZero((result)=> res.json(PLACE_NOT_FOUND))
						.onOne((result)=>{
							INSERT_INTO('TRANSPORTATION', record).exec()
							.error(()=> res.json(INTERNAL_SERVER_ERROR))
							.then(()=> res.json(TRANSPORTATION_CREATED))
						})
					)
				)
			)

			break;
		case 'ADMINISTRATIVE':
			res.json(FORBIDDEN)
			break;
	}
})


module.exports = router