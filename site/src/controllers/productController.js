/* const productos = require("../data/productos.json"); */
const db = require('../database/models');
const { Op } = require('sequelize');

const controller = {
    //todos los productos
    list: async (req, res)=>{

        let promesaProductos = db.Producto.findAll();
        let promesaImagenes = db.Imagen.findAll();

        Promise.all([promesaProductos, promesaImagenes])
            .then(([productos, imagenes])=>{
                
                res.render('products/products', {productos, imagenes})
            })
            .catch(error=>{
                res.send("Error al requerir productos de la base de datos")
                console.log(error);
            })
        
        
    },

    //detalle
    detail: async (req, res) => {
        try {
            var producto = await db.Producto.findByPk(req.params.id, {
                include: [
                    {association: "imagen"},
                    {association: "talle"},
                    {association: "color"}]
            })
            /* console.log(producto.productoImagen[0].nombre); */
            if(producto !== null) {
                res.render("products/detail", {producto} )
            } else {
                res.send('El producto no existe')
            }
            
        } catch (error) {
            res.send('Error al requerir producto de la base de datos')
            console.log('Error al requerir producto de la base de datos.', error);
        }
    }
    


}

module.exports = controller;