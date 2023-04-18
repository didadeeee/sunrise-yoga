const express = require("express");
const path = require("path");
const logger = require("morgan");
require("dotenv").config();
require("./config/sqldatabase");
const database = require("./config/database");

// database.connect();

const userRouter = require("./routes/userRouter");
const yogaRouter = require("./routes/yogasRouter");
// const exhibitionRouter = require("./routes/exhibitionsRouter");
// const locationRouter = require("./routes/locationsRouter");
// const commentRouter = require("./routes/commentsRouter");
// const directionsRouter = require("./routes/directionsRouter");

const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 3001;

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

const isLoggedIn = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (decode) {
      res.locals.user = decode.user;
      next();
    } else {
      res.status(403).json({ message: "sorry" });
    }
  } catch (error) {
    res.status(403).json({ error });
  }
};

app.use("/api/users", userRouter);
app.use("/api", yogaRouter);
// app.use("/api/artworks", artworkRouter);
// app.use("/api/locations", locationRouter);
// app.use("/api", commentRouter);
// app.use("/api/map/directions", directionsRouter);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

setTimeout(() => {
  app.listen(port, () => {
    console.log(`Express listening on port ${port}`);
  });
}, 1000); // add a delay of 3 seconds before starting the server

module.exports = app;
