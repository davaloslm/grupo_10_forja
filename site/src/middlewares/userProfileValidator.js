const {check} = require('express-validator');
const db = require('../database/models');

const userProfileValidator = [
    check('nombre')
        .notEmpty().withMessage('El campo nombre es obligatorio').bail()
        .isLength({min: 2, max: 50}).withMessage('Tu nombre debe tener un mínimo de 2 caracteres y un máximo de 50').bail()
        .custom((value) => {
            let regExLetras = /^[a-zA-ZÀ-ÿ\s]{2,}$/;
    
            if (!value.match(regExLetras)) {
                throw new Error("Formato de nombre inválido")
            } return true
    
        })
        .trim(),
    check('apellido')
        .notEmpty().withMessage('El campo apellido es obligatorio').bail()
        .isLength({min: 2, max: 50}).withMessage('Tu apellido debe tener un mínimo de 2 caracteres y un máximo de 50').bail()
        .custom((value) => {
            let regExLetras = /^[a-zA-ZÀ-ÿ\s]{2,}$/;
    
            if (!value.match(regExLetras)) {
                throw new Error("Formato de apellido inválido")
            } return true
        })
        .trim(),
    check('email')
        .notEmpty().withMessage('El campo E-mail es obligatorio').bail()
        .isEmail().withMessage('El formato de E-mail debe ser válido').bail()
        .trim().bail()
        .custom((value, {req})=>{

            const regExEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

            if (!value.trim().match(regExEmail)) {
                throw new Error("Formato de email inválido")
            } else{

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
            }
            }),
    check('telefono')
        .notEmpty().withMessage('El campo teléfono no puede estar vacío').bail()
        .isInt().withMessage('Solo se pueden ingresar números').bail()
        .custom(value=>{

            const regExTel = /^\d{7,14}$/;

            if(!value.match(regExTel)){

                throw new Error ("Formato de teléfono inválido")

            } return true          

        })
        .trim().bail()

]

module.exports = userProfileValidator;