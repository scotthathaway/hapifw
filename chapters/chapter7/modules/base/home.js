module.exports = function(request, reply) {
  var Promise, db;
  Promise = require("bluebird");
  db = Promise.promisifyAll(require("../../libs/db"));
  return db.query("select name from people").then(function(rs) {
    var context;
    context = {
      pageTitle: 'Home Page - Hapi Framework',
      names: rs
    };
    return reply.view('home', context);
  });
};
