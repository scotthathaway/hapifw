module.exports = (request, reply) ->
	context =
		pageTitle: 'Home Page'
		names: [
			{name: 'Scott'}
			{name: 'Angela'}
		]
	reply.view('home', context)
