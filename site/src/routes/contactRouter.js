const express = require("express");
const router = express.Router();
const {contact} = require('../controllers/contactController.js')

router.get('/', contact);

module.exports = router;