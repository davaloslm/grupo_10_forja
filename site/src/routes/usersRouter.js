var express = require('express');
var router = express.Router();
const { cart, register, login } = require("../controllers/usersController")

/* GET users listing. */
router.get('/cart',  cart);
router.get('/register',  register);
router.get('/login',  login);

module.exports = router;
