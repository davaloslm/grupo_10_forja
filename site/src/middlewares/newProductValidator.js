const { check, body } = require('express-validator');

const newProductValidator = [
body('imagenes')
    .custom((value, { req }) => {
    let imagenes = []
    console.log([req.files]);
    req.files.forEach(image => {
        imagenes.push(image.filename)
    });

    if (!imagenes[0]) {
        throw new Error('El producto debe tener como mínimo una imagen.');
    }
    return true
}),
check('nombre')
    .notEmpty().withMessage('El producto debe tener nombre.').bail()
    .isLength({ min: 2, max:50 }).withMessage('El nombre del producto debe tener entre 2 y 50 caracteres.').bail()
    .custom((value) => {
        let regExLetrasNumero=/^[a-zA-ZÀ-ÿ0-9\_\-/%&=".'+$@#!()\s]{2,50}$/;

        if (!value.match(regExLetrasNumero)) {
            throw new Error("Formato de nombre inválido")
        } return true

    })
    .trim(),
check('descripcion')
    .notEmpty().withMessage('El producto debe tener una descripción.').bail()
    .isLength({ min: 2, max:1000 }).withMessage('La descripción debe tener entre 2 y 1000 caracteres.')
    .trim(),
check('marca')
    .notEmpty().withMessage('El producto debe tener una marca.').bail()
    .isLength({ min: 2, max:50 }).withMessage('La marca debe tener entre 2 y 50 caracteres.').bail()
    .custom((value) => {
        let regExLetrasNumero=/^[a-zA-ZÀ-ÿ0-9\_\-/%&=".'+$@#!()\s]{2,50}$/;

        if (!value.match(regExLetrasNumero)) {
            throw new Error("Formato de marca inválido")
        } return true

    })
    .trim(),
check('precio')
    .notEmpty().withMessage('El producto debe tener un precio.').bail()
    .isLength({ min: 2, max:9 }).withMessage('El precio debe tener entre 2 y 9 caracteres.').bail()
    .custom((value) => {
        let regExNum = /^\d{1,9}$/; 

        if (!value.match(regExNum)) {
            throw new Error("Formato de precio inválido")
        } return true

    })
    .trim(),
check('stock')
    .notEmpty().withMessage('El producto debe tener un stock.').bail()
    .isLength({ min: 2, max:9 }).withMessage('El stock debe tener entre 2 y 9 caracteres.').bail()
    .custom((value) => {
        let regExNum = /^\d{1,9}$/; 

        if (!value.match(regExNum)) {
            throw new Error("Formato de stock inválido")
        } return true

    })
    .trim(),
check('categoria')
    .notEmpty().withMessage('El producto debe tener como mínimo una categoría.')
];

module.exports = newProductValidator;

