const pool = require("../config/sqldatabase");

const showYogas = async (req, res) => {
  pool.connect((err, client, done) => {
    if (err) {
      console.error("Error acquiring client", err.stack);
      return res.status(500).json({ message: "Error acquiring client" });
    }
    client.query("SELECT * FROM yoga", (err, result) => {
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
    const id = req.params.id;
    pool.connect((err, client, done) => {
      if (err) {
        console.error("Error acquiring client", err.stack);
        return res.status(500).json({ message: "Error acquiring client" });
      }
      client.query(
        `SELECT * FROM yoga WHERE id = '${id}';`,
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
  
  const filteredYogas = (duration, intensity, callback) => {
    const query = `SELECT * FROM yoga WHERE duration = ? AND intensity = ?`;
    const values = [duration, intensity];
    connection.query(query, values, (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  };

  module.exports = { showYogas, showSelectedYogas, filteredYogas };