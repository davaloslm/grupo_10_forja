var usuarios = require('../data/users.json');
const fs = require('fs');
const path = require('path');
const usuariosRuta = path.join(__dirname, '../data/users.json');
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
                        res.cookie('recordarUsuario', req.session.usuarioLogueado.email,{maxAge: 60*1000*60*24})
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
            }
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
            

            let {nombre, apellido, email, telefono} = req.body;

            db.Usuario.update({
                nombre: nombre,
                apellido: apellido,
                email: email,
                telefono: telefono === undefined ? null : telefono,
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

        //falta vista de cambiar contraseña//

        const cambiarContraseñaErrors = validationResult(req);

        if(cambiarContraseñaErrors.isEmpty()){

            let { contraseña, contraseña2} = req.body;

            let usuarioAEditar = usuarios.find(e=>e.id === req.session.usuarioLogueado.id);

            
            usuarioAEditar.contraseña = bcrypt.hashSync(contraseña2);
            usuarioAEditar.contraseña2 = bcrypt.hashSync(contraseña2);

            fs.writeFileSync(usuariosRuta, JSON.stringify(usuarios, null ,2));
            
            //cerrar sesion o redirigir?//
            res.redirect("/user/userProfile/" + usuarioAEditar.id)
            /* res.render("users/password"); */
    
        }else{
    
            res.render("users/password", {errors: cambiarContraseñaErrors.mapped()});
    
            }
    }

    
    
}
// se puede poner .trim() al registro para que no vengan espacios en blanco
module.exports = controller;