const express = require("express");
const router = express.Router();
const {admin, crearProducto} = require('../controllers/adminController')

router.get('/', admin);
router.get('/crearProducto', crearProducto);


module.exports = router;