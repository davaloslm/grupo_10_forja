const express = require("express");
const path = require("path");
const router = express.Router();
const { detail } = require("../controllers/productController")

router.get("/:id", detail);




module.exports = router;