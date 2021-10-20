const invitado = (req, res, next) => {
    if (req.session.usuarioLogueado === undefined) {
        next()
    } else {
        res.render('acceso')
    }
}

module.exports = invitado;