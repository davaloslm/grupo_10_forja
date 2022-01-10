const express = require("express");
const router = express.Router();
const { list, buscador } = require("../controllers/productController")

router.get("/", list);

router.get("/search", buscador);




module.exports = router;