
const INVALID_CREDENTIALS	=	
	{
		msg	: "Invalid username or password",
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

console.log(INVALID_CREDENTIALS)

module.exports = 
{
	INVALID_CREDENTIALS,
	INTERNAL_SERVER_ERROR,
	MISSING_PARAMETERS
}