var express = require('express');
var router = express.Router();
const { index, acceso } = require("../controllers/indexController")

/* GET home page. */
router.get('/', index);

// Vista de acceso 
router.get('/acceso', acceso);

module.exports = router;
