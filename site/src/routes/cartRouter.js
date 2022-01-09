const express = require("express");
const router = express.Router();
const {cart} = require('../controllers/productController.js')
const {agregarAlCarrito} = require('../controllers/cartController.js')

router.get('/cart', cart);






module.exports = router;