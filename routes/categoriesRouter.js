const express = require("express");
const router = express.Router();
const { add } = require("../controllers/categoriesCtrl");
const categoriesCtrl = require("../controllers/categoriesCtrl");

router.post("/", add);
router.get("/", categoriesCtrl.get);
router.delete("/id/:id", categoriesCtrl.remove);
router.patch("/id/:id", categoriesCtrl.update);

module.exports = router;
