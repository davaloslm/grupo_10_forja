const path = require('path');
const fs = require('fs');
let productos = require("../data/productos.json");
let usuarios = require("../data/users.json");
const productosRuta = path.join(__dirname, '../data/productos.json');
const usuariosRuta = path.join(__dirname, '../data/users.json');
const { validationResult } = require('express-validator');
const db = require('../database/models');

const controller = {
    admin: (req, res)=> {
        
        res.render('admin/admin', {
            productos,
            usuarios
        })
    },

    //////// Formulario de Creacion ///////////
    vistaCrear: (req, res)=> {
        res.render('admin/create')
    },

    crear:(req,res) =>{

        const newProductErrors = validationResult(req);
        
        if(req.fileValidationError) {
            let img = {
                param: "imagenes",
                msg: req.fileValidationError
            }
            newProductErrors.errors.push(img)
        }

        if(newProductErrors.isEmpty()) {

            const {nombre, descripcion, precio, descuento, talle, color, categoria, envioGratis} = req.body
            let nuevoProducto = req.body;
            
            let imagenes = []
            req.files.forEach(image => {
                imagenes.push(image.filename)
            });
    
            nuevoProducto.id = productos.length + 1;
            
                nuevoProducto.envioGratis = envioGratis === undefined ? false : true;
                nuevoProducto.descuento = parseInt(descuento);
                nuevoProducto.talle = typeof(talle) === 'string' ? [talle] : talle;
                nuevoProducto.nombre = nombre;
                nuevoProducto.descripcion = descripcion;
                nuevoProducto.precio = parseInt(precio);
                nuevoProducto.color = [color];
                nuevoProducto.categoria = typeof(categoria) === 'string' ? [categoria] : categoria;
                nuevoProducto.imagen = imagenes;
    
                productos.push(nuevoProducto);
    
            fs.writeFileSync(productosRuta, JSON.stringify(productos, null ,2))
            

            /* db.Producto.create({
                nombre: nombre,
                descripcion: descripcion,
                precio: parseFloat(precio),
                descuento: parseInt(descuento),
                envio: envioGratis === undefined ? 0 : 1,
                marca: marca,
                stock: parseInt(stock)
            })
            .then(producto =>{
                res.redirect("/product/" + producto.id)
            })
            .catch(error =>{
                res.???
            }) */

            res.redirect(`/product/${nuevoProducto.id}`)
        } else {
            res.render('admin/create', { errors: newProductErrors.mapped(), oldData: req.body })
        }
    },

    //////// Formulario de edición ///////////

    vistaEditar: (req, res)=> {
        const {id} = req.params;
        const producto = productos.find(producto=>producto.id === parseInt(id) )
        res.render('admin/edit', {producto})
    }
    
    /* db.Producto.findByPk(req.params.id)
    .then(producto=>{
        if (producto) {
            res.render("admin/edit", {producto})
            
        } else {
            res.send("No existe producto con ese ID.")
            
        }
        
    })
    .catch( error =>{
        res.???
    }) */
    
    ,
    
    /////// Editar producto - Guardar ////////

    editar: (req, res)=> {
        //falta imagen
        const editProductErrors = validationResult(req);
        
        let productoEditado = productos.find(producto => producto.id === parseInt(req.params.id));

        if(editProductErrors.isEmpty()){

            let {nombre, descripcion, precio, descuento, talle, color, categoria, envioGratis} = req.body
    
                productoEditado.envioGratis = envioGratis === undefined ? false : true;
                productoEditado.descuento = descuento;
                productoEditado.talle = typeof(talle) === 'string' ? [talle] : talle;
                productoEditado.nombre = nombre;
                productoEditado.descripcion = descripcion;
                productoEditado.precio = precio;
                productoEditado.color = [color];
                productoEditado.categoria = typeof(categoria) === 'string' ? [categoria] : categoria;
    
                fs.writeFileSync(productosRuta, JSON.stringify(productos, null ,2))
    
                res.redirect(`/product/${+req.params.id}`)
        } else {
            res.render('admin/edit', { errors: editProductErrors.mapped(), producto: productoEditado })
        }

		}
        
        /* db.Producto.update({

            nombre: nombre,
            descripcion: descripcion,
            precio: parseFloat(precio),
            descuento: parseInt(descuento),
            envio: envioGratis === undefined ? 0 : 1,
            marca: marca,
            stock: parseInt(stock)

        },{
            where: {id: req.params.id}
        })
        .then( result=>{
            if (result[0] === 1) {

                res.redirect(`/product/${+req.params.id}`)

            } else {
                res.redirect(`/product/${+req.params.id}`)
                
            }
        })
        .catch(error =>{
            res.???
        }) */,

        /////// Borrar producto ////////

        eliminar: (req, res)=>{
        
            productos = productos.filter(e=>e.id !== parseInt(req.params.id))


         fs.writeFileSync(productosRuta, JSON.stringify(productos, null ,2))

		 res.redirect("/admin")

        }

        /* db.Producto.destroy({
            where: {id : req.params.id}
        })
        .then( result =>{
            res.redirect("/admin")
        }))
        .catch(error=>{
            res.???
        }) */,

        /////// administración de usuarios ///////

        eliminarUsuarios: (req, res) => {
            usuarios = usuarios.filter( e => e.ban !== 1)
            fs.writeFileSync(usuariosRuta, JSON.stringify(usuarios, null, 2))
            let mensaje = 'Exito'
            res.render('admin/admin', {mensaje, productos, usuarios})
        }
}

module.exports = controller;