// Use the MariaDB Node.js Connector
var mariadb = require('mariadb');



var pool = 
  mariadb.createPool({
    host: "localhost", 
    user: "root", 
    password: "123",
    port: "3306",
    database: "emisiones" 
  });

module.exports = Object.freeze({
  pool: pool
});