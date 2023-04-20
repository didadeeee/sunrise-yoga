const userController = require("../controllers/usersController");
const userCtrl = require("../controllers/usersCtrl");
const express = require("express");
const router = express.Router();

// (/api/users)
router.post("/signup", userCtrl.create);
router.post("/login", userCtrl.login);
router.post("/setbirthday", userCtrl.setBirthday);

module.exports = router;