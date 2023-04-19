const userController = require("../controllers/usersController");
const userCtrl = require("../controllers/usersCtrl");
const express = require("express");
const router = express.Router();

// (/api/users)
router.post("/", userCtrl.create);
router.post("/login", userController.login);
router.post("/setbirthday", userCtrl.setBirthday);

module.exports = router;