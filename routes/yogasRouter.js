var express = require("express");
var router = express.Router();
const yogasController = require("../controllers/yogasController");

// start from /api
router.get("/", yogasController.showYogas);
router.get('/', yogasController.filteredYogas);
router.get("/yogas/:id", yogasController.showSelectedYogas);
router.post("/yogas/:id", yogasController.bookmarkYogas);

module.exports = router;