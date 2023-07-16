const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: "eyidedrb",
  host: "arjuna.db.elephantsql.com",
  database: "eyidedrb",
  password: process.env.DB_PASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;

// test database connection
// pool.query("SELECT * FROM yoga", (err, res) => {
//   console.log(err, res.rows[0]);
//   pool.end();
// });