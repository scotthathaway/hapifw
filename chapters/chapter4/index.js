var Hapi, server;

Hapi = require("hapi");

server = new Hapi.Server();

server.connection({
  host: "localhost",
  port: 3000
});

server.route({
  method: "GET",
  path: "/",
  handler: function(request, reply) {
    return reply("<h1>Hello Hapi!</h1>");
  }
});

server.start(function(err) {
  return console.log("Hapi @ " + server.info.uri);
});
