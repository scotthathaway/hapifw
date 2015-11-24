module.exports = (request, reply) ->
	context =
		pageTitle: 'Home Page - Hapi Framework'
		names: [
			{name: 'Scott'}
			{name: 'Angela'}
			{name: 'Matthew'}
			{name: 'Kaylie'}
			{name: 'Joshua'}
			{name: 'Karis'}
		]
	reply.view('home', context)
