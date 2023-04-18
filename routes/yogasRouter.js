var express = require("express");
var router = express.Router();
const yogasController = require("../controllers/yogasController");

// start from /
router.get("/", yogasController.showYogas);
// router.get("/:dogName", dogCtrl.showSelectedDogs);
// router.post("/search")

module.exports = router;