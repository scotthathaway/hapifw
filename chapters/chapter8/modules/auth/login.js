module.exports = function(request, reply) {
  var context;
  context = {
    pageTitle: 'Hapi Framework - Login'
  };
  return reply.view('login', context);
};
