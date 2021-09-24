const productos = require("../data/productos.json");

const controller = {
    index: (req, res, next)=>{
        productosDestacados = productos.filter(e=>e.destacado===true);
        productosEnOferta = productos.filter(e=>e.enOferta===true);

        res.render('index', {productosDestacados, productosEnOferta});
      }
}

module.exports = controller