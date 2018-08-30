// Mensagens padões para erros e afins

const INVALID_CREDENTIALS	=	
	{
		msg	: "Invalid username or password",
		status_code	: 401
	}

const INVALID_TOKEN	=	
	{
		msg	: "Invalid token",
		status_code	: 401
	}

const INTERNAL_SERVER_ERROR =
	{
		msg : "Internal Server Error",
		status_code : 500
	}


const MISSING_PARAMETERS =
	{
		msg : "Missing parameters",
		status_code: 400
	}

const USER_NOT_FOUND =
	{
		msg : "Missing parameters",
		status_code: 400
	}

const PROTOCOL_NOT_FOUND =
	{
		msg : "Missing parameters",
		status_code: 400
	}

// IMPORTANTE: Exportar mensagens
module.exports = 
{
	INVALID_CREDENTIALS,
	INVALID_TOKEN,
	INTERNAL_SERVER_ERROR,
	MISSING_PARAMETERS,
	USER_NOT_FOUND,
	PROTOCOL_NOT_FOUND
}