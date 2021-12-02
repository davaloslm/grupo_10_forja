const fs = require('fs');
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
                    } else if(talle === undefined) {
                        console.log("El producto no tiene talle")
                    } else {
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
                    } else if(color === undefined) {
                        console.log("El producto no tiene color")
                    } else{
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

                }
                Promise.all([promesaImagenes, promesaCategoria, promesaTalle, promesaColor])
                .then( () => res.redirect("/product/" + producto.id))
                .catch(error => {
                    res.send("No se pudo redireccionar al detalle del producto creado")
                    console.log(error);
                })
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
        })
        .catch(error => {
            console.log(error)
            res.send("No se pudo obtener el producto de la base de datos")
        })

    },
    
    /////// Editar producto - Guardar ////////

    editar: (req, res)=> {
        
        const editProductErrors = validationResult(req);
        
        var productoAEditar = db.Producto.findOne({
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

        console.log("------------------------------------------------------------------");
        console.log(productoAEditar);

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
                console.log("//////////////////////////////////////////////////////////////////////////////")
                console.log(productoAEditar.id)
                var promesaImagenes;
                if(req.files != undefined ){
                    let images = req.files.map(image => {
                        let item = {
                            nombre : image.filename,
                            productoId : req.params.id
                        }
                        return item
                    })
                    db.Imagen.destroy({
                        where: {productoId : req.params.id}
                    })
                    .then( () => {

                        promesaImagenes = db.Imagen.bulkCreate(images)
                            .then( () => console.log('Imágenes actualizadas satisfactoriamente'))
                            .catch(error=> console.log(error))
                        
                    })
                    .catch(error => {
                        res.send("No se pudieron eliminar las imágenes anteriores");
                        console.log(error);
                    })
                } else {
                    console.log("No se agregaron imágenes nuevas a este producto")
                }
                //Categoría//
                var promesaCategoria;
                if(typeof(categoria) === 'string'){

                    db.Categoria.destroy({
                        where: {productoId : req.params.id}
                    })
                    .then( () => {
                        console.log("Se eliminó la categoría anterior");
                    })
                    .catch(error => {
                        res.send("No se pudo eliminar la categoría anterior");
                        console.log(error);
                    })

                    promesaCategoria = db.Categoria.create(
                        {
                            nombre: categoria,
                            productoId: req.params.id
                            
                        })
                        .then( () => console.log('Categoría actualizada satisfactoriamente'))
                        .catch(error=> console.log(error))

                    
                } else {
                        
                        let categoriasACrear = [];
                        categoria.forEach(e => {
                            let item ={
                                nombre: e,
                                productoId: req.params.id,
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
                    db.Talle.destroy({
                        where: { productoId: req.params.id}
                    })
                    .then(()=>{
                        promesaTalle = db.Talle.create(
                            {
                                nombre: talle,
                                productoId: req.params.id
                            })
                            .then( () => console.log('Talle guardado satisfactoriamente'))
                            .catch(error=> console.log(error))
                    })
                    .catch(error => {
                        res.send("No se pudo eliminar el talle anterior");
                        console.log(error);
                    })
                    
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
                        var tallesACrear = [];
                        talle.forEach(e => {
                            let item ={
                                nombre: e,
                                productoId: req.params.id,
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
                    db.Color.destroy({
                        where: { productoId: req.params.id}
                    })
                    .then(()=>{
                        promesaColor = db.Color.create(
                            {
                                nombre: color,
                                productoId: req.params.id
                            })
                            .then( () => console.log('Color guardado satisfactoriamente'))
                            .catch(error=> console.log(error))
                    })
                    .catch(error => {
                        res.send("No se pudo eliminar el color anterior");
                        console.log(error);
                    })
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
                                productoId: req.params.id,
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
                .then( () => res.redirect("/product/" + req.params.id))
                .catch(error => {
                    res.send("No se pudo redireccionar al detalle del producto editado")
                    console.log(error);
                })
            })
            .catch(error =>{
                res.send("No se pudo editar el producto")
                console.log(error);
            })          
        
        } else {

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
                res.render('admin/edit', { errors: editProductErrors.mapped(), producto, oldData: req.body })
                console.log(producto.talle[0].nombre)
            })
            .catch(error => {
                console.log(error)
                res.send("No se pudieron enviar los errores a la vista de edición")
            })

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

		 res.redirect("/admin")

        },

        /////// administración de usuarios ///////

        eliminarUsuarios: (req, res) => {
            usuarios = usuarios.filter( e => e.ban !== 1)
            fs.writeFileSync(usuariosRuta, JSON.stringify(usuarios, null, 2))
            let mensaje = 'Exito'
            res.render('admin/admin', {mensaje, productos, usuarios})
        }
}

module.exports = controller;