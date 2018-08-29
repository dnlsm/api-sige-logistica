const mysql = require('mysql')
const path = require('path')
const fs = require('fs')

var db_conf = 	JSON.parse(
					fs.readFileSync(
						path.join(__dirname , '../', 'conf', 'db-conf.json')
					)
				)


function connect_db(){
	return mysql.createConnection(db_conf)
}


function disconnect_db(connection){
	connection.end()
}

function dispatch_sql(sql_string, callback){
	return connect_db().query(sql_string, callback)
}


function SQL(sql_string){
	this.sql_string = sql_string
}

SQL.prototype.exec = function() {
	var then_callback = null
	var error_callback = null
	var onAny_callback = null
	var onOne_callback = null
	var onZero_callback = null
	var onMoreThanOne_callback = null

	dispatch_sql(this.sql_string,(error,results,fields)=>{
		if (error){
			if (error_callback)
				return error_callback(error)
			else
				if(then_callback)
					return then_callback(null, null, error)
				return
		}
		if (then_callback)
			return then_callback(results, fields)
		
		if (results.length == 0)
			if (onZero_callback)
				return onZero_callback(results, fields)

		if (results.length == 1){
			if (onOne_callback)
				return onOne_callback(results, fields)
		}
		
		if (results.length > 0)
			if (onAny_callback)
				return onAny_callback (results, fields)

		if (default_callback)
			return default_callback (results, fields)
		
	})

	var api = { error, then, onAny, onOne, onZero}

	function error(callback){
		error_callback = callback
		return api
	}
	function then(callback){
		then_callback = callback
		return api
	}
	function onAny(callback){
		onAny_callback = callback
		return api
	}
	function onOne(callback){
		onOne_callback = callback
		return api
	}
	function onZero(callback){
		onZero_callback = callback
		return api
	}


	return api
};



function INSERT_INTO(table, record){
	var sql_string = 'INSERT INTO $table SET $record'

	if(record.constructor == Array)
		record = record
					.map((el)=>{
						if (el.constructor == Array){
							if(el[1].constructor == String)
								el[1] = `"${el[1]}"`
							return el.join('=')
						}
						return el
					})
					.join(',')

	sql_string = sql_string
						.replace('$table', table)
						.replace('$record', record)

	return new SQL(sql_string)
}

function SELECT(fields, table, where, callback){
	var sql_string = 'SELECT $fields FROM $table WHERE $where'

	if(!where)
		where = '1'

	if(fields.constructor == Array)
		fields = fields.join(',')
	
	if(table.constructor == Array)
		table = table.join(' NATURAL JOIN ')

	if(where.constructor == Array)
		where = where
					.map((el)=>{
						if (el.constructor == Array){
							if(el[1].constructor == String)
								el[1] = `"${el[1]}"`
							return el.join('=')
						}
						return el
					})
					.join(' AND ')

	sql_string = sql_string
						.replace('$fields', fields)
						.replace('$table', table)
						.replace('$where', where)

	return new SQL(sql_string)
}

module.exports = { SELECT, INSERT_INTO }