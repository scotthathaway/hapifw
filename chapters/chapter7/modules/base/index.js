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
