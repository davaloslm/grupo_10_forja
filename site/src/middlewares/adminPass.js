const adminPass = (req, res, next) => {
let usuario = req.session.usuarioLogueado
    if (typeof usuario != "undefined" && usuario.admin == 1) {
        next()
    } else {
        res.redirect("/acceso")
    }
    
}

module.exports = adminPass;