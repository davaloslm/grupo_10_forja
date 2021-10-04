const express = require("express");
const router = express.Router();
const {admin, vistaCrear, vistaEditar, editar, crear} = require('../controllers/adminController')

router.get('/', admin);

///////// creacion de productos //////////
////Formulario de creacion - vista///////
router.get('/create', vistaCrear);
///Crear producto///
router.post('/', crear );

///////// Edición de productos //////////
// Formulario de edición - Vista
router.get('/edit/:id', vistaEditar);

// Editar producto - Guardar
router.put('/edit/:id', editar )

/* router.put */


module.exports = router;