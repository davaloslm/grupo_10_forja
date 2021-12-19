const {check} = require('express-validator');
const bcrypt = require('bcryptjs');

passwordValidator = [
    check("contraseñaVieja")
        .notEmpty().withMessage('El campo contraseña es obligatorio').bail()
        .isLength({min: 8, max: 15}).withMessage('Tu contraseña debe tener un mínimo de 8 caracteres y un máximo de 15').bail()
        .custom(( value, {req})=>{
        if(bcrypt.compareSync(value, req.session.usuarioLogueado.contraseña) === false){
                throw new Error("La contraseña actual es incorrecta")
            } return true
        })
        .custom(( value ) => {

            let regExPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/
            if(!value.match(regExPass)) {
                throw new Error("Formato contraseña inválido")
            } return true

        }),
    check("contraseñaNueva")
        .notEmpty().withMessage('El campo contraseña es obligatorio').bail()
        .isLength({min: 8, max: 15}).withMessage('Tu contraseña debe tener un mínimo de 8 caracteres y un máximo de 15').bail()
        .custom(( value, {req})=>{
        if(bcrypt.compareSync(value, req.session.usuarioLogueado.contraseña) === true){
            throw new Error("La contraseña nueva no debe coincidir con la contraseña actual")
        } return true
        })
        .custom(( value ) => {

            let regExPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/
            if(!value.match(regExPass)) {
                throw new Error("Formato contraseña inválido")
            } return true

        })
        

]

module.exports = passwordValidator;