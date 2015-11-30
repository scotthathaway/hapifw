Promise = require('bluebird')

exports.register = (server, options, next) ->
    server.register([{register: require('hapi-auth-cookie')}], (err) ->
        if err
            throw err

	        # server authentication strategy
	        server.auth.strategy('standard', 'cookie', {
	            password: 'hardToGuessCookieSecret',
	            cookie: 'app-cookie',
	            isSecure: false,
	            ttl: 24 * 60 * 60 * 1000 # 1 day
    		})
    )

    views_config = {
        engines:
            html: require('handlebars')
        relativeTo: __dirname
        path: 'templates'
    }
    server.views(views_config)

    server.auth.default({
        strategy: 'standard',
        scope: ['admin']
    })

    server.route({
        method: 'GET',
        path: '/login',
        config: {
            auth: false,
            handler: require('./login')
        }
    })

    server.route({
        method: 'POST',
        path: '/login',
        config: {
            auth: false,
            handler: (request, reply) ->
                getUser(request.payload.username, request.payload.password).then((user) ->
                    if user
                        request.auth.session.set(user)
                        return reply.redirect('/home')
                    else
                        return reply('Bad email or password')
                )
                .catch((err) ->
                    return reply('Login Failed')
                )
        }
    })

    server.route({
        method: 'GET',
        path: '/logout',
        config: {
            auth: false,
            handler: (request, reply) ->
                request.auth.session.clear()
                return reply('Logout Successful!')
        }
    })
    next()

exports.register.attributes = {
    name: 'auth'
}

getUser = (email, password) ->
    sql = "select id,name,email,scope from people where email='#{email}' and password='#{password}'"
    r = new Promise((fulfill, reject) ->
        db = Promise.promisifyAll(require("../../libs/db"))
        return db.query(sql).then((rs)->
            if rs.length > 0
                rs[0].scope = [rs[0].scope]
                return fulfill(rs[0])
            else
                return reject(null)
        )
    )
    return r
