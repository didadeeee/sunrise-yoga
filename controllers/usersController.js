const pool = require("../config/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const mailgen = require("mailgen");
const JWT_SECRET = process.env.JWT_SECRET;

const SALT_ROUNDS = 10;

const create = async (req, res) => {
  const { name, email, birthday, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const { rows } = await pool.query(
      `INSERT INTO users(name, email, birthday, password) VALUES($1,$2,$3,$4) RETURNING *;`,
      [name, email, birthday, hashedPassword]
    );
    const newUser = rows[0];
    console.log("newUser", newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const signUpEmail = async (req, res) => {
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
      link: "https://sunrise-yoga.onrender.com/",
    },
  });

  const response = {
    body: {
      name: `${state.name}`,
      intro:
        "Welcome! Here's a special gift for you: DISCOUNT15 for storewide 15% off. While stock lasts!",
    },
  };

  const mail = mailGenerator.generate(response);

  const message = {
    from: process.env.EMAIL,
    to: `${state.email}`,
    subject: "Welcome to the Sunrise Yoga Family!",
    html: mail,
  };
  try {
    await transporter.sendMail(message);
    console.log("Sign Up Email Successfully Sent");
  } catch (error) {
    console.error(error);
    console.log("Error Sending Email");
  }
};

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
      SET name = $1, email = $2, birthday = $3
      WHERE id = $4
      RETURNING *;`,
      [name, email, birthday, users_id]
    );
    const newUser = rows[0];
    console.log("newUser", newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const checkBookmark = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const users_id = decodedToken.user.id;
  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT * FROM usersyoga WHERE users_id = $1;`,
      [users_id]
    );
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).json({ message: "Error executing query" });
  }
};

module.exports = {
  create,
  signUpEmail,
  login,
  account,
  updateAccount,
  checkBookmark,
  showBookmarkYogas,
};
