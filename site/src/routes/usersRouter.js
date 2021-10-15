const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { cart, vistaRegistro, login, userProfile, registro } = require("../controllers/usersController")

// MULTER //
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/img/users')
    },
    filename: function (req, file, callback) {
        callback(null, `img-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

/* GET users listing. */
router.get('/cart',  cart);

router.get('/register',  vistaRegistro);
router.post('/register', upload.single('imagen'), registro); //Registro de usuarios / foto de perfil

router.get('/login',  login);
router.get('/userProfile/:id',  userProfile);

module.exports = router;
