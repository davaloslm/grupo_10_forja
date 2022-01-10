const express = require("express");
const router = express.Router();

const {nosotros} = require('../controllers/nosotrosControllers')

router.get('/', nosotros);

module.exports = router;