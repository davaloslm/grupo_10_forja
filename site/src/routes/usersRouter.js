const express = require('express');
const router = express.Router();
const cargaDeImagen = require('../middlewares/cargaDeImagen');
const { cart, vistaRegistro, login, userProfile, registro } = require("../controllers/usersController")


/* GET users listing. */
router.get('/cart',  cart);

router.get('/register',  vistaRegistro);
router.post('/register', cargaDeImagen.single('imagen'), registro); //Registro de usuarios / foto de perfil

router.get('/login',  login);
router.get('/userProfile/:id',  userProfile);

module.exports = router;
