const productos = require("../data/productos.json");

const controller = {
    //detalle
    detail: (req, res)=> {
        const {id} = req.params;
        const producto = productos.find(producto=>producto.id === parseInt(id) )
        res.render("products/detail", {producto} )
    },
    //todos los productos
    list: (req, res)=>{
        res.render("products/products", {productos})
    }


}

module.exports = controller;