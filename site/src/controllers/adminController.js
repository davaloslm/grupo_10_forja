const controller = {
    admin: (req, res)=> {
        res.render('admin/admin')
    },
    crearProducto: (req, res)=> {
        res.render('admin/crearProducto')
    },
    editarProducto: (req, res)=> {
        res.render('admin/editarProducto')
    },
}

module.exports = controller;