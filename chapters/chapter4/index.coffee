Hapi   = require("hapi")
server = new Hapi.Server()

server.connection(
	host: "localhost"
	port: 3000
)

server.route(
	method: "GET"
	path: "/"
	handler: (request, reply) ->
		return reply("<h1>Hello Hapi!</h1>")
)

server.start( (err) ->
	console.log "Hapi @ #{server.info.uri}"
)
