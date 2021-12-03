const { Op } = require('sequelize');
const db = require('../database/models');

const controller = {
    index: (req, res) => {

      let productosEnOferta = db.Producto.findAll({
        where: { descuento: { [Op.gt]: 0 } },
        include: [
          {association: "imagen"}]
      });
      let productosDestacados = db.Producto.findAll({
        where: {envio: 1},
        include: [
          {association: "imagen"}]
      });

      Promise.all([productosEnOferta, productosDestacados])
          .then(([productos, productos2]) => {
            res.render('index', { productosDestacados: productos2, productosEnOferta: productos });
          })
          .catch( error => {
            res.send("Error al requerir productos de la base de datos")
            console.log(error);
          })
    
    },
    acceso: (req, res)=> {
      res.render('acceso')
    },
}

module.exports = controller