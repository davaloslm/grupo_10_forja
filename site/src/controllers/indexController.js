const productos = require("../data/productos.json");


const controller = {
    index: (req, res, next)=>{
        productosDestacados = productos.filter(e=>e.descuento === 0);
        productosEnOferta = productos.filter(e=>e.descuento !== 0);

        res.render('index', {productosDestacados, productosEnOferta});
      },
    acceso: (req, res)=> {
      res.render('acceso')
    },
}

module.exports = controller