module.exports = function(request, reply) {
  var context;
  context = {
    pageTitle: 'Home Page',
    names: [
      {
        name: 'Scott'
      }, {
        name: 'Angela'
      }
    ]
  };
  return reply.view('home', context);
};
