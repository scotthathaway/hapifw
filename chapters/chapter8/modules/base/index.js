exports.register = function(server, options, next) {
  var views_config;
  views_config = {
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'templates'
  };
  server.views(views_config);
  server.route({
    path: '/',
    method: 'GET',
    config: {
      auth: 'standard',
      handler: function(request, reply) {
        if (request.auth.isAuthenticated) {
          return reply.redirect('/home');
        } else {
          return reply.redirect('/login');
        }
      }
    }
  });
  server.route({
    path: '/home',
    method: 'GET',
    handler: require('./home')
  });
  server.route({
    method: 'GET',
    path: '/public/{path*}',
    handler: {
      directory: {
        path: './public',
        index: false,
        listing: true
      }
    }
  });
  return next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};
