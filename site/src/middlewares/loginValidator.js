const usuarios = require("../data/users.json");
const {check} = require('express-validator');

const loginValidator = [
    check('email')
        .notEmpty().withMessage('El campo E-mail es obligatorio').bail()
        .isEmail().withMessage('El formato de E-mail debe ser válido').bail()
        .trim().bail()
        .custom((value)=>{
            if(!usuarios.find(usuario=>usuario.email === value)){
                throw new Error("Este e-mail no está registrado en nuestra base de datos")
            } return true
        }),

    check('contraseña')
        .notEmpty().withMessage('El campo contraseña es obligatorio').bail()
        .isLength({min: 8, max: 20}).withMessage('Tu contraseña debe tener un mínimo de 8 caracteres y un máximo de 20'),
]
module.exports = loginValidator;