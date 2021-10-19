let usuarios = require('../data/users.json');
const fs = require('fs');
const path = require('path');
const usuariosRuta = path.join(__dirname, '../data/users.json');
const bcrypt = require('bcryptjs');
const { index } = require("../controllers/indexController");

const controller = {
    cart: (req, res)=> {
        res.render('users/cart')
    },
    vistaRegistro: (req, res)=> {
        res.render('users/register')
    },
    registro: (req, res)=> {
        const {nombre, apellido, email, fechaDeNac, contraseña, contraseña2, terminos, ofertas} = req.body;
        let nuevoUsuario = req.body;


        nuevoUsuario.id = usuarios.length + 1;

        nuevoUsuario.nombre = nombre;
        nuevoUsuario.apellido = apellido;
        nuevoUsuario.email = email;
        nuevoUsuario.fechaDeNac = fechaDeNac;
        nuevoUsuario.contraseña = bcrypt.hashSync(contraseña, 12);
        nuevoUsuario.contraseña2 = bcrypt.hashSync(contraseña2, 12);
        nuevoUsuario.imagen = req.file ? req.file.filename : 'default-user.jpg';
        nuevoUsuario.terminos = terminos;
        nuevoUsuario.ofertas = ofertas === undefined ? false : true;
        nuevoUsuario.ban = 0;
        nuevoUsuario.admin = 0;


        usuarios.push(nuevoUsuario);

        fs.writeFileSync(usuariosRuta, JSON.stringify(usuarios, null, 2))

        res.redirect(`/user/userProfile/${nuevoUsuario.id}`)

    },
    vistaLogin: (req, res)=> {
        res.render('users/login')
    },
    login:(req, res)=>{
        const {email, contraseña} = req.body;

        const usuarioALoguear = usuarios.find(usuario => usuario.email === email);

        

        if ( bcrypt.compareSync(contraseña, usuarioALoguear.contraseña )) {
            
            req.session.usuarioLogueado = usuarioALoguear;

            


            
            //recordarme
            //cookies


            res.redirect("/");

            
            
        }else{


            res.redirect("login");
            //render de login con errores
            
        }

    },
    userProfile: (req, res)=> {
        const {id} = req.params;
        const usuario = usuarios.find(usuario=>usuario.id === parseInt(id) )
        res.render('users/userProfile', {usuario} )
    }
}

module.exports = controller;