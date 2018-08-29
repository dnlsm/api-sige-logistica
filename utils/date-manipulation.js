Date.prototype.toMySQL = function (){
	return this.toISOString().slice(0, 19).replace('T', ' ')
}

Date.prototype.shift = function (shiftTime){
	return new Date(this.getTime() + shiftTime)
}