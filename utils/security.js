// Função auxiliar para geração de tokens de tamanho fixo

function generateToken(size){
	const possibles = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
	var token = ''

	for(i = 0; i < size; i++){
		var randomChar = possibles[Math.floor(Math.random() * possibles.length)]
		token = token + randomChar
	}

	return token
}


module.exports = { generateToken }