const express = require("express");
const router = express.Router();
const { listaProductos } = require("../../controllers/api/productApiController");

router.get("/products", listaProductos);



module.exports = router;