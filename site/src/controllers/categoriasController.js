const productos = require("../data/productos.json")

const controller = {
    category: (req, res)=> {
        const {categoria} = req.params;
        const productosDeLaCategoria = productos.filter(producto=>producto.categoria.includes(categoria) === true);
        const categoriaCorrecta = categoria;
        res.render("products/category", {productosDeLaCategoria, categoriaCorrecta} );


        
    }

}

module.exports = controller;
