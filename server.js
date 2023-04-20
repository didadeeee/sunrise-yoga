const express = require("express");
const path = require("path");
const logger = require("morgan");
require("dotenv").config();
require("./config/database");

const userRouter = require("./routes/userRouter");
const yogaRouter = require("./routes/yogasRouter");

const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 3001;

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

app.use("/api/users", userRouter);
app.use("/api", yogaRouter);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

setTimeout(() => {
  app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
  });
}, 1000); // add a delay of 3 seconds before starting the server

module.exports = app;
