const usuarios = require("../data/users.json");
const path = require("path");
const {check} = require('express-validator');

const registerValidator = [
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
    .custom((value)=>{
        if(usuarios.find(usuario=>usuario.email === value)){
            throw new Error("Este e-mail ya está registrado en nuestra base de datos")
        } return true
    }),
check('fechaDeNac')
    .notEmpty().withMessage('El campo fecha de nacimiento es obligatorio').bail()
    .isDate().withMessage('El formato fecha debe ser válido'),
check('contraseña')
    .notEmpty().withMessage('El campo contraseña es obligatorio').bail()
    .isLength({min: 8, max: 20}).withMessage('Tu contraseña debe tener un mínimo de 8 caracteres y un máximo de 20'),
check('contraseña2')
    .notEmpty().withMessage('El campo contraseña es obligatorio').bail()
    .isLength({min: 8, max: 20}).withMessage('Tu contraseña debe tener un mínimo de 8 caracteres y un máximo de 20').bail()
    .custom(( value, {req})=>{
        if(req.body.contraseña !== value){
            throw new Error("Las contraseñas ingresadas no coinciden")
        } return true
    }),
check('imagen')
    .custom((value, {req})=>{
        let extensionesValidas = [".jpg", ".jpeg", ".png", ".gif"];

        if(req.file == undefined){
            return true
        } else {
            let imagen = req.file;
            let imagenExtension = path.extname(imagen.originalname);

                if(extensionesValidas.includes(imagenExtension) === false ){
                    throw new Error("Las extensiones permitidas son " + extensionesValidas.join(", "))
                }
        } return true
    }),
check('terminos')
    .notEmpty().withMessage('Debes aceptar los términos y condiciones')

];

module.exports = registerValidator;