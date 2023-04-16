const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const mailgen = require("mailgen");
const cron = require("node-cron");

const JWT_SECRET = process.env.JWT_SECRET;

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

const create = async (req, res) => {
  const { password } = req.body;
  if (password.length < 5) {
    res
      .status(400)
      .json({ message: "Password is too short, Please Try Again." });
    return;
  }

  try {
    const user = await User.create(req.body);
    const payload = { user };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 60 }); // 1hr
    res.status(201).json(token);
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  const { email, password, birthday } = req.body;
  if (password.length < 5) {
    res.status(400).json({ message: "Incorrect Password" });
    return;
  }

  try {
    const user = await User.findOne({ email });
    if (user === null) {
      res.status(401).json({ message: "No user found, Please sign up." });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const payload = { user };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 60 });
      res.status(200).json({ token });
      console.log("user login successful");
    } else {
      res.status(401).json({ message: "Wrong password" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  create,
  login,
  setBirthday,
};
