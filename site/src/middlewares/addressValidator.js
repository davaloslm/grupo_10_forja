const { check } = require('express-validator');

const addressValidator = [
check('calle')
    .notEmpty().withMessage('El campo calle no puede estar vacío').bail()
    .isLength({ min:2, max:45 }).withMessage('El nombre de la calle debe tener entre 2 y 45 caracteres.')
    .trim(),
check('numero')
    .notEmpty().withMessage('El campo numero no puede estar vacío').bail()
    .isLength({ min: 1, max:6 }).withMessage('El número debe tener entre 1 y 6 caracteres.')
    .trim(),
check('localidad')
    .notEmpty().withMessage('El campo localidad no puede estar vacío').bail()
    .isLength({ min:2, max:45 }).withMessage('El nombre de la localidad debe tener entre 2 y 45 caracteres.')
    .trim(),
check('provincia')
    .notEmpty().withMessage('El campo provincia no puede estar vacío').bail()
    .isLength({ min:2, max:45 }).withMessage('El nombre de la provincia debe tener entre 2 y 45 caracteres.')
    .trim(),
check('codigoPostal')
    .notEmpty().withMessage('El campo código Postal no puede estar vacío').bail()
    .isLength({ min: 1, max:6 }).withMessage('El código postal debe tener entre 1 y 6 caracteres.')
    .trim(),
check('departamento')
    .isLength({ min: 1, max:6 }).withMessage('El número de departamento debe tener entre 1 y 6 caracteres.')
    .trim(),
];

module.exports = addressValidator