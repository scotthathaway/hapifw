exports.register = (server, options, next) ->
	views_config = {
	    engines:
	        html: require('handlebars')
	    relativeTo: __dirname
	    path: 'templates'
	}
	server.views(views_config)

	server.route(
		path: '/'
		method: 'GET'
		config: {
			auth: 'standard'
			handler: (request, reply) ->
				if request.auth.isAuthenticated
					reply.redirect('/home')
				else
					reply.redirect('/login')
		}
	)

	server.route(
		path: '/home'
		method: 'GET'
		handler: require('./home')
	)

	server.route(
		method: 'GET'
		path: '/public/{path*}'
		handler:
			directory:
				path: './public'
				index: false
				listing: true
	)

	next()

exports.register.attributes =
	pkg: require('./package.json')
