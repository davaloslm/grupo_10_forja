const { Op } = require('sequelize');
const db = require('../database/models');

const controller = {
    category: (req, res)=> {
        const {categoria} = req.params;
        let promesaCategorias = db.Categoria.findAll({
            where: {nombre: categoria},
            include: [
                {association: "categoriaProducto"}
            ]
        })
        let promesaProductos = db.Producto.findAll({
            include: [
                {association: "imagen"},
                {association: "categoria"}
            ]
        })
        Promise.all([promesaCategorias, promesaProductos])
            .then( ([categorias, productos]) => {
                let arrayId = []
                for (let i = 0; i < categorias.length; i++) {
                    arrayId.push(categorias[i].categoriaProducto.id)
                }

                let productosFiltrados = []
                for (let i = 0; i < productos.length; i++) {
                    productosFiltrados = productos.filter(e => arrayId.includes(e.id) === true)
                    
                }

                res.render("products/category", {productosDeLaCategoria: productosFiltrados, categoriaCorrecta: categoria});
            })
            .catch(error => {
                res.send('No se encontraron productos con esa categoría')
                console.log(error)
            })
        /* .then(productos => {

            let productosFiltrados = productos.filter( producto => producto.categoria.includes(req.params) === true)
            console.log(productosFiltrados);
            /* console.log(productos[24].categoria)
            
            console.log(productos[24].categoria[0].nombre) */
            // res.render("products/category", {productosDeLaCategoria: productosFiltrados, categoriaCorrecta: categoria} );
        /* })
        .catch(error => {
            res.send('No se encontraron productos con esa categoría')
            console.log(error)
        }) */

    }

}

module.exports = controller;
