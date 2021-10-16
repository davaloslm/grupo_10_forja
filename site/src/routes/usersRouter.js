const express = require('express');
const router = express.Router();
const multerUser = require('../middlewares/multerUser');
const { cart, vistaRegistro, vistaLogin, login, userProfile, registro } = require("../controllers/usersController")


/* GET users listing. */
router.get('/cart',  cart);

router.get('/register',  vistaRegistro);
router.post('/register', multerUser.single('imagen'), registro); //Registro de usuarios / foto de perfil

router.get('/login',  vistaLogin);
router.post('/login',  login);

router.get('/userProfile/:id',  userProfile);

module.exports = router;
