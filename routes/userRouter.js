const userController = require("../controllers/usersController");
const express = require("express");
const router = express.Router();

// starting from /api/users
router.post("/signup", userController.create);
router.post("/signupemail", userController.signUpEmail);
router.post("/login", userController.login);
router.get("/account", userController.account);
router.put("/edit", userController.updateAccount);
router.get("/checkbookmark", userController.checkBookmark);
router.get("/bookmarks", userController.showBookmarkYogas);

module.exports = router;
