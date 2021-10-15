var express = require('express');
var router = express.Router();
const { cart, register, login, userProfile } = require("../controllers/usersController")

/* GET users listing. */
router.get('/cart',  cart);
router.get('/register',  register);
router.get('/login',  login);
router.get('/userProfile/:id',  userProfile);

module.exports = router;
