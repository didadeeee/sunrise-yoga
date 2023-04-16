const userController = require("../controllers/usersController");
const express = require("express");
const router = express.Router();

// (/api/users)
router.post("/", userController.create);
router.post("/login", userController.login);
router.post("/setbirthday", userController.setBirthday);

module.exports = router;