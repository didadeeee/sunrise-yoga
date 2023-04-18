const pool = require("../config/sqldatabase");

const showYogas = async (req, res) => {
  pool.connect((err, client, done) => {
    if (err) {
      console.error("Error acquiring client", err.stack);
      return res.status(500).json({ message: "Error acquiring client" });
    }
    client.query("SELECT * FROM yogas", (err, result) => {
      if (err) {
        console.error("Error executing query", err.stack);
        return res.status(500).json({ message: "Error executing query" });
      }
      res.json(result.rows);
      client.release();
    });
  });
};


const showSelectedYogas = async (req, res) => {
    const name = req.params.id;
    pool.connect((err, client, done) => {
      if (err) {
        console.error("Error acquiring client", err.stack);
        return res.status(500).json({ message: "Error acquiring client" });
      }
      client.query(
        `SELECT * FROM yogas WHERE id = '${name}';`,
        (err, result) => {
          if (err) {
            console.error("Error executing query", err.stack);
            return res.status(500).json({ message: "Error executing query" });
          }
          res.json(result.rows[0]);
          client.release();
        }
      );
    });
  };
  
  module.exports = { showYogas, showSelectedYogas };