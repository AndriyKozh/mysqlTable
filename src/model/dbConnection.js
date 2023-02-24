const mysql = require("mysql");

const db = mysql.createPool({
  host: "",
  user: "",
  password: "",
  database: "",
});

exports.db = db;
