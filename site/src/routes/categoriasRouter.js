const express = require("express");
const router = express.Router();
const { category } = require('../controllers/categoriasController.js')

router.get('/:categoria', category );/* ???? */




module.exports = router;