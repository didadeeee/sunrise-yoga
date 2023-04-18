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


// const showSelectedYogas = async (req, res) => {
//     const name = req.params.dogName;
//     pool.connect((err, client, done) => {
//       if (err) {
//         console.error("Error acquiring client", err.stack);
//         return res.status(500).json({ message: "Error acquiring client" });
//       }
//       client.query(
//         `SELECT * FROM yogas WHERE name = '${name}';`,
//         (err, result) => {
//           if (err) {
//             console.error("Error executing query", err.stack);
//             return res.status(500).json({ message: "Error executing query" });
//           }
//           res.json(result.rows[0]);
//           client.release();
//         }
//       );
//     });
//   };
  
  module.exports = { showYogas };