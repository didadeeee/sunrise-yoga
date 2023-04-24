const pool = require("../config/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const mailgen = require("mailgen");
const cron = require("node-cron");
const JWT_SECRET = process.env.JWT_SECRET;

const SALT_ROUNDS = 10;

const setBirthday = async (req, res) => {
  const { state } = req.body;

  const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailGenerator = new mailgen({
    theme: "default",
    product: {
      name: "Sunrise Yoga",
      link: "https://mailgen.js",
    },
  });

  const response = {
    body: {
      name: `${state.name}`,
      intro: `Happy Birthday to you! ${state.name}`,
    },
  };

  const mail = mailGenerator.generate(response);

  const message = {
    from: process.env.EMAIL,
    to: `${state.email}`,
    subject: "Happy Birthday",
    html: mail,
  };
  try {
    await transporter.sendMail(message);
    res.status(200).json({ message: "Birthday email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending birthday email" });
  }
};

cron.schedule("5 4 * * *", async () => {
  try {
    const today = new Date();
    const userBirthday = await User.find({ birthday: today }).exec();
    return userBirthday.some(
      (user) => user.birthday.getTime() === today.getTime()
    );
  } catch (error) {
    console.error(error);
  }
});

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { rows } = await pool.query(
      `SELECT * FROM users WHERE email = '${email}'`
    );
    const user = rows[0];
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Wrong password" });
    }
    const payload = { user };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });
    res.status(200).json({ token, user });
  } catch (error) {
    if (error && error.name === "ValidationError") {
      return res.status(400).json({ message: error.errors.join(", ") });
    }
    res.status(500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  const { name, email, birthday, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const { rows } = await pool.query(
      `INSERT INTO users(name, email, birthday, password) VALUES('${name}','${email}', '${birthday}', '${hashedPassword}') RETURNING *;`
    );
    const newUser = rows[0];
    console.log("newUser", newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateAccount = async (req, res) => {
  const { name, email, birthday } = req.body;
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const users_id = decodedToken.user.id;
  try {
    const { rows } = await pool.query(
      `UPDATE users
      SET name = '${name}', email = '${email}', birthday = '${birthday}'
      WHERE id = '${users_id}'
      RETURNING *;`
    );
    const newUser = rows[0];
    console.log("newUser", newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

// const updateAccount = async (req, res) => {
//   const { name, email, birthday, password } = req.body;
//   if (!req.headers.authorization) {
//     return res.status(401).json({ message: "Authorization header is missing" });
//   }
//   const token = req.headers.authorization.split(" ")[1];
//   const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//   const users_id = decodedToken.user.id;
//   try {
//     const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
//     const { rows } = await pool.query(
//       `UPDATE users
//       SET name = '${name}', email = '${email}', birthday = '${birthday}', password = '${hashedPassword}'
//       WHERE id = '${users_id}'
//       RETURNING *;`
//     );
//     const newUser = rows[0];
//     console.log("newUser", newUser);
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };




const showBookmarkYogas = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const users_id = decodedToken.user.id;
  pool.connect((err, client, done) => {
    if (err) {
      console.error("Error acquiring client", err.stack);
      return res.status(500).json({ message: "Error acquiring client" });
    }
    client.query(
      `SELECT *FROM yoga LEFT JOIN usersyoga ON yoga.id = usersyoga.yoga_id LEFT JOIN users ON usersyoga.users_id = users.id WHERE users.id = '${users_id}'`,
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

const account = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const users_id = decodedToken.user.id;
  pool.connect((err, client, done) => {
    if (err) {
      console.error("Error acquiring client", err.stack);
      return res.status(500).json({ message: "Error acquiring client" });
    }
    client.query(
      `SELECT * FROM users WHERE id = '${users_id}';`,
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

const checkBookmark = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const users_id = decodedToken.user.id;
  pool.connect((err, client, done) => {
    if (err) {
      console.error("Error acquiring client", err.stack);
      return res.status(500).json({ message: "Error acquiring client" });
    }
    client.query(
      `SELECT * FROM usersyoga WHERE users_id = '${users_id}';`,
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

module.exports = {
  create,
  login,
  account,
  setBirthday,
  showBookmarkYogas,
  checkBookmark,
  updateAccount,
};
