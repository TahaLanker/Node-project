const express = require("express");
const orderCtrl = require("../controllers/orderCtrl");
const router = express.Router();

router.get("/", orderCtrl.get);
router.get("/page/:page/size/:size", orderCtrl.get);
router.post("/buy", orderCtrl.add);
module.exports = router;
