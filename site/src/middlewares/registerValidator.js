const db = require('../database/models');
const path = require("path");
const {check} = require('express-validator');

const registerValidator = [
check('nombre')
    .notEmpty().withMessage('El campo nombre es obligatorio').bail()
    .isLength({min: 2, max: 50}).withMessage('Tu nombre debe tener un mínimo de 2 caracteres y un máximo de 50').bail()
    .custom((value) => {
        let regExLetras = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;

        if (!value.match(regExLetras)) {
            throw new Error("Formato nombre inválido")
        } return true

    })
    .trim(),
check('apellido')
    .notEmpty().withMessage('El campo apellido es obligatorio').bail()
    .isLength({min: 2, max: 50}).withMessage('Tu apellido debe tener un mínimo de 2 caracteres y un máximo de 15').bail()
    .custom((value) => {
        let regExLetras = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;

        if (!value.match(regExLetras)) {
            throw new Error("Formato apellido inválido")
        } return true
    })
    .trim(),
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
                if (usuario !== null){
                    throw new Error("Este e-mail ya está registrado en nuestra base de datos")
                } return true
            })
            .catch(error => {
                throw new Error("Este e-mail ya está registrado en nuestra base de datos")
                console.log('*************error catch middleware registerValidator*************');
                console.log(error);
            })
        }

    }),
check('fechaDeNac')
    .notEmpty().withMessage('El campo fecha de nacimiento es obligatorio').bail()
    .isDate().withMessage('El formato fecha debe ser válido')
    .custom((value) => {

        let year = value[0] + value[1] + value[2] + value[3];
        let month = value[5] + value[6];
        let day = value[8] + value[9];
        let fechaUser = day + "/" + month + "/" + year

        let regExFecha = /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/;
        if (!fechaUser.match(regExFecha)) {
            throw new Error("Fecha inválida")
        } return true

    }),
check('contraseña')
    .notEmpty().withMessage('El campo contraseña es obligatorio').bail()
    .custom(( value, {req}) => {

        let regExPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/
        if(!value.match(regExPass)) {
            throw new Error("La contraseña debe tener entre 8 y 15 caracteres, como mínimo 1 mayúscula, 1 minúscula, 1 dígito y un caracter especial sin espacios en blanco")
        } return true

    }),
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
        let extensionesValidas = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

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
