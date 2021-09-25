const express = require("express");
const router = express.Router();
const {admin, crearProducto} = require('../controllers/adminController')

router.get('/admin', admin);
router.get('/admin/crearProducto', crearProducto);


module.exports = router;