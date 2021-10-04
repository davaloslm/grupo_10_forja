const path = require('path');
const fs = require('fs');
let productos = require("../data/productos.json");
const productosRuta = path.join(__dirname, '../data/productos.json');

const controller = {
    admin: (req, res)=> {
        
        res.render('admin/admin', {productos})
    },

    //////// Formulario de Creacion ///////////
    vistaCrear: (req, res)=> {
        res.render('admin/create')
    },

    crear:(req,res) =>{
        /* const {nombre, descripcion, precio, descuento, talle, color, categoria, envioGratis} = req.body */
        const nuevoProducto = 
        /* req.body; */
        nuevoProducto.id = productos.length + 1;

        console.log(nuevoProducto);

        nuevoProducto.envioGratis = envioGratis === undefined ? false : true;
        nuevoProducto.descuento = descuento;
        nuevoProducto.talle = typeof(talle) === 'string' ? [talle] : talle;
        nuevoProducto.nombre = nombre;
        nuevoProducto.descripcion = descripcion;
        nuevoProducto.precio = precio;
        nuevoProducto.color = [color];
        nuevoProducto.categoria = typeof(categoria) === 'string' ? [categoria] : categoria;

        productos.push(nuevoProducto);

        fs.writeFileSync(productosRuta, JSON.stringify(productos, null ,2))

		res.redirect(`/product/${nuevoProducto.id}`)
    },

    //////// Formulario de edición ///////////

    vistaEditar: (req, res)=> {
        const {id} = req.params;
        const producto = productos.find(producto=>producto.id === parseInt(id) )
        res.render('admin/edit', {producto})
    },
    
    /////// Editar producto - Guardar ////////

    editar: (req, res)=> {
        //falta imagen
        let productoEditado = productos.find(producto => producto.id === parseInt(req.params.id));
		let {nombre, descripcion, precio, descuento, talle, color, categoria, envioGratis} = req.body

            productoEditado.envioGratis = envioGratis === undefined ? false : true;
            productoEditado.descuento = descuento;
            productoEditado.talle = typeof(talle) === 'string' ? [talle] : talle;
            productoEditado.nombre = nombre;
            productoEditado.descripcion = descripcion;
            productoEditado.precio = precio;
            productoEditado.color = [color];
            productoEditado.categoria = typeof(categoria) === 'string' ? [categoria] : categoria;

			fs.writeFileSync(productosRuta, JSON.stringify(productos, null ,2))

			res.redirect(`/product/${+req.params.id}`)

		}
}

module.exports = controller;