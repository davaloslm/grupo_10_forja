const express = require('express');
const router = express.Router();
const multerUser = require('../middlewares/multerUser');
const { cart, agregarAlCarrito, borrarDelCarrito, vistaRegistro, vistaLogin, login, registro, cerrarSesion, vistaUserProfile, editUserProfile, vistaCambiarContraseña, cambiarContraseña, vistaAgregarDireccion, agregarDireccion, vistaEditarDireccion, editarDireccion, eliminarDireccion} = require("../controllers/usersController");
const guestUserCheck = require('../middlewares/guestUserCheck');
const loggedUserCheck = require('../middlewares/loggedUserCheck');
const registerValidator = require('../middlewares/registerValidator');
const loginValidator = require ('../middlewares/loginValidator');
const userProfileValidator = require ('../middlewares/userProfileValidator');
const passwordValidator = require ('../middlewares/passwordValidator');
const addressValidator = require ('../middlewares/addressValidator');


/* GET users listing. */

router.get('/login', guestUserCheck, vistaLogin);
router.post('/login', loginValidator, login);

router.get('/register', guestUserCheck, vistaRegistro);
router.post('/register',  multerUser.single('imagen'), registerValidator, registro); //Registro de usuarios / foto de perfil


router.get('/userProfile/:id', loggedUserCheck, vistaUserProfile);
router.put('/userProfile/:id', multerUser.single('avatar'), userProfileValidator, editUserProfile);

router.get('/cerrarSesion', cerrarSesion)

router.get('/password', loggedUserCheck,  vistaCambiarContraseña);
router.put('/password', passwordValidator, cambiarContraseña);

router.get('/address/add', loggedUserCheck, vistaAgregarDireccion);
router.post('/address/add', addressValidator, agregarDireccion);

router.get('/address/edit/:addressId', loggedUserCheck, vistaEditarDireccion);
router.put('/address/edit/:addressId', addressValidator, editarDireccion);

router.delete("/address/delete/:addressId", eliminarDireccion);

/* cart */

router.get('/cart', loggedUserCheck,  cart);

router.post('/cart/agregar/:id', agregarAlCarrito);

router.delete('/cart/borrar/:id', borrarDelCarrito);


module.exports = router;
