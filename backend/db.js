const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mysql@123",
  database: "smart_retail",
});

connection.connect((err) => {
  if (err) {
    console.error("Database Connection Failed");
    return;
  }

  console.log("MySQL Connected");
});

module.exports = connection;