const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Kozhevnykov1311",
  database: "watch_history_youtube",
});

exports.db = db;
