// importação de utilitários
const path = require('path')
const fs = require('fs')

// importação da biblioteca 
const mysql = require('mysql')
var db_conf = 	JSON.parse(	fs.readFileSync(
									path.join(__dirname , '../', 'conf', 'db-conf.json')
								)
							)


// internal functions
		function connect_db(){ return mysql.createConnection(db_conf) }
		function disconnect_db(connection){ connection.end() }
		function dispatch_sql(sql_string, callback){ 
			connection = connect_db()
			connection.query(sql_string, callback)
			disconnect_db(connection)
			return
		}

// SQL type constructor
		function SQL(sql_string){
			this.sql_string = sql_string
		}

// SQL.prototype.exec() conecta ao banco de dados e executa a query
		SQL.prototype.exec = function() {
			var then_callback = null
			var error_callback = null
			var onAny_callback = null
			var onOne_callback = null
			var onZero_callback = null
			var onMoreThanOne_callback = null
			console.time('SQL_EXEC')
			dispatch_sql(this.sql_string,(error,results,fields)=>{
				//
				console.timeEnd('SQL_EXEC')
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

			var api = { error, then, onAny, onOne, onZero}
			return api
		};


// INSERT_INTO
// table: String contendo o nome da tabela à inserir dados
// record: 	String no formato 'field1 = value1, field2 = value2, ....'
//			Array de Arrays no formato [['field1','value1'],['field2','value2'],[..]..]
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


// SELECT
// fields: 	String com o nome dos campos e.g. 'field1, field2,...'
//			Array contendo o nome dos campos e.g. ['field1','field2',...]
//
// table: 	String com nome da tabela ou junção de tabelas
//				e.g. 'TABLE_1'
//				e.g. 'TABLE_1 INNER JOIN TABLE_2 ON field1 = field2'
//			Array com nomes de tabelas para usar junção natural
//				e.g. ['TABLE_1','TABLE_2',...] será traduzido para
//						'TABLE_1 NATURAL JOIN TABLE_2 NATURAL JOIN ...'
// where: 	String contendo condições
//				e.g. 'field1 = "comparative1" AND field2 = "comparative2"'
//			Array de arrays contendo as comparações
//				e.g. [['field1','comparative1'],['field2','compartive2'],..]
//					obs: operador lógico AND é atribuido ao concatenar array em string
//			null para não ter nenhuma comparação WHERE
function SELECT(fields='*', table, where='1'){
	var sql_string = 'SELECT $fields FROM $table WHERE $where'

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

function UPDATE(table, record, where='1'){
	var sql_string = 'UPDATE $table SET $record WHERE $where'

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
						.replace('$record', record)
						.replace('$table', table)
						.replace('$where', where)

	return new SQL(sql_string)
}


// Exporting functions
module.exports = { SELECT, INSERT_INTO, UPDATE, SQL}