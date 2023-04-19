var express = require("express");
var router = express.Router();
const yogasController = require("../controllers/yogasController");

// start from /api
router.get("/", yogasController.showYogas);
router.get("/yogas/:id", yogasController.showSelectedYogas);
router.get('/', yogasController.filteredYogas);
// router.post("/search")

module.exports = router;