const express = require("express");
const router = express.Router();
const { categoria } = require('../controllers/categoriasController.js')

router.get('/:categoria', categoria );/* ???? */




module.exports = router;