const usuarios = require("../data/users.json");
const {check} = require('express-validator');
const bcrypt = require('bcryptjs');

passwordValidator = [
    check("contraseña")
        .notEmpty().withMessage('El campo contraseña es obligatorio').bail()
        .isLength({min: 8, max: 20}).withMessage('Tu contraseña debe tener un mínimo de 8 caracteres y un máximo de 20').bail()
        .custom(( value, {req})=>{
         if(bcrypt.compareSync(value, req.session.usuarioLogueado.contraseña) === false){
                throw new Error("La contraseña actual es incorrecta")
            } return true
        }),
    check("contraseña2")
        .notEmpty().withMessage('El campo contraseña es obligatorio').bail()
        .isLength({min: 8, max: 20}).withMessage('Tu contraseña debe tener un mínimo de 8 caracteres y un máximo de 20').bail()
        .custom(( value, {req})=>{
        if(bcrypt.compareSync(value, req.session.usuarioLogueado.contraseña) === true){
            throw new Error("La contraseña nueva no debe coincidir con la contraseña actual")
        } return true
    })
        

]

module.exports = passwordValidator;