const userController = require("../controllers/usersController");
const express = require("express");
const router = express.Router();

// (/api/users)
router.post("/signup", userController.create);
router.post("/login", userController.login);
router.post("/setbirthday", userController.setBirthday);
router.get("/bookmarks", userController.showBookmarkYogas);

module.exports = router;