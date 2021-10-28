const usuarios = require("../data/users.json");
const path = require("path");
const {check} = require('express-validator');

const userProfileValidator = [
    check('nombre')
        .notEmpty().withMessage('El campo nombre es obligatorio').bail()
        .isLength({min: 2, max: 15}).withMessage('Tu nombre debe tener un mínimo de 2 caracteres y un máximo de 15').bail()
        .trim(),
    check('apellido')
        .notEmpty().withMessage('El campo apellido es obligatorio').bail()
        .isLength({min: 2, max: 50}).withMessage('Tu apellido debe tener un mínimo de 2 caracteres y un máximo de 15').bail()
        .trim(),
    check('email')
        .notEmpty().withMessage('El campo E-mail es obligatorio').bail()
        .isEmail().withMessage('El formato de E-mail debe ser válido').bail()
        .trim().bail()
        .custom((value, {req})=>{
            if(usuarios.find(usuario=>usuario.email === value) && req.session.usuarioLogueado.email !== value){
                throw new Error("Este e-mail ya está registrado en nuestra base de datos")
            } return true
        }),
    check('telefono')
        .notEmpty().withMessage('El campo teléfono es obligatorio').bail()
        .isInt().withMessage('Solo se pueden ingresar números').bail()
        .isLength({min: 8, max: 20}).withMessage('Tu teléfono debe tener un mínimo de 8 dígitos y un máximo de 20').bail()
        .trim().bail()

]

module.exports = userProfileValidator;