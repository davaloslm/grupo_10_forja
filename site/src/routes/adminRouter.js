const express = require("express");
const router = express.Router();
const {admin, crearProducto, vistaEdit, editar} = require('../controllers/adminController')

router.get('/', admin);
router.get('/create', crearProducto);

///////// Edición de productos //////////
// Formulario de edición - Vista
router.get('/edit/:id', vistaEdit);

// Editar producto - Guardar
router.put('/edit/:id', editar )

/* router.put */


module.exports = router;