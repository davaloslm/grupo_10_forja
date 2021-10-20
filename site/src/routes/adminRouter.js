const express = require("express");
const router = express.Router();
const {admin, vistaCrear, vistaEditar, editar, crear, eliminar} = require('../controllers/adminController')
const adminPass = require('../middlewares/adminPass')

router.get('/', adminPass, admin);

///////// creacion de productos //////////
////Formulario de creacion - vista///////
router.get('/create', adminPass, vistaCrear);
///Crear producto///
router.post('/', crear );

///////// Edición de productos //////////
// Formulario de edición - Vista
router.get('/edit/:id', adminPass, vistaEditar);

// Editar producto - Guardar
router.put('/edit/:id', editar );

//Eliminar producto//
router.delete("/edit/:id", eliminar);

//////// Administración de usuarios /////////

module.exports = router;