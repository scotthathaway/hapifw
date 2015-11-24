var query;

query = function(sql, log, cfg) {
  var mysql, _;
  if (log == null) {
    log = false;
  }
  if (cfg == null) {
    cfg = '';
  }
  if (cfg === '') {
    cfg = {
      host: 'localhost',
      user: 'scott',
      password: 'kaylie',
      database: 'hapi'
    };
  }
  mysql = require("promise-mysql");
  _ = require("lodash");
  return mysql.createConnection(cfg).then(function(conn) {
    return conn.query(sql).then(function(rows) {
      var i, key, keys, row, rs, _i, _len;
      if (rows === []) {
        return [];
      } else {
        keys = _.keys(rows[0]);
        rs = [];
        for (i in rows) {
          row = rows[i];
          rs[i] = {};
          for (_i = 0, _len = keys.length; _i < _len; _i++) {
            key = keys[_i];
            rs[i][key] = row[key];
          }
        }
        return rs;
      }
    })["catch"](function(error) {
      return [];
    });
  });
};

module.exports.query = query;
