Date.prototype.toMySQL = function (){
	return this.toISOString().slice(0, 19).replace('T', ' ')
}

Date.prototype.shift = function (shiftTime){
	return new Date(this.getTime() + shiftTime)
}


// toMySQL() converte um Date para o formato de string: "YYYY-MM-DD HH:MM:SS"

// shift(shiftTime) cria um novo objeto com o tempo "shifitado" para menos ou para mais
// shitfTime é em milisegundos