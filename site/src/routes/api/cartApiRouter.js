const express = require("express");
const router = express.Router();
const { cart, agregarAlCarrito, borrarDelCarrito, cambiarCantidad} = require("../../controllers/api/cartApiController");

router.get("/", cart);

router.post("/add/:id/:cant", agregarAlCarrito);

router.delete('/delete/:id', borrarDelCarrito);

router.put("/changeQuantity/:id/:cant", cambiarCantidad);



module.exports = router;