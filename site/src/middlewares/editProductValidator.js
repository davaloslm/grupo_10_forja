const { check } = require('express-validator');

const editProductValidator = [
check('nombre')
    .notEmpty().withMessage('El producto debe tener nombre.').bail()
    .isLength({ min:10, max:45 }).withMessage('El nombre del producto debe tener entre 10 y 45 caracteres.')
    .trim(),
check('descripcion')
    .notEmpty().withMessage('El producto debe tener una descripción.').bail()
    .isLength({ min: 20 }).withMessage('La descripción debe tener como mínimo 20 caracteres.')
    .trim(),
check('precio')
    .notEmpty().withMessage('El producto debe tener un precio.'),
check('categoria')
    .notEmpty().withMessage('El producto debe tener como mínimo una categoría.')
];
/* FALTAN VALIDACIONES AL EDITAR IMÁGENES */

module.exports = editProductValidator;
