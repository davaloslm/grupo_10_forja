const db = require('../database/models');
const {check} = require('express-validator');

const loginValidator = [
    check('email')
        .notEmpty().withMessage('El campo E-mail es obligatorio').bail()
        .isEmail().withMessage('El formato de E-mail debe ser válido').bail()
        .trim().bail()
        .custom((value)=>{

            let regExEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

            if (!value.trim().match(regExEmail)) {
                throw new Error("Formato email inválido")
            } else {

                return db.Usuario.findOne({
                    where: {
                        email: value
                    }
                })       

                .then(usuario => {

                    if (usuario === null){
                        throw new Error("Este e-mail no está registrado en nuestra base de datos")
                    } return true        
                })
                .catch(error => {
                    throw new Error("Este e-mail no está registrado en nuestra base de datos")
                    console.log('*************error catch middleware loginValidator*************');
                    console.log(error);
                })
            }

        }),
    check('contraseña')
        .notEmpty().withMessage('El campo contraseña es obligatorio').bail()
        .custom(( value ) => {

            let regExPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/
            if(!value.match(regExPass)) {
                throw new Error("Formato contraseña inválido")
            } return true

        }),
]
module.exports = loginValidator;

