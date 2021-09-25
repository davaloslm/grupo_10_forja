const controller = {
    admin: (req, res)=> {
        res.render('admin/admin')
    },
    crearProducto: (req, res)=> {
        res.render('admin/crearProducto')
    },
    /* adminLogin: ??? */
}

module.exports = controller;