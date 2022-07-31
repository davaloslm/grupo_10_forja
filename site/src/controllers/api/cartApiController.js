const db = require('../../database/models');
const { Op } = require('sequelize');

const controller = {
    cart: (req, res)=> {
        db.Carrito.findAll({
            where: {
                usuarioId: req.session.usuarioLogueado.id
            },
            include: [{association: 'carritoProducto',
                include: [{association: 'imagen'}]
            }]
        })
        .then(carritos=>{
            res.status(200).json({
                meta: {
                    status: 200,
                    total: carritos.length,
                    url: "/api/cart"
                },
                data: carritos
            })
        })
        .catch(error=>{
            console.log(error);
            res.send("No se pudo traer los productos del carrito")
        })
    },
    agregarAlCarrito: (req, res)=>{
        let productoId = req.params.id;
        let cantidad = parseInt(req.params.cant);

        db.Carrito.findOne({
            where:{
                usuarioId: req.session.usuarioLogueado.id,
                productoId: productoId
            }
        })
        .then(result=>{
            
            if (result === null) {
                db.Carrito.create({
                    usuarioId: req.session.usuarioLogueado.id,
                    productoId: productoId,
                    cantidad: cantidad
                })
                .then(carritos=>{
                    res.status(200).json({
                        meta: {
                            status: 200,
                            total: carritos.cantidad,
                            url: "/api/cart/add/:id/:cant"
                        },
                        data: carritos
                    })
                })
                .catch(error=>{
                    console.log(error);
                    res.send("No se pudo crear el carrito")
                })
            } else {
                db.Carrito.update({
                    cantidad: result.cantidad + cantidad
                }, {
                    where: {
                        usuarioId: req.session.usuarioLogueado.id,
                        productoId: productoId,
                    }
                })
                .then(carritos=>{
                    res.status(200).json({
                        meta: {
                            status: 200,
                            total: carritos.cantidad,
                            url: "/api/cart/add/:id/:cant"
                        },
                        data: carritos
                    })
                })
                .catch(error=>{
                    console.log(error);
                    res.send("No se pudo actualizar el carrito existente")
                })
            }
        })
    },
    borrarDelCarrito: (req, res)=>{
        let productoId = req.params.id;

        db.Carrito.destroy({
            where: {
                usuarioId: req.session.usuarioLogueado.id,
                productoId: productoId,
            }
        })
        .then((result)=>{
            res.json()

        })
        .catch(error=>{
            res.send("No se pudo quitar el producto del carrito")
            console.log(error);
        })
    },
    cambiarCantidad: (req, res)=>{
        let productoId = req.params.id;
        let cantidad = parseInt(req.params.cant);

        db.Carrito.update({
            cantidad: cantidad
        }, {
            where: {
                usuarioId: req.session.usuarioLogueado.id,
                productoId: productoId,
            }
        })
        .then(result=>{
            res.json(result)
        })
        .catch(error=>{
            res.send("No se pudo cambiar la cantidad del producto del carrito")
            console.log(error);
        })
    }
}

module.exports = controller
