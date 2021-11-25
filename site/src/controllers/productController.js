/* const productos = require("../data/productos.json"); */
const db = require('../database/models');
const { Op } = require('sequelize');

const controller = {
    //todos los productos
    list: async (req, res)=>{
        try {
            const productos = await db.Producto.findAll({
                include: [{association: "productoImagen"}]
            })
            res.render("products/products", {productos})
            console.log(productos)
                
        
        } catch (error) {
            res.send('Error al requerir productos de la base de datos')
            console.log('Error al requerir productos de la base de datos', error);
        }
        
    },

    //detalle
    detail: async (req, res) => {
        try {
            const producto = await db.Producto.findByPk(req.params.id, {
                include: [
                    {association: "productoImagen"},
                    {association: "productoTalle"},
                    {association: "productoColor"}]
            })
            console.log(producto.productoImagen[0].nombre);
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