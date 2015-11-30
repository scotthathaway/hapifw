var Promise, getUser;

Promise = require('bluebird');

exports.register = function(server, options, next) {
  var views_config;
  server.register([
    {
      register: require('hapi-auth-cookie')
    }
  ], function(err) {
    if (err) {
      throw err;
    }
    return server.auth.strategy('standard', 'cookie', {
      password: 'hardToGuessCookieSecret',
      cookie: 'app-cookie',
      isSecure: false,
      ttl: 24 * 60 * 60 * 1000
    });
  });
  views_config = {
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'templates'
  };
  server.views(views_config);
  server.auth["default"]({
    strategy: 'standard',
    scope: ['admin']
  });
  server.route({
    method: 'GET',
    path: '/login',
    config: {
      auth: false,
      handler: require('./login')
    }
  });
  server.route({
    method: 'POST',
    path: '/login',
    config: {
      auth: false,
      handler: function(request, reply) {
        return getUser(request.payload.username, request.payload.password).then(function(user) {
          if (user) {
            request.auth.session.set(user);
            return reply.redirect('/home');
          } else {
            return reply('Bad email or password');
          }
        })["catch"](function(err) {
          return reply('Login Failed');
        });
      }
    }
  });
  server.route({
    method: 'GET',
    path: '/logout',
    config: {
      auth: false,
      handler: function(request, reply) {
        request.auth.session.clear();
        return reply('Logout Successful!');
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'auth'
};

getUser = function(email, password) {
  var r, sql;
  sql = "select id,name,email,scope from people where email='" + email + "' and password='" + password + "'";
  r = new Promise(function(fulfill, reject) {
    var db;
    db = Promise.promisifyAll(require("../../libs/db"));
    return db.query(sql).then(function(rs) {
      if (rs.length > 0) {
        rs[0].scope = [rs[0].scope];
        return fulfill(rs[0]);
      } else {
        return reject(null);
      }
    });
  });
  return r;
};
