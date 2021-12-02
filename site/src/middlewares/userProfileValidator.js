const {check} = require('express-validator');
const db = require('../database/models');

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
            return db.Usuario.findOne({
                where: {
                    email: value
                }
            })       
    
            .then(usuario => {
                
                if (usuario !== null && req.session.usuarioLogueado.email !== value){
                    throw new Error("Este e-mail ya está registrado en nuestra base de datos")
                } return true        
            })
            .catch(error => {
                throw new Error("Este e-mail ya está registrado en nuestra base de datos")
                console.log('*************error catch middleware userProfileValidator*************');
                console.log(error);
               })
            }),
    check('telefono')
        .notEmpty().withMessage('El campo teléfono es obligatorio').bail()
        .isInt().withMessage('Solo se pueden ingresar números').bail()
        .isLength({min: 8, max: 20}).withMessage('Tu teléfono debe tener un mínimo de 8 dígitos y un máximo de 20').bail()
        .trim().bail()

]

module.exports = userProfileValidator;