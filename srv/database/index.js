'use strict'

const mysql = require('mysql2');
const config = require('../config');

// const init = function() {
//   const connection = mysql.createConnection({
//     host: config.db.host,
//     user: config.db.user,
//     password: config.db.password,
//     database: config.db.database
//   });
//   connection.connect(function(err) {
//     if (err) {
//       throw err;
//     }
//   });
//   return connection;
// }

const init = () => {
  const connection = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  });
  connection.getConnection(function(err) {
    if (err) {
      throw err;
    }
  });
  return connection;
}

module.exports = init();
