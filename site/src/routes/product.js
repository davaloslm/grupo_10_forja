const express = require("express");
const path = require("path");
const router = express.Router();
const { product } = require("../controllers/productController")

router.get("/", product);




module.exports = router;