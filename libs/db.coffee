query = (sql,log=false,cfg='') ->
	if cfg is '' then cfg={host:'localhost',user:'scott',password:'kaylie',database:'hapi'}
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
				return rs
		).catch((error) ->
		    return []
		)
	)

module.exports.query = query
