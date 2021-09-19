const express = require("express");
const router = express.Router();
const {cart} = require('../controllers/productController.js')

router.get('/cart', cart);



module.exports = router;