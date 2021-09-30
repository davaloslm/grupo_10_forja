const express = require("express");
const router = express.Router();
const {admin, crearProducto, editarProducto} = require('../controllers/adminController')

router.get('/', admin);
router.get('/create', crearProducto);
router.get('/edit/:id', editarProducto);
/* router.put */


module.exports = router;