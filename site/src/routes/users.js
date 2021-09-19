var express = require('express');
var router = express.Router();
const { cart } = require("../controllers/usersController")

/* GET users listing. */
router.get('/cart',  cart);

module.exports = router;
