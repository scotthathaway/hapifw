query = (sql,log=false,cfg='') ->
	if cfg is '' then cfg={host:'localhost',user:'hapifw',password:'hapifw',database:'hapi'}
	mysql = require("promise-mysql")
	_     = require("lodash")
	mysql.createConnection(cfg).then((conn) ->
		conn.query(sql).then((rows) ->
			if rows==[]
				return []
			else
				keys = _.keys(rows[0])
				rs = []
				for i,row of rows
					rs[i] = {}
					for key in keys
						rs[i][key] = row[key]
				conn.end()
				return rs
		).catch((error) ->
			conn.end()
		    return []
		)
	)

module.exports.query = query
