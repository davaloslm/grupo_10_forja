const { validationResult } = require('express-validator');
const db = require('../database/models');
const fs = require('fs');
const path = require('path');

const controller = {

//////// Vista admin con listado de usuarios y productos ///////////

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
    },

//////// Vista crear producto ///////////

    vistaCrear: (req, res)=> {
        res.render('admin/create')
    },

//////// Formulario de Creacion de producto ///////////

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

            const { nombre, marca,  descripcion, precio, stock, descuento, talle, color, categoria, envioGratis } = req.body

            // Creación del nuevo producto //

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
                // Creado el producto se crean sus imagenes, categorias, talles y colores por separado en el mismo then //
                // Creación de las imágenes del producto min: 1 max: 3 //

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

                // Creación de la o las categorías min: 1 hasta 6 //

                var promesaCategoria;
                if(typeof(categoria) === 'string'){
                    promesaCategoria = db.Categoria.create(
                    {
                        nombre: categoria,
                        productoId: producto.id
                        
                    })
                    .then( () => console.log('Categoría guardada satisfactoriamente'))
                    .catch(error=> console.log(error))
                } else {
                        
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

                // Creación de los o el talle (puede ser undefined) //

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

                // Creación de los o el color (puede ser undefined) //

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
                } else {
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
                /////// PromiseAll - Fin de la creación ////////
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
            /////// Errores en la creación (si los hay) ////////
            res.render('admin/create', { errors: newProductErrors.mapped(), oldData: req.body })
        }
    },

    //////// Vista edición de producto ///////////

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
        
        // Se trae el producto que se quiere editar //

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

        if(editProductErrors.isEmpty()){

            const { nombre, marca,  descripcion, precio, stock, descuento, talle, color, categoria, envioGratis } = req.body

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
            .then(producto => {
                // Editado el producto se crean sus imagenes(si se modifica), categorias(si se modifica), talles(si se modifica) y colores(si se modifica) por separado en el mismo then  //
                // Modificación de las imágenes del producto min: 1 max: 3. Si se envían nuevas imágenes, borra las viejas y se agregan las nuevas. Si no se envían imágenes no hace nada //
                var promesaImagenes;
                if(req.files.length != 0 ) {
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

                // Modificación de la categoría o las categorías del producto min: 1. Si se agregan/eliminan categorías, borra las viejas y se agregan las nuevas. //

                var promesaCategoria;
                if(typeof(categoria) === 'string') {

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

                // Creación/Modificación/Eliminado del talle o los talles del producto (puede ser undefined). Si se agregan/eliminan talles, borra los viejos y se agregan los nuevos. //

                var promesaTalle
                if(typeof(talle) === 'string') {
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

                // Creación/Modificación/Eliminado del color o los colores del producto (puede ser undefined). Si se agregan/eliminan colores, borra los viejos y se agregan los nuevos. //

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
                /////// PromiseAll - Fin de la edición ////////
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
            /////// Errores en la edición (si los hay) ////////
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
            })
            .catch(error => {
                console.log(error)
                res.send("No se pudieron enviar los errores a la vista de edición")
            })
        }

	},

        /////// Función borrar producto ////////

    eliminar: (req, res)=>{
        
        db.Producto.findByPk(req.params.id,{
            include: [
                {
                    association: "imagen",
                }
            ]
        })
        .then( producto =>{
            /* Borra imagenes del producto del sistema de archivos  */
            if (producto.imagen.length !== 0) {
                producto.imagen.forEach(e=>{
                    if (fs.existsSync(path.join(__dirname, '../../public/img/productos', e.nombre))) {
                        fs.unlinkSync(path.join(__dirname, '../../public/img/productos', e.nombre))
                    }
                })
            };

            db.Producto.destroy({
                where: {id : req.params.id}
            })
            .then( result => {
                res.redirect("/admin")
            })
            .catch(error=>{
                res.send("No se pudo eliminar el producto");
                console.log(error);
            })
    
            res.redirect("/admin")
        })
        .catch(error =>{
            res.send("No se pudo encontrar el producto");
                console.log(error);
        })

    },

    /////// administración de usuarios *COMING SOON* ///////

}

module.exports = controller;