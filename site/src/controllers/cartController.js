const db = require('../database/models');
const { Op } = require('sequelize');

const controller = {
    
    agregarAlCarrito: (req, res)=>{
        let producto = req.params.prod;
        let cantidad = parseInt(req.params.cantidad);

        db.Carrito.findOne({
            where:{
                usuarioId: req.session.usuarioLogueado.id,
                productoId: producto
            }
        })
        .then(result=>{
            console.log(result);
            if (result === null) {
                db.Carrito.create({
                    usuarioId: req.session.usuarioLogueado.id,
                    productoId: producto,
                    cantidad: cantidad
                })
                .then(carrito=>{
                    res.render("users/cart", {carrito})
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
                        productoId: producto,
                    }
                })
                .then(carrito=>{
                    res.render("users/cart", {carrito})
                })
                .catch(error=>{
                    console.log(error);
                    res.send("No se pudo actualizar el carrito existente")
                })
            }
        })
    }
}

module.exports = controller;