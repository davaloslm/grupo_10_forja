const express = require("express");
const router = express.Router();
const {admin, crearProducto, editarProducto} = require('../controllers/adminController')

router.get('/', admin);
router.get('/crearProducto', crearProducto);
router.get('/editarProducto', editarProducto);


module.exports = router;