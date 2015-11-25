module.exports = function(request, reply) {
  var context;
  context = {
    pageTitle: 'Home Page - Hapi Framework',
    names: [
      {
        name: 'Scott'
      }, {
        name: 'Angela'
      }, {
        name: 'Matthew'
      }, {
        name: 'Kaylie'
      }, {
        name: 'Joshua'
      }, {
        name: 'Karis'
      }
    ]
  };
  return reply.view('home', context);
};
