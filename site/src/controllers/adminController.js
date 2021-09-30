const productos = require("../data/productos.json")

const controller = {
    admin: (req, res)=> {
        
        res.render('admin/admin', {productos})
    },
    crearProducto: (req, res)=> {
        res.render('admin/create')
    },
    editarProducto: (req, res)=> {
        const {id} = req.params;
        const producto = productos.find(producto=>producto.id === parseInt(id) )
        res.render('admin/edit', {producto})
    },
}

module.exports = controller;