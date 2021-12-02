const db = require('../database/models');

const recordarme = (req, res , next) =>{
    
    if(req.cookies.recordarUsuario){
        req.session.usuarioLogueado = req.cookies.recordarUsuario;
    }

    next()
}

module.exports = recordarme;