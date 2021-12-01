const db = require('../database/models');
const {check} = require('express-validator');

const loginValidator = [
    check('email')
        .notEmpty().withMessage('El campo E-mail es obligatorio').bail()
        .isEmail().withMessage('El formato de E-mail debe ser válido').bail()
        .trim().bail()
        .custom((value)=>{
        db.Usuario.findOne({
            where: {
                email: value
            }
        })
        .then(() => { 
            return true
        })
        .catch(error => {
            throw new Error("Este e-mail no está registrado en nuestra base de datos")
            console.log('*************error catch middleware loginValidator*************');
            console.log(error);
           })
        }),

    check('contraseña')
        .notEmpty().withMessage('El campo contraseña es obligatorio').bail()
        .isLength({min: 8, max: 20}).withMessage('Tu contraseña debe tener un mínimo de 8 caracteres y un máximo de 20'),
]
module.exports = loginValidator;