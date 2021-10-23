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
    .trim(),
check('fechaDeNac')
    .notEmpty().withMessage('El campo fecha de nacimiento es obligatorio').bail()
    .isDate().withMessage('El formato fecha debe ser válido'),
check('contraseña')
    .notEmpty().withMessage('El campo contraseña es obligatorio').bail()
    .isLength({min: 6, max: 12}).withMessage('Tu contraseña debe tener un mínimo de 6 caracteres y un máximo de 12'),
check('contraseña2')
    .notEmpty().withMessage('El campo contraseña es obligatorio').bail()
    .isLength({min: 6, max: 12}).withMessage('Tu contraseña debe tener un mínimo de 6 caracteres y un máximo de 12'),
    /* .equals().withMessage('Las contraseñas deben conincidir'), */
check('terminos')
    .notEmpty().withMessage('Debes aceptar los términos y condiciones')

];
