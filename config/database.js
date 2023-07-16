const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: "postgres",
  host: "arjuna.db.elephantsql.com",
  database: "sunrise-yoga",
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