const express = require("express");
const router = express.Router();
const {admin, vistaCrear, vistaEditar, editar, crear, eliminar, eliminarUsuarios} = require('../controllers/adminController')
const adminPass = require('../middlewares/adminPass');
const editProductValidator = require("../middlewares/editProductValidator");
const multerProduct = require('../middlewares/multerProduct');
const newProductValidator = require('../middlewares/newProductValidator');

router.get('/', adminPass, admin);

///////// creacion de productos //////////
////Formulario de creacion - vista///////
router.get('/create', adminPass, vistaCrear);
///Crear producto///
router.post('/', multerProduct.array('imagenes'), newProductValidator, crear);

///////// Edición de productos //////////
// Formulario de edición - Vista
router.get('/edit/:id', adminPass, vistaEditar);

// Editar producto - Guardar
router.put('/edit/:id', editProductValidator, editar);

//Eliminar producto//
router.delete("/edit/:id", eliminar);

//////// Administración de usuarios /////////

module.exports = router;