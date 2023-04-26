const pool = require("../config/database");
const jwt = require("jsonwebtoken");

const showYogas = async (req, res) => {
  pool.connect((err, client, done) => {
    if (err) {
      console.error("Error acquiring client", err.stack);
      return res.status(500).json({ message: "Error acquiring client" });
    }
    client.query(
      "SELECT * FROM yoga LEFT JOIN instructoryoga ON yoga.id = instructoryoga.yoga_id LEFT JOIN instructor ON instructoryoga.instructor_id = instructor.id;",
      (err, result) => {
        if (err) {
          console.error("Error executing query", err.stack);
          return res.status(500).json({ message: "Error executing query" });
        }
        res.json(result.rows);
        client.release();
      }
    );
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
      `SELECT *FROM yoga LEFT JOIN instructoryoga ON yoga.id = instructoryoga.yoga_id LEFT JOIN instructor ON instructoryoga.instructor_id = instructor.id WHERE yoga.id = '${id}'`,
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

const filteredYogas = (duration, intensity, name, callback) => {
  const query = `SELECT *FROM yoga LEFT JOIN instructoryoga ON yoga.id = instructoryoga.yoga_id LEFT JOIN instructor ON instructoryoga.instructor_id = instructor.id WHERE yoga.duration = ? AND yoga.intensity = ? AND instructor.name = ? `;
  const values = [duration, intensity, name];
  connection.query(query, values, (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  });
};

const bookmarkYogas = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const users_id = decodedToken.user.id;
    const yoga_id = req.params.id;
    if (!yoga_id) {
      throw new Error("yoga_id is required");
    }
    const { rows } = await pool.query(
      `INSERT INTO usersyoga (users_id, yoga_id) VALUES ('${users_id}', '${yoga_id}') RETURNING *;`
    );
    const newUserYoga = rows[0];
    return res.json({ message: "Bookmark created", data: newUserYoga });
  } catch (error) {
    if (error && error.name === "ValidationError") {
      throw new Error(error.errors.join(", "));
    }
  }
};

const unbookmarkYogas = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const users_id = decodedToken.user.id;
    const yoga_id = req.params.id;
    if (!yoga_id) {
      throw new Error("yoga_id is required");
    }
    const result = await pool.query(
      `DELETE FROM usersyoga WHERE users_id = '${users_id}' AND yoga_id = '${yoga_id}';`
    );
    return res.json({ message: "Bookmark deleted" });
  } catch (error) {
    if (error && error.name === "ValidationError") {
      throw new Error(error.errors.join(", "));
    }
  }
};

module.exports = {
  showYogas,
  showSelectedYogas,
  filteredYogas,
  bookmarkYogas,
  unbookmarkYogas,
};
