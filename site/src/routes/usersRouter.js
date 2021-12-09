const express = require('express');
const router = express.Router();
const multerUser = require('../middlewares/multerUser');
const { cart, vistaRegistro, vistaLogin, login, registro, cerrarSesion, vistaUserProfile, editUserProfile, vistaCambiarContraseña, cambiarContraseña, vistaAgregarDireccion, agregarDireccion, vistaEditarDireccion, editarDireccion} = require("../controllers/usersController");
const invitado = require('../middlewares/invitado');
const registerValidator = require('../middlewares/registerValidator');
const loginValidator = require ('../middlewares/loginValidator');
const userProfileValidator = require ('../middlewares/userProfileValidator');
const passwordValidator = require ('../middlewares/passwordValidator');


/* GET users listing. */

router.get('/login', invitado, vistaLogin);
router.post('/login', loginValidator, login);

router.get('/register', invitado, vistaRegistro);
router.post('/register',  multerUser.single('imagen'), registerValidator, registro); //Registro de usuarios / foto de perfil


router.get('/userProfile/:id', /* invitado, */ vistaUserProfile);
router.put('/userProfile/:id', multerUser.single('avatar'), userProfileValidator, editUserProfile);

router.get('/cerrarSesion', cerrarSesion)

router.get('/cart',  cart);

router.get('/password',  vistaCambiarContraseña);
router.put('/password', passwordValidator, cambiarContraseña);

router.get('/address/add',  vistaAgregarDireccion);
router.put('/address/add',  agregarDireccion);

router.get('/address/edit',  vistaEditarDireccion);
router.put('/address/edit',  editarDireccion);


module.exports = router;
