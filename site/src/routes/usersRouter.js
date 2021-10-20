const express = require('express');
const router = express.Router();
const multerUser = require('../middlewares/multerUser');
const { cart, vistaRegistro, vistaLogin, login, userProfile, registro, cerrarSesion } = require("../controllers/usersController");
const invitado = require('../middlewares/invitado');


/* GET users listing. */

router.get('/login', invitado, vistaLogin);
router.post('/login',  login);

router.get('/register', invitado, vistaRegistro);
router.post('/register', multerUser.single('imagen'), registro); //Registro de usuarios / foto de perfil


router.get('/userProfile/:id',  userProfile);
router.get('/cerrarSesion', cerrarSesion)

router.get('/cart',  cart);

module.exports = router;
