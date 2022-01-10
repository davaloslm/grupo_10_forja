const db = require('../../database/models');
const { Op } = require('sequelize');

const controller = {
    //todos los productos Api
    listaProductos: (req, res)=>{

        let promesaProductos = db.Producto.findAll();
        let promesaImagenes = db.Imagen.findAll();

        Promise.all([promesaProductos, promesaImagenes])
            .then(([productos, imagenes])=>{
                let respuesta = {
                    meta: {
                        status: 200,
                        total: productos.length,
                        url: 'api/product'
                    },
                    data: productos, imagenes
                }
                res.json(respuesta)
            })
            .catch(error=>{
                res.send(error)
            })
    },
}

module.exports = controller;