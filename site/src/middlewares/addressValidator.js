const { check } = require('express-validator');

const addressValidator = [
check('calle')
    .notEmpty().withMessage('El campo calle no puede estar vacío').bail()
    .isLength({ min:2, max:50 }).withMessage('El nombre de la calle debe tener entre 2 y 50 caracteres.').bail()
    .custom((value) => {
        let regExLetras = /^[a-zA-ZÀ-ÿ\s]{2,}$/;

        if (!value.match(regExLetras)) {
            throw new Error("Formato de nombre inválido")
        } return true

    })
    .trim(),
check('numero')
    .notEmpty().withMessage('El campo numero no puede estar vacío').bail()
    .isLength({ min: 1, max:6 }).withMessage('El número debe tener entre 1 y 6 caracteres.').bail()
    .custom(value=>{

        const regExNum = /^\d{1,6}$/;

        if(!value.match(regExNum)){

            throw new Error ("Formato de número inválido")

        } return true          

    })
    .trim(),
check('localidad')
    .notEmpty().withMessage('El campo localidad no puede estar vacío').bail()
    .isLength({ min:2, max:50 }).withMessage('El nombre de la localidad debe tener entre 2 y 50 caracteres.').bail()
    .custom((value) => {
        let regExLetras = /^[a-zA-ZÀ-ÿ\s]{2,}$/;

        if (!value.match(regExLetras)) {
            throw new Error("Formato de nombre inválido")
        } return true

    })
    .trim(),
check('provincia')
    .notEmpty().withMessage('El campo provincia no puede estar vacío').bail()
    .isLength({ min:2, max:50 }).withMessage('El nombre de la provincia debe tener entre 2 y 50 caracteres.').bail()
    .custom((value) => {
        let regExLetras = /^[a-zA-ZÀ-ÿ\s]{2,}$/;

        if (!value.match(regExLetras)) {
            throw new Error("Formato de nombre inválido")
        } return true

    })
    .trim(),
check('codigoPostal')
    .notEmpty().withMessage('El campo código Postal no puede estar vacío').bail()
    .isLength({ min: 1, max:6 }).withMessage('El código postal debe tener entre 1 y 6 caracteres.').bail()
    .custom(value=>{

        const regExNum = /^\d{1,6}$/;

        if(!value.match(regExNum)){

            throw new Error ("Formato de código postal inválido")

        } return true          

    })
    .trim(),
check('departamento')
    .isLength({ min: 1, max:6 }).withMessage('El número de departamento debe tener entre 1 y 6 caracteres.').bail()
    .custom(value=>{

        const regExNum = /^\d{1,6}$/;

        if(!value.match(regExNum)){

            throw new Error ("Formato de departamento inválido")

        } return true          

    })
    .trim(),
];

module.exports = addressValidator