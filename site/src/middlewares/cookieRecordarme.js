const usuarios = require('../data/users.json');

const recordarme = (req, res , next) =>{
    if(req.cookies.recordarUsuario && req.session.usuarioLogueado === undefined){
        req.session.usuarioLogueado = usuarios.find(usuario => usuario.email === req.cookies.recordarUsuario)
    }

    next()
}

module.exports = recordarme;