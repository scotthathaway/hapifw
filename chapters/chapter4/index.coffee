Glue     = require('glue')
manifest = require('./config/manifest.json')
options  =
	relativeTo: __dirname + '/modules'

Glue.compose(manifest, options, (err, server) ->
	server.start( (err) ->
    	console.log "Server running at: #{server.info.uri}"
	)
)
