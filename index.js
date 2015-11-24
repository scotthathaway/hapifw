var Glue, manifest, options;

Glue = require('glue');

manifest = require('./config/manifest.json');

options = {
  relativeTo: __dirname + '/modules'
};

Glue.compose(manifest, options, function(err, server) {
  return server.start(function(err) {
    return console.log("Server running at: " + server.info.uri);
  });
});
