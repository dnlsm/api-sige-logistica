// Rota /api/auth
// importação do router
const express = require('express')
const router = express.Router()

// importando utilitários
const {SELECT, INSERT_INTO} = require('../utils/db-connect')
const {INVALID_CREDENTIALS,MISSING_PARAMETERS,INTERNAL_SERVER_ERROR} = require('../utils/error-messages')
const {generateToken} = require('../utils/security')

require('../utils/date-manipulation')


router.get('/', (req,res)=>{
	// Obtem os parâmetros ad url ?usr=&pwd=
	var username = req.query.usr
	var password = req.query.pwd

	// res.json retorna um json para ao usuário
	if(!username || !password)
		res.status(400).json(MISSING_PARAMETERS)
	else  // SELECT * FROM USER WHERE user_login = "username" AND user_password = "password"
		SELECT('*', 'USER', [
								["user_login", username],
								["user_password", password]
							]
		)
		.exec()
		.onOne((result)=>{
				// new Date() consulta o timestamp atual
				// shift adiciona ou subtrai um determinado tempo
				var creation = new Date()
				var expiration = creation.shift(3000000)

				var token = generateToken(255)
				// INSERT INTO SESSION SET session_token = token, session_is_active = 1 ......
				INSERT_INTO('SESSION',	[
											['session_token', token],
											['session_is_active', 1],
											['session_creation', creation.toMySQL()],
											['session_expiration', expiration.toMySQL()],
											['fk_session_user_login', username]
										]
							)
				.exec()
				.then((results, fields)=>{
					res.status(200).json(	{
									msg	: "Login successful",
									status_code	: 200,
									return	:	{ token, creation, expiration}
								}
							)
				})
				.error(()=> res.status(500).json(INTERNAL_SERVER_ERROR))
		})
		.onZero(()=> res.status(401).json(INVALID_CREDENTIALS))
})

module.exports = router