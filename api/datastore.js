module.exports = function(config) {
  'use strict';
  var Datastore = require('nedb');
  var db = {};
  
  db.users = new Datastore({
    filename: config.dataDir + config.dbDir + '/users.db',
    autoload: true
  });

  return {
    db: db
  };
};
