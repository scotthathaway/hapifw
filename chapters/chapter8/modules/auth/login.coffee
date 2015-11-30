module.exports = (request, reply) ->
	context = {
		pageTitle: 'Hapi Framework - Login'
	}
	reply.view('login', context)
