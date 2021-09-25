const productos = require("../data/productos.json");

const controller = {
    product: (req, res)=> {
        const {id} = req.params;
        const producto = productos.find(producto=>producto.id === id)
        res.render("products/product", {producto} )
    },
}

module.exports = controller;