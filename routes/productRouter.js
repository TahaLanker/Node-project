const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/productCtrl");

router.get("/", productCtrl.get);
router.post("/", productCtrl.add);
router.get("/id/:id", productCtrl.getById);
router.get("/page/:page/size/:size", productCtrl.get);
router.get("/page/:page", productCtrl.get);
router.get("/size/:size", productCtrl.get);
router.delete("/id/:id", productCtrl.remove);
router.put("/id/:id", productCtrl.put);
module.exports = router;
