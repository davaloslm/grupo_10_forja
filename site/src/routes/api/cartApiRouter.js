const express = require("express");
const router = express.Router();
const { cart, agregarAlCarrito, borrarDelCarrito} = require("../../controllers/api/cartApiController");

router.get("/", cart);

router.post("/add/:id/:cant", agregarAlCarrito);

router.delete('/delete/:id', borrarDelCarrito);



module.exports = router;