const path = require('path');
const fs = require('fs');
/* let productos = require("../data/productos.json");
let usuarios = require("../data/users.json");
const productosRuta = path.join(__dirname, '../data/productos.json');
const usuariosRuta = path.join(__dirname, '../data/users.json'); */
const { validationResult } = require('express-validator');
const db = require('../database/models');


const controller = {
    admin: (req,res)=>{
        let promesaProductos = db.Producto.findAll();
        let promesaUsuarios = db.Usuario.findAll();

        Promise.all([promesaProductos, promesaUsuarios])
            .then(([productos, usuarios])=>{
                res.render('admin/admin', {productos, usuarios})
            })
            .catch(error=>{
                res.send("No se pudo acceder a los productos")
                console.log(error);
            })
    }
         /* (req, res)=> {
        
        res.render('admin/admin', {
            productos,
            usuarios
        })
    } */

    ,

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

            const {imagenes, nombre, marca,  descripcion, precio, stock, descuento, talle, color, categoria, envioGratis} = req.body
            /* let nuevoProducto = req.body;
            
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
    
            fs.writeFileSync(productosRuta, JSON.stringify(productos, null ,2)) */
            

            db.Producto.create({
                nombre: nombre,
                descripcion: descripcion,
                precio: parseFloat(precio),
                descuento: parseInt(descuento),
                envio: envioGratis === undefined ? 0 : 1,
                marca: marca,
                stock: parseInt(stock)
            })
            .then(producto =>{
                //Imágenes//
                if(req.files.length != 0){
                    let images = req.files.map(image => {
                        let item = {
                            nombre : image.filename,
                            productoId : producto.id
                        }
                        return item
                    })

                    var promesaImagenes = db.Imagen.bulkCreate(images)
                        .then( () => console.log('Imágenes guardadas satisfactoriamente'))
                        .catch(error=> console.log(error))
                    }
                //Categoría//
                var promesaCategoria;
                if(typeof(categoria) === 'string'){
                    promesaCategoria = db.Categoria.create(
                    {
                        nombre: categoria,
                        productoId: producto.id
                        
                    })
                    .then( () => console.log('Categoría guardada satisfactoriamente'))
                    .catch(error=> console.log(error))
                }else{
                        
                        let categoriasACrear = [];
                        categoria.forEach(e => {
                            let item ={
                                nombre: e,
                                productoId: producto.id,
                            }

                            categoriasACrear.push(item)
                            
                        });
                        promesaCategoria = db.Categoria.bulkCreate(categoriasACrear)
                        .then( () => console.log('Categorías guardadas satisfactoriamente'))
                        .catch(error=> console.log(error))
                    
                }

                //Talle//
                var promesaTalle
                if(typeof(talle) === 'string'){
                    promesaTalle = db.Talle.create(
                        {
                            nombre: talle,
                            productoId: producto.id
                        })
                        .then( () => console.log('Talle guardado satisfactoriamente'))
                        .catch(error=> console.log(error))
                    }else{
                        let tallesACrear = [];
                        talle.forEach(e => {
                            let item ={
                                nombre: e,
                                productoId: producto.id,
                            }

                            tallesACrear.push(item)
                            
                        });
                            promesaTalle = db.Talle.bulkCreate(tallesACrear)
                            .then( () => console.log('Talles guardados satisfactoriamente'))
                            .catch(error=> console.log(error))
                        
                    }
                //Color//
                var promesaColor
                if(typeof(color) === 'string'){
                    promesaColor = db.Color.create(
                        {
                            nombre: color,
                            productoId: producto.id
                        }
                        )
                        .then( () => console.log('Color guardado satisfactoriamente'))
                        .catch(error=> console.log(error))
                    }else{
                        let coloresACrear = [];
                        color.forEach(e => {
                            let item ={
                                nombre: e,
                                productoId: producto.id,
                            }

                            coloresACrear.push(item)
                            
                        });
                            promesaColor = db.Color.bulkCreate(coloresACrear)
                            .then( () => console.log('Colores guardados satisfactoriamente'))
                            .catch(error=> console.log(error))
                      
                    
                    //Falta actualizar ejs: input de colores debe ser checkbox//

                }
                Promise.all([promesaImagenes, promesaCategoria, promesaTalle, promesaColor])
                .then( () => res.redirect("/product/" + producto.id))
            })
            
            .catch(error =>{
                res.send("No se pudo crear el producto")
                console.log(error);
            })

            
        } else {
            res.render('admin/create', { errors: newProductErrors.mapped(), oldData: req.body })
        }
    },

    //////// Formulario de edición ///////////

    vistaEditar: (req, res)=> {

        
        db.Producto.findOne({
            where: {id: req.params.id},
            include: [
                {
                    association: "talle",
                },
                {
                    association: "color",
                },
                {
                    association: "categoria",
                },
                {
                    association: "imagen",
                }
            ],
        })
        .then((producto)=>{
            res.render('admin/edit', {producto})
            console.log(producto.talle[0].nombre)
        })
        .catch(error => {
            console.log(error)
            res.send("No se pudo obtener el producto de la base de datos")
        })

        /* let promesaImagenes = db.Imagen.findAll({
            where: {productoId: parseInt(req.params.id)}
        });

        let promesaTalles = db.Talle.findAll();
        let promesaColores = db.Color.findAll();
        let promesaCategorias = db.Categoria.findAll();

        Promise.all([promesaProductos, promesaImagenes, promesaTalles, promesaColores, promesaCategorias]) */
    },
    
    /////// Editar producto - Guardar ////////

    editar: (req, res)=> {
        
        const editProductErrors = validationResult(req);
        
        let productoEditado = productos.find(producto => producto.id === parseInt(req.params.id));

        if(editProductErrors.isEmpty()){

            const {imagenes, nombre, marca,  descripcion, precio, stock, descuento, talle, color, categoria, envioGratis} = req.body

            db.Producto.update({

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
            .then(producto =>{
                //Imágenes//
                if(req.files.length != 0){
                    let images = req.files.map(image => {
                        let item = {
                            nombre : image.filename,
                            productoId : producto.id
                        }
                        return item
                    })
                    db.Imagen.destroy({
                        where: {productoId : req.params.id}
                    })
                    .then( () => {

                    var promesaImagenes = db.Imagen.bulkCreate(images)
                        .then( () => console.log('Imágenes actualizadas satisfactoriamente'))
                        .catch(error=> console.log(error))
                        
                    })
                    .catch(error => {
                        res.send("No se pudieron eliminar las imágenes anteriores");
                        console.log(error);
                    })
                }
                //Categoría//
                var promesaCategoria;
                if(typeof(categoria) === 'string'){

                    db.Categoria.destroy({
                        where: {productoId : req.params.id}
                    })
                    .then( () => {
                        promesaCategoria = db.Categoria.create(
                            {
                                nombre: categoria,
                                productoId: producto.id
                                
                            })
                            .then( () => console.log('Categoría actualizada satisfactoriamente'))
                            .catch(error=> console.log(error))
                    })
                    .catch(error => {
                        res.send("No se pudo eliminar la categoría anterior");
                        console.log(error);
                    })

                    
                } else {
                        
                        let categoriasACrear = [];
                        categoria.forEach(e => {
                            let item ={
                                nombre: e,
                                productoId: producto.id,
                            }

                            categoriasACrear.push(item)
                            
                        });
                        db.Categoria.destroy({
                            where: {productoId : req.params.id}
                        })
                        .then( () => {
                            promesaCategoria = db.Categoria.bulkCreate(categoriasACrear)
                            .then( () => console.log('Categorías actualizadas satisfactoriamente'))
                            .catch(error=> console.log(error))
                        })
                        .catch(error => {
                            res.send("No se pudieron eliminar las categorías anteriores");
                            console.log(error);
                        })

                        
                    
                }

                //Talle//
                var promesaTalle
                if(typeof(talle) === 'string'){
                    promesaTalle = db.Talle.create(
                        {
                            nombre: talle,
                            productoId: producto.id
                        })
                        .then( () => console.log('Talle guardado satisfactoriamente'))
                        .catch(error=> console.log(error))
                    } else if(talle === undefined) {
                        db.Talle.destroy({
                            where: {productoId : req.params.id}
                        })
                        .then( () => {
                            console.log('El producto no tiene talles')
                        })
                        .catch(error => {
                            res.send("No se pudieron borrar los talles anteriores");
                            console.log(error);
                        })
                    } else {
                        let tallesACrear = [];
                        talle.forEach(e => {
                            let item ={
                                nombre: e,
                                productoId: producto.id,
                            }

                            tallesACrear.push(item)
                            
                        });

                        db.Talle.destroy({
                            where: {productoId : req.params.id}
                        })
                        .then( () => {
                            promesaTalle = db.Talle.bulkCreate(tallesACrear)
                            .then( () => console.log('Talles guardados satisfactoriamente'))
                            .catch(error => {
                                res.send("No se pudieron guardar los talles")
                                console.log(error)
                            })
                        })
                        .catch(error => {
                            res.send("No se pudieron borrar los talles anteriores");
                            console.log(error);
                        })
                        
                    }
                //Color//
                var promesaColor
                if(typeof(color) === 'string'){
                    promesaColor = db.Color.update(
                        {
                            nombre: color,
                            productoId: producto.id
                        }
                        )
                        .then( () => console.log('Color guardado satisfactoriamente'))
                        .catch(error=> console.log(error))
                    } else if(color === undefined) {
                        db.Color.destroy({
                            where: {productoId : req.params.id}
                        })
                        .then( () => {
                            console.log('El producto no tiene color')
                        })
                        .catch(error => {
                            res.send("No se pudieron borrar los colores anteriores");
                            console.log(error);
                        })
                    } else {
                        let coloresACrear = [];
                        color.forEach(e => {
                            let item ={
                                nombre: e,
                                productoId: producto.id,
                            }

                            coloresACrear.push(item)
                            
                        });
                        db.Color.destroy({
                            where: {productoId : req.params.id}
                        })
                        .then( () => {
                            promesaColor = db.Color.bulkCreate(coloresACrear)
                            .then( () => console.log('Colores guardados satisfactoriamente'))
                            .catch(error => {
                                console.log(error)
                                res.send("No se pudieron guardar los colores")
                            })
                        })
                        .catch(error => {
                            res.send("No se pudieron borrar los colores anteriores");
                            console.log(error);
                        })

                }

                Promise.all([promesaImagenes, promesaCategoria, promesaTalle, promesaColor])
                    .then( () => res.redirect("/product/" + producto.id))
            })
            .catch(error =>{
                res.send("No se pudo editar el producto")
                console.log(error);
            })          
                    
            /* .then( result=>{
                if (result[0] === 1) {
    
                    res.redirect(`/product/${+req.params.id}`)
    
                } else {
                    res.redirect(`/product/${+req.params.id}`)
                    
                }
            })
            .catch(error =>{
                res.???
            }) */
    
            
        
        } else {
            res.render('admin/edit', { errors: editProductErrors.mapped(), producto: productoEditado, oldData: req.body })
        }

	},

        /////// Borrar producto ////////

    eliminar: (req, res)=>{
        db.Producto.destroy({
            where: {id : req.params.id}
        })
        .then( result =>{
            res.redirect("/admin")
        })
        .catch(error=>{
            res.send("No se pudo eliminar el producto");
            console.log(error);
        })

            
        
            /* productos = productos.filter(e=>e.id !== parseInt(req.params.id))


         fs.writeFileSync(productosRuta, JSON.stringify(productos, null ,2)) */

		 res.redirect("/admin")

        }

        ,

        /////// administración de usuarios ///////

        eliminarUsuarios: (req, res) => {
            usuarios = usuarios.filter( e => e.ban !== 1)
            fs.writeFileSync(usuariosRuta, JSON.stringify(usuarios, null, 2))
            let mensaje = 'Exito'
            res.render('admin/admin', {mensaje, productos, usuarios})
        }
}

module.exports = controller;