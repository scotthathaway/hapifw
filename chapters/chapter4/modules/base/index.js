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
    path: '/about',
    method: 'GET',
    handler: require('./about')
  });
  return next();
};

exports.register.attributes = {
  pkg: require('./package.json')
};
