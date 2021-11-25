'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    Venta.belongsTo(models.Producto, {
        as: 'ventaProductos',
        foreignKey: 'productoId'
    })
    Venta.belongsTo(models.Usuario, {
        as: 'ventaUsuarios',
        foreignKey: 'usuarioId'
    })
    Venta.belongsTo(models.MedioDePago, {
        as: 'ventaMedioDePago',
        foreignKey: 'medioDePagoId'
    })
    Venta.belongsTo(models.Factura, {
        as: 'ventaFacturas',
        foreignKey: 'facturaId'
    })
    }
  };
  Venta.init({
    fecha: DataTypes.DATE,
    productoId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER,
    medioDePagoId: DataTypes.INTEGER,
    facturaId: DataTypes.INTEGER,
    total: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Venta',
  });
  return Venta;
};
