const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const transporter = require('../functions/nodemailerTransporter');

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
            console.log(carritos);
            res.render("users/cart", {carritos})
        })
        .catch(error=>{
            console.log(error);
            res.send("No se pudo traer los productos del carrito")
        })
    },
    agregarAlCarrito: (req, res)=>{
        let productoId = req.params.id;
        let cantidad = parseInt(req.body.cantidad);

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
                    console.log(carritos);
                    res.redirect("/product/"+productoId)
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
                    console.log(carritos);
                    res.redirect("/product/"+productoId)
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
        .then(()=>{
            res.redirect("/user/cart")

        })
        .catch(error=>{
            res.send("No se pudo quitar el producto del carrito")
            console.log(error);
        })
    },
    cambiarCantidadCarrito: (req, res)=>{
        let productoId = req.params.id;
        let cantidad = parseInt(req.body.cantidad);

        db.Carrito.update({
            cantidad: cantidad
        },{
            where: {
                usuarioId: req.session.usuarioLogueado.id,
                productoId: productoId
            }
        })
        .then(()=>{
            res.redirect("/user/cart")
        })
        .catch(error=>{
            res.send("No se pudo cambiar la cantidad de productos del carrito");
            console.log(error);
        })
    },
    vistaRegistro: (req, res)=> {
        res.render('users/register')
    },
    vistaLogin: (req, res)=> {
        res.render('users/login')
    },
    registro: (req, res)=> {
        const registerErrors = validationResult(req);

        if(registerErrors.isEmpty()){
        
            const {nombre, apellido, email, fechaDeNac, contraseña, terminos, ofertas} = req.body;
            
            db.Usuario.create({
                nombre: nombre,
                apellido: apellido,
                email: email,
                contraseña: bcrypt.hashSync(contraseña, 12),
                userName: nombre+apellido,
                fechaDeNacimiento: fechaDeNac,
                subscripcionForja: ofertas === undefined ? 0 : 1,
                admin: 0,
                telefono: null,
                imagen: req.file ? req.file.filename : 'default-user.jpg',
            })
            .then(() => {

                let forjaMail = {
                    from: 'Forja Tienda Web<forja.tiendaweb@gmail.com>',
                    to: email,
                    subject: '¡Bienvenido a Tienda Forja Online!',
                    html: `
                    <div class="header" style="width:100%;background-color: #fff;padding: 5px;">
                        <h2 style="color:#204051;">Hola ${nombre}, gracias por elegirnos.</h2>
                        <div class="img" style="width: 30%;min-width: 140px;max-width: 270px;">
                            <img src="https://i.postimg.cc/v8tQ1jrt/Logo.png" alt="Tienda Forja" style="width: 70%;">
                        </div>
                    </div>`
                }
                /* self signed certificate in certificate chain */
                transporter.sendMail(forjaMail, (err, data) => {
                    if(err) {
                        console.log(err)
                    } else {
                        console.log('Email de bienvenida enviado con éxito.')
                    }
                });
                res.render('users/login', { email })
            })
            .catch(error => {
                res.send('Error al crear usuario')
                console.log(error)
            })

        } else {
            res.render('users/register', {errors: registerErrors.mapped(), old: req.body} )
        }


    },
    login:(req, res)=>{
        const loginErrors = validationResult(req);
        

        
        if (loginErrors.isEmpty()) {
                
            const {email, contraseña} = req.body;
            db.Usuario.findOne({
                where: {
                    email
                }
            })
            .then(usuario => {
                
                if ( bcrypt.compareSync(contraseña, usuario.contraseña )) {
            
                    req.session.usuarioLogueado = usuario;
    
                    if (req.body.recordarme !== undefined){
                        res.cookie('recordarUsuario', req.session.usuarioLogueado,{maxAge: 60*1000*60*24})
                    }
    
                res.redirect("/");
                
                } else {
                    res.render("users/login", {errorContraseña: "La contraseña es incorrecta", oldData: req.body });                
                } 
            })
            .catch(error => {
                res.send('El usuario no existe en nuestra base de datos')
                console.log(error)
            })
            
    
        }else{

            res.render("users/login", {errors: loginErrors.mapped(), oldData: req.body });
                
        }

    },
    vistaUserProfile: (req, res)=> {
        const {id} = req.params;
        db.Usuario.findOne({
            where: {
                id: id
            },
            include: [
                {
                    association: "direccion",
                }
            ]
        })
        .then(usuario => {
            res.render('users/userProfile', {usuario} )
        })
        .catch(error => {
            res.send('No se pudo acceder a tu perfil de usuario')
            console.log(error)
        })
    },
    cerrarSesion: (req, res) => {
        res.clearCookie('recordarUsuario')
        req.session.destroy()

        res.redirect('/')
    },
    editUserProfile: (req, res)=>{

        
        /* var usuarioAEditar = db.Usuario.findOne({
            where: {
                id: req.params.id
            }
        })
        console.log(usuarioAEditar); */

        const userProfileErrors = validationResult(req);

        if(userProfileErrors.isEmpty()){
            

            let {nombre, apellido, email, telefono, imagen} = req.body;

            db.Usuario.update({
                nombre: nombre,
                apellido: apellido,
                email: email,
                telefono: telefono === undefined ? null : telefono,
                imagen: req.file ? req.file.filename : 'default-user.jpg'
            },
            { where: { id : req.params.id}
            })
            .then( () => {
                
                res.redirect("/user/userProfile/" + req.params.id)

            })
            .catch( error => {
                res.send("No se pudo editar el usuario");
                console.log("No se pudo editar el usuario", error);
            })

        }else{

            db.Usuario.findOne({
                where: { id: req.session.usuarioLogueado.id},
                include: [
                    {
                        association: "direccion",
                    }
                ]
            })
            .then(usuario=>{
                res.render("users/userProfile", {usuario, errors: userProfileErrors.mapped()});

            })
            .catch(error => {
                console.log(error)
                res.send("No se pudieron enviar los errores a la vista de perfil de usuario")
            })


        }
    },
    vistaCambiarContraseña: (req, res)=>{

        res.render("users/password")
    },
    cambiarContraseña: (req, res)=>{


        const cambiarContraseñaErrors = validationResult(req);

        if(cambiarContraseñaErrors.isEmpty()){
            
            let { contraseñaNueva } = req.body;
            let contraseñaCrypt = bcrypt.hashSync(contraseñaNueva);

            db.Usuario.update({
                contraseña: contraseñaCrypt
            },
            {
                where: { id : req.session.usuarioLogueado.id }
            })
            .then( () => {
                res.redirect("/user/userProfile/" + req.session.usuarioLogueado.id)
            })
            .catch(error => {
                res.send('Hubo un error al cambiar la contraseña')
                console.log(error)
            })
            //cerrar sesion o redirigir?//

        } else {
    
            res.render("users/password", {errors: cambiarContraseñaErrors.mapped()});
    
            }
    },
    vistaAgregarDireccion: (req, res)=> {
        res.render("users/addAddress")
    },
    agregarDireccion: (req, res)=> {

        const agregarDireccionErrors = validationResult(req);

        if(agregarDireccionErrors.isEmpty()){

            let {calle, numero, localidad, provincia, codigoPostal, departamento } = req.body;

        db.Direccion.create({

            calle,
            numero: parseInt(numero),
            localidad,
            provincia,
            codigoPostal: parseInt(codigoPostal),
            departamento: parseInt(departamento),
            usuarioId: parseInt(req.session.usuarioLogueado.id)        

        })
        .then(()=>{
            res.redirect("/user/userProfile/" + req.session.usuarioLogueado.id)
        })
        .catch(error=>{
            res.send('Hubo un error al crear la nueva dirección')
            console.log(error)

        })

        }else{

            res.render("users/addAddress", {errors:agregarDireccionErrors.mapped(), old: req.body})

        }
        
    },
    vistaEditarDireccion: (req, res)=> {

        db.Direccion.findOne({
            where: {
                id: req.params.addressId
            }
        })
        .then(direccion=>{
            
            res.render("users/editAddress", {direccion})
        })
        .catch(error => {
            console.log(error)
            res.send("No se pudo obtener la dirección de la base de datos")
        })
    },
    editarDireccion: (req, res)=> {

        const editarDireccionErrors = validationResult(req);

        if(editarDireccionErrors.isEmpty()){

            let {calle, numero, localidad, provincia, codigoPostal, departamento } = req.body;

            db.Direccion.update({

                calle,
                numero: parseInt(numero),
                localidad,
                provincia,
                codigoPostal: parseInt(codigoPostal),
                departamento: parseInt(departamento),
                usuarioId: parseInt(req.session.usuarioLogueado.id)

            },
            {
                where: {id:req.params.addressId}
            })
            .then( ()=>{
                res.redirect("/user/userProfile/" + req.session.usuarioLogueado.id)
            })
            .catch( ()=> {
                console.log(error)
                res.send("No se pudo editar la dirección de la base de datos")
            })

        }else{

            db.Direccion.findOne({
                where: {id:req.params.addressId}
            })
            .then(direccion=>{
                res.render("users/editAddress", {errors:editarDireccionErrors.mapped(), direccion, old: req.body})
            })
            .catch(error => {
                console.log(error)
                res.send("No se pudieron enviar los errores a la vista de edición")
            })

            

        }
    },
    eliminarDireccion: (req, res)=> {

        db.Direccion.destroy({
            where: {id : req.params.addressId}
        })
        .then( () => {
            res.redirect("/user/userProfile/" + req.session.usuarioLogueado.id)
        })
        .catch(error=>{
            res.send("No se pudo eliminar la dirección");
            console.log(error);
        })

		/* res.redirect("/admin") */

    }

}

module.exports = controller;