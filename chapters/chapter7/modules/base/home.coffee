module.exports = (request, reply) ->
	Promise = require("bluebird")
	db = Promise.promisifyAll(require("../../libs/db"))
	db.query("select name from people").then((rs)->
		context =
			pageTitle: 'Home Page - Hapi Framework'
			names: rs
		reply.view('home', context)
	)
