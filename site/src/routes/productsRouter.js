const express = require("express");
const router = express.Router();
const { list } = require("../controllers/productController")

router.get("/", list);




module.exports = router;