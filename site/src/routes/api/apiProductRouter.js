const express = require("express");
const router = express.Router();
const { listaProductos } = require("../../controllers/api/productApiController");

router.get("/", listaProductos);



module.exports = router;