const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models');

const controller = {
    cart: (req, res)=> {
        res.render('users/cart')
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

            res.render("users/userProfile", {usuario:req.session.usuarioLogueado, errors: userProfileErrors.mapped()});

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

            res.render("users/addAddress", {errors:agregarDireccionErrors.mapped()})

        }
        
    },
    vistaEditarDireccion: (req, res)=> {
        res.render("users/editAddress")
    },
    editarDireccion: (req, res)=> {

    }

}
// se puede poner .trim() al registro para que no vengan espacios en blanco
module.exports = controller;